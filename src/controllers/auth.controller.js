import Usuario from '../models/Usuario'
import { executeQuery } from '../database'
import Alumno from '../models/Alumno'
import jwt from 'jsonwebtoken'
import config from '../config'
import app from '../app'
import { updateLoginUser } from '../middlewares/index'

const jwtExpireDate = '30d'

// Registro
export const signUp = async (req, res) => {
  // Comprobamos que tipo de usuario es
  switch (req.query.tipoUsuario) {
    case 'admin':
      req.body.tipoUsuario = 'administradores'
      break
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
    if (
      req.body.usuario &&
      req.body.password &&
      req.body.nombre &&
      req.body.apellido1 &&
      req.body.apellido2 &&
      req.body.dni &&
      req.body.oa &&
      req.body.tipoUsuario
    ) {
      // Definimos un nuevo usuario con el modelo Usuario
      const nuevoUsuario = new Usuario(req.body)
      // Encriptamos la contraseña
      nuevoUsuario.password = await Usuario.encryptPassword(
        nuevoUsuario.password
      )
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
  } catch (err) {
    if (err == '400') {
      res.status(400).json({ message: 'Faltan parámetros' })
    } else {
      if (app.settings.env == 'production') {
        res.status(500).json({ message: 'Error interno del servidor' })
      } else {
        res.status(500).json({ message: err })
      }
    }
  }
}

// Login
export const signIn = async (req, res) => {
  try {
    if (req.body.usuario && req.body.password) {
      const result = await executeQuery(
        `SELECT * FROM familias WHERE usuario = '${req.body.usuario}'`
      )
      if (result.length) {
        const verifyPassword = Usuario.compareSyncPassword(
          req.body.password,
          result[0].password
        )
        if (verifyPassword) {
          const alumnosResult = Usuario.calcularAlumnosAsociados(
            result[0].id
          ).then((data) => {
            if (data.length) {
              let alumnos = []
              for (let index = 0; index < data.length; index++) {
                const alumno = new Alumno(
                  data[index].id_alumno,
                  data[index].nombre_alumno,
                  data[index].apellido1_alumno,
                  data[index].apellido2_alumno,
                  data[index].grupo
                )
                alumnos.push(alumno)
              }
              // Creamos y firmamos el token de autentificación
              const token = jwt.sign(
                {
                  id: result[0].id,
                  usuario: result[0].usuario,
                  nombre: result[0].nombre,
                  apellido1: result[0].apellido1,
                  apellido2: result[0].apellido2,
                  nacimiento: result[0].nacimiento,
                  dni: result[0].dni,
                  oa: result[0].oa,
                  accesos: result[0].accesos,
                  tipoUsuario: 'familias',
                  alumnosAsociados: alumnos,
                },
                config.jwtSecret,
                {
                  expiresIn: jwtExpireDate,
                }
              )
              updateLoginUser(
                result[0].id,
                req.connection.remoteAddress.split(`:`).pop(),
                'Android'
              )
              res.status(200).json({ token: token })
            }
          })
        } else {
          res.status(401).json({ message: 'Contraseña incorrecta' })
        }
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' })
      }
    } else {
      throw '400'
    }
  } catch (err) {
    if (err == '400') {
      res.status(400).json({ message: 'Faltan parámetros' })
    } else {
      if (app.settings.env == 'production') {
        res.status(500).json({ message: 'Error interno del servidor' })
      } else {
        res.status(500).json({ message: err })
      }
    }
  }
}

export const compareData = async (req, res) => {
  try {
    const token = jwt.decode(req.body.token)
    if (token) {
      const query = `SELECT * FROM ${token.tipoUsuario} WHERE id = ${token.id}`
      const result = await executeQuery(query)
      if (result.length) {
        const alumnosResult = Usuario.calcularAlumnosAsociados(
          result[0].id
        ).then((data) => {
          if (data.length) {
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
            // Creamos y firmamos el token de autentificación
            const newToken = jwt.sign(
              {
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
                alumnosAsociados: alumnos,
              },
              config.jwtSecret,
              {
                expiresIn: jwtExpireDate,
              }
            )
            updateLoginUser(
              result[0].id,
              req.connection.remoteAddress.split(`:`).pop(),
              'Android'
            )
            res.status(200).json({ token: newToken })
          }
        })
      } else {
        throw '404'
      }
    } else {
      throw '400'
    }
  } catch (err) {
    if (err == '400') {
      res.status(400).json({ message: 'Faltan parámetros' })
    } else if (err == '404') {
      res.status(404).json({ message: 'No se ha encontrado el usuario' })
    } else {
      if (app.settings.env == 'production') {
        res.status(500).json({ message: 'Error interno del servidor' })
      } else {
        res.status(500).json({ message: err })
      }
    }
  }
}

export const saveFCMToken = async (req, res) => {
  try {
    if (req.body.id_usuario && req.body.fcm_token) {
      const query = await executeQuery(
        `SELECT fcm_token FROM familias WHERE id = ${req.body.id_usuario}`
      )
      if (query.length) {
        const updateToken = await executeQuery(
          `UPDATE familias SET fcm_token = '${req.body.fcm_token}' WHERE id = ${req.body.id_usuario}`
        )
        res.status(200).json({ message: updateToken })
      } else {
        throw '404'
      }
    } else {
      throw '400'
    }
  } catch (err) {
    if (err == '400') {
      res.status(400).json({ message: 'Faltan parámetros' })
    } else if (err == '404') {
      res.status(404).json({ message: 'No se ha encontrado el usuario' })
    } else {
      if (app.settings.env == 'production') {
        res.status(500).json({ message: 'Error interno del servidor' })
      } else {
        res.status(500).json({ message: err })
      }
    }
  }
}

export const checkPassword = async (req, res) => {
  try {
    const { id_usuario, password } = req.body
    if (id_usuario && password) {
      const result = await executeQuery(
        `SELECT * FROM familias WHERE id = '${id_usuario}'`
      )
      if (result.length) {
        const verifyPassword = Usuario.compareSyncPassword(
          password,
          result[0].password
        )
        if (verifyPassword) {
          res.status(200).json({ correct_password: true })
        } else {
          res.status(401).json({ correct_password: false })
        }
      } else {
        throw '404'
      }
    } else {
      throw '400'
    }
  } catch (err) {
    if (err == '400') {
      res.status(400).json({ message: 'Faltan parámetros' })
    } else if (err == '404') {
      res.status(404).json({ message: 'No se ha encontrado el usuario' })
    } else {
      if (app.settings.env == 'production') {
        res.status(500).json({ message: 'Error interno del servidor' })
      } else {
        res.status(500).json({ message: err })
      }
    }
  }
}

export const changePassword = async (req, res) => {
  try {
    const { id_usuario, new_password } = req.body
    if (id_usuario != undefined && new_password != undefined) {
      const encryptedPassword = await Usuario.encryptPassword(new_password)
      const query = await executeQuery(
        `UPDATE familias SET password = '${encryptedPassword}' WHERE id = ${id_usuario}`
      )
      res.status(200).json({ message: 'Contraseña cambiada con éxito' })
    } else {
      throw '400'
    }
  } catch (err) {
    if (err == '400') {
      res.status(400).json({ message: 'Faltan parámetros' })
    } else if (err == '404') {
      res.status(404).json({ message: 'No se ha encontrado el usuario' })
    } else {
      if (app.settings.env == 'production') {
        res.status(500).json({ message: 'Error interno del servidor' })
      } else {
        console.log(err)
        res.status(500).json({ message: err })
      }
    }
  }
}
