import { executeQuery } from '../database'

export const getAllPreferencesByIdUsuario = async (idUsuario) => {
  const query = await executeQuery(
    `SELECT * FROM familias_app_ajustes WHERE id_usuario = ${user_id}`
  )
  if (query.length > 0) {
    return query[0]
  } else {
    return '404'
  }
}

export const updatePreference = async (idUsuario, tipoPreferencia, value) => {
  const query = await executeQuery(
    `UPDATE familias_app_ajustes SET ${tipoPreferencia} = ${value} WHERE id_usuario = ${idUsuario}`
  )
}
