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

export const verifyAuthDownload = async (req, res, next) => {
  // Cogemos el query 
  const { query } = req

  let auth = req.query.auth
  let fileName = req.query.file_name
  let idCom = req.query.id_comunicacion

  if(!auth) {
    return res.status(403).json({ message: 'Parece que no tienes permisos...'})
  }

  let authToken = idCom + fileName

  if(auth != reverseString(authToken)) {
    res.status(401).json({ message: 'Parece que no tienes permisos...'})
  } else {
    next()
  }
}

function reverseString(str) {
  return (str === '') ? '' : reverseString(str.substr(1)) + str.charAt(0);
}