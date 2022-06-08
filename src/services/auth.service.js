import { executeQuery } from '../database'
import Usuario from '../models/Usuario'

export const searchByUsuario = async (usuario) => {
  return await executeQuery(
    `SELECT * FROM familias WHERE usuario = '${usuario}'`
  )
}

export const searchById = async (tipoUsuario, id) => {
  const query = `SELECT * FROM ${tipoUsuario} WHERE id = ${id}`
  return await executeQuery(query)
}

export const updateFCMToken = async (idUsuario, fcmToken) => {
  const query = await executeQuery(
    `SELECT fcm_token FROM familias WHERE id = ${idUsuario}`
  )
  if (query.length) {
    await executeQuery(
      `UPDATE familias SET fcm_token = '${fcmToken}' WHERE id = ${idUsuario}`
    )
    return '200'
  } else {
    return '404'
  }
}

export const checkPassword = async (idUsuario, password) => {
  const result = await executeQuery(
    `SELECT * FROM familias WHERE id = '${idUsuario}'`
  )
  if (result.length) {
    const verifyPassword = Usuario.compareSyncPassword(
      password,
      result[0].password
    )
    return !!verifyPassword
  } else {
    throw '404'
  }
}

export const changePassword = async (idUsuario, newPassword) => {
  const encryptedPassword = await Usuario.encryptPassword(newPassword)
  await executeQuery(
    `UPDATE familias SET password = '${encryptedPassword}' WHERE id = ${idUsuario}`
  )
}
