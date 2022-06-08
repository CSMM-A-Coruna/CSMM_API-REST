import Usuario from '../models/Usuario'
import Alumno from '../models/Alumno'
import jwt from 'jsonwebtoken'
import config from '../config'
import { updateLoginUser } from '../middlewares/index'
import * as authService from '../services/auth.service'

const jwtExpireDate = '30d'

// Registro
export const signUp = async (req, res, next) => {
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
      await nuevoUsuario.crearUsuario()
      res.status(200).json({ message: 'Usuario creado con éxito' })
    } else {
      next({
        statusCode: 400,
        msg: 'Faltan parámetros',
      })
    }
  } catch (err) {
    next(err)
  }
}

// Login with services
export const signIn = async (req, res, next) => {
  try {
    if (req.body.usuario && req.body.password) {
      const result = await authService.searchByUsuario(req.body.usuario)
      console.log(result.length)
      if (result.length) {
        const verifyPassword = await Usuario.comparePassword(
          req.body.password,
          result[0].password
        )
        console.log(verifyPassword)
        if (verifyPassword) {
          const alumnosResult = await Usuario.calcularAlumnosAsociados(
            result[0].id
          )
          if (alumnosResult.length) {
            let alumnos = []
            for (let index = 0; index < alumnosResult.length; index++) {
              const alumno = new Alumno(
                alumnosResult[index].id_alumno,
                alumnosResult[index].nombre_alumno,
                alumnosResult[index].apellido1_alumno,
                alumnosResult[index].apellido2_alumno,
                alumnosResult[index].grupo
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
            await updateLoginUser(
              result[0].id,
              req.connection.remoteAddress.split(`:`).pop(),
              'Android'
            )
            res.status(200).json({ token: token })
          }
        } else {
          next({
            statusCode: 401,
            msg: 'Contraseña incorrecta',
          })
        }
      } else {
        next({
          statusCode: 404,
          msg: 'Usuario no encontrado',
        })
      }
    } else {
      next({
        statusCode: 400,
        msg: 'Faltan parámetros',
      })
    }
  } catch (err) {
    next(err)
  }
}

export const reloadToken = async (req, res, next) => {
  try {
    const token = jwt.decode(req.body.token)
    if (token) {
      const result = await authService.searchById(token.tipoUsuario, token.id)
      if (result.length) {
        Usuario.calcularAlumnosAsociados(result[0].id).then((data) => {
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
        next({
          statusCode: 404,
          msg: 'No se ha encontrado el usuario',
        })
      }
    } else {
      next({
        statusCode: 400,
        msg: 'Faltan parámetros',
      })
    }
  } catch (err) {
    next(err)
  }
}

export const saveFCMToken = async (req, res, next) => {
  try {
    if (req.body.id_usuario && req.body.fcm_token) {
      const update = await authService.updateFCMToken(
        req.body.id_usuario,
        req.body.fcm_token
      )
      if (update === '200') {
        res.status(200).json({ message: 'Token actualizado con éxito' })
      } else {
        next({
          statusCode: 404,
          msg: 'No se ha encontrado el usuario',
        })
      }
    } else {
      next({
        statusCode: 400,
        msg: 'Faltan parámetros',
      })
    }
  } catch (err) {
    next(err)
  }
}

export const checkPassword = async (req, res, next) => {
  try {
    const { id_usuario, password } = req.body
    if (id_usuario && password) {
      const verifyPassword = await authService.checkPassword(
        id_usuario,
        password
      )
      if (verifyPassword) {
        res.status(200).json({ correct_password: true })
      } else {
        res.status(401).json({ correct_password: false })
      }
    } else {
      next({
        statusCode: 400,
        msg: 'Faltan parámetros',
      })
    }
  } catch (err) {
    next(err)
  }
}

export const changePassword = async (req, res, next) => {
  try {
    const { id_usuario, new_password } = req.body
    if (id_usuario !== undefined && new_password !== undefined) {
      await authService.changePassword(id_usuario, new_password)
      res.status(200).json({ message: 'Contraseña actualizada con éxito' })
    } else {
      next({
        statusCode: 400,
        msg: 'Faltan parámetros',
      })
    }
  } catch (err) {
    next(err)
  }
}
