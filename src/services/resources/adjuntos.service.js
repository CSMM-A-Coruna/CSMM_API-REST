import { executeQuery } from '../../database'

export const uploadAdjuntoToDB = async (idCom, originalName) => {
  await executeQuery(
    `INSERT INTO comunicaciones_adjuntos (idcomunicacion, adjunto) VALUES (${idCom}, '${originalName}')`
  )
}
