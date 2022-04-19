import Usuario from '../models/Usuario'
import { db } from '../database'
import { executeQuery } from '../database'
import Alumno from '../models/Alumno'
import jwt from 'jsonwebtoken'
import config from '../config'
import { restart } from 'nodemon'


const tipoUsuarios = ['administradores', 'profesores', 'alumnos', 'familias']

// Registro
export const signUp = async(req, res) => {
    // Comprobamos que tipo de usuario es
    switch(req.query.tipoUsuario) {
        case 'admin':
            req.body.tipoUsuario = 'administradores'
            break;
        case 'teacher':
            req.body.tipoUsuario = 'profesores'
            break
        case 'student':
            req.body.tipoUsuario = 'alumnos'
            break
        case 'family':
            req.body.tipoUsuario = 'familias'
            break
    }
    // Cogemos todos los parámetros de la petición
    try {
        if(req.body.usuario && req.body.password && req.body.nombre && req.body.apellido1 && req.body.apellido2 && req.body.dni && req.body.oa && req.body.tipoUsuario) {
            // Definimos un nuevo usuario con el modelo Usuario
            const nuevoUsuario = new Usuario(req.body)
            // Encriptamos la contraseña
            nuevoUsuario.password = await Usuario.encryptPassword(nuevoUsuario.password)
            // Recopilamos datos a mayores
            nuevoUsuario.ultimo = new Date()
            nuevoUsuario.ip = req.ip
            nuevoUsuario.navegador = req.headers['user-agent']
            nuevoUsuario.accesos = 1
            // Creamos el usuario en la base de datos
            nuevoUsuario.crearUsuario() 
            res.status(200).json({ message: 'Usuario creado con éxito' })
        } else {
            throw '400'
        }
    } catch(err) {
        if(err == '400') {
            res.status(400).json({ message: 'Faltan parámetros'})
        } else  {
            res.status(500).json({ message: 'Error interno del servidor' })
        }
    }
}

// Login
export const signIn = async(req, res) => {
    // Hacemos un forEach con un SELECT por cada tipo de usuario
    try {
        if(req.body.usuario && req.body.password) {
            tipoUsuarios.forEach(tipo => {
                db.query(`SELECT * FROM ${tipo} WHERE usuario = ?`, req.body.usuario, function(err, result){
                    // Comprobamos que hay resultado
                    if(result.length) {
                        // Verificamos la contraseña
                        const verifyPassword = Usuario.compareSyncPassword(req.body.password, result[0].password)
                        if(verifyPassword) {
                            const alumnosResult = Usuario.calcularAlumnosAsociados(result[0].id).then(data => {
                                if(data.length) {
                                    let alumnos = []
                                    for (let index = 0; index < data.length; index++) {
                                        const alumno = new Alumno(
                                            data[index].idAlumno,
                                            data[index].alumnoNombre,
                                            data[index].alumnoApellido1,
                                            data[index].alumnoApellido2,
                                            data[index].relacion
                                        )
                                        alumnos.push(alumno)
                                    }
                                    console.log(alumnos)
                                    // Creamos y firmamos el token de autentificación
                                    const token = jwt.sign({
                                        id: result[0].id,
                                        usuario: result[0].usuario,
                                        nombre: result[0].nombre,
                                        apellido1: result[0].apellido1,
                                        apellido2: result[0].apellido2,
                                        nacimiento: result[0].nacimiento,
                                        dni: result[0].dni,
                                        oa: result[0].oa,
                                        accesos: result[0].accesos,
                                        tipoUsuario: tipo,
                                        alumnosAsociados: alumnos
                                    }, config.jwtSecret, {
                                        expiresIn: 84600,
                                    })
                                    res.status(200).json({ token: token })
                                }
                            })
                        } else {
                            res.status(401).json({ message: 'Contraseña incorrecta' })
                        }
                    // Si el tipo de usuario es familias (que corresponde al último elemento del array y aún no se ha enviado respuesta, significa que el usuario no ha sido encontrado)
                    } else if(tipo == 'familias' && !res.headersSent) {
                        res.status(404).json({ message: 'Usuario no encontrado' })
                    }
                })
            })
        } else {
            throw '400'
        }
    } catch(err) {
        if(err='400') {
            res.status(400).json({ message: 'Faltan parámetros' })
        } else {
            res.status(500).json({ message: 'Error interno del servidor' })
        }
    }
}

export const compareData = async (req, res) => {
    try {
        const token = jwt.decode(req.body.token)
        if(token) {
            const query = `SELECT * FROM ${token.tipoUsuario} WHERE id = ${token.id}`
            const result = await executeQuery(query)
            if(result.length) {
                const alumnosResult = Usuario.calcularAlumnosAsociados(result[0].id).then(data => {
                    if(data.length) {
                        let alumnos = []
                        for (let index = 0; index < result.length; index++) {
                            const alumno = new Alumno(
                                data[index].idAlumno,
                                data[index].alumnoNombre,
                                data[index].alumnoApellido1,
                                data[index].alumnoApellido2,
                                data[index].relacion
                            )
                            alumnos.push(alumno)
                        }
                        // Creamos y firmamos el token de autentificación
                        const newToken = jwt.sign({
                            id: result[0].id,
                            usuario: result[0].usuario,
                            nombre: result[0].nombre,
                            apellido1: result[0].apellido1,
                            apellido2: result[0].apellido2,
                            nacimiento: result[0].nacimiento,
                            dni: result[0].dni,
                            oa: result[0].oa,
                            accesos: result[0].accesos,
                            tipoUsuario: token.tipoUsuario,
                            alumnosAsociados: alumnos
                        }, config.jwtSecret, {
                            expiresIn: 84600,
                        })
                        res.status(200).json({ token: newToken })
                    }
                })
            } else {
                throw '404'
            }
        } else {
            throw '400'
        }
    } catch(err) {
        if(err='400') {
            res.status(400).json({ message: 'Faltan parámetros' })
        } else if(err='404') {
            res.status(404).json({ message: 'No se ha encontrado el usuario' })
        } else {
            res.status(500).json({ message: 'Error interno del servidor' })
        }
    }
}