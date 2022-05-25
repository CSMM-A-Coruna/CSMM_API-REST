import { executeQuery } from '../database'
import Usuario from '../models/Usuario'

export const searchByUsuario = async (usuario) => {
  const result = await executeQuery(
    `SELECT * FROM familias WHERE usuario = '${usuario}'`
  )
  return result
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
    const updateToken = await executeQuery(
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
    if (verifyPassword) {
      return true
    } else {
      return false
    }
  } else {
    throw '404'
  }
}

export const changePassword = async (idUsuario, newPassword) => {
  const encryptedPassword = await Usuario.encryptPassword(newPassword)
  const query = await executeQuery(
    `UPDATE familias SET password = '${encryptedPassword}' WHERE id = ${idUsuario}`
  )
}