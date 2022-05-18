import { executeQuery } from '../database'

const updateLoginUser = async (userId, userIp, device) => {
  try {
    const intAccesos = await executeQuery(
      `SELECT accesos FROM familias WHERE id = ${userId}`
    )
    const updateAccesos = await executeQuery(
      `UPDATE familias SET accesos = ${
        intAccesos[0].accesos + 1
      } WHERE id = ${userId}`
    )
    const updateIp = await executeQuery(
      `UPDATE familias SET ip = '${userIp}' WHERE id = ${userId}`
    )
    const updateDevice = await executeQuery(
      `UPDATE familias SET navegador = '${device}' WHERE id = ${userId}`
    )
    const date = new Date().toISOString()
    const updateUltimo = await executeQuery(
      `UPDATE familias SET ultimo = '${date}' WHERE id = ${userId}`
    )
  } catch (err) {
    throw err
  }
}

export default updateLoginUser
