import jwt from 'jsonwebtoken'
import config from '../config'

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
    const decoded = jwt.verify(token, config.jwtSecret)
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' })
  }
}
