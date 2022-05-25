import { executeQuery } from '../../database'

export const updateDocumentDownload = async (
  nombreDocumento,
  idAlumno,
  ipUsuario
) => {
  try {
    const getIdDocumento = await executeQuery(
      `SELECT id_documento FROM documentos_alumno WHERE id_alumno = ${idAlumno} AND enlace = "${nombreDocumento}"`
    )
    const idDocumento = getIdDocumento[0].id_documento
    const updateIp = await executeQuery(
      `UPDATE documentos_alumno SET ip = '${ipUsuario}' WHERE id_documento = ${idDocumento}`
    )
    const date = new Date().toISOString()
    const updateFecha = await executeQuery(
      `UPDATE documentos_alumno SET descarga_fecha = '${date}' WHERE id_documento = ${idDocumento}`
    )
    const updateEstado = await executeQuery(
      `UPDATE documentos_alumnos SET estado = 1 WHERE id_documento = ${idDocumento}`
    )
  } catch (err) {
    throw err
  }
}
