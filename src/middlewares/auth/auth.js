import jwt from 'jsonwebtoken'
import config from '../../config'

// -- VERIFICAR EL JSON WEB TOKEN --
export const verifyToken = async (req, res, next) => {
  // Cogemos las cabeceras
  const { headers } = req
  // Cogemos la cabecera Authorization (cors)
  let token = headers.authorization

  // Comprobamos que existe
  if (!token) {
    return res.status(403).json({ message: 'No token provided' })
  }

  // Quitamos la palabra Bearer (que se pone por defecto)
  token = token.replace('Bearer ', '')

  // Comprobamos que la firma es correcta
  try {
    jwt.verify(token, config.jwtSecret)
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' })
  }
}

export const verifyAuthDownload = async (req, res, next) => {
  // Cogemos el query
  let auth = req.query.auth

  if (!auth) {
    return res.status(403).json({ message: 'Parece que no tienes permisos...' })
  }
  // Quitamos la palabra Bearer (que se pone por defecto)
  auth = auth.replace('Bearer ', '')
  // Comprobamos que la firma es correcta
  try {
    jwt.verify(auth, config.jwtSecret)
    next()
  } catch (err) {
    return res
      .status(401)
      .json({ message: 'No tienes permiso para descargar este documento.' })
  }
}
