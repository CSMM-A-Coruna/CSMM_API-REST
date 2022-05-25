import { executeQuery } from '../../database'

export const getDocumentosGenerales = async (grupo, idAlumno) => {
  let documentos = []
  const query = `SELECT id_documento, documento, enlace, categoria, fecha FROM documentos WHERE id_grupo = 0`
  const documentosColegio = await executeQuery(query)
  if (documentosColegio.length) {
    for (let i = 0; i < documentosColegio.length; i++) {
      documentosColegio[i].protegido = 'No'
      documentosColegio[i].grupo = grupo
      documentosColegio[i].id_alumno = idAlumno
      documentos.push(documentosColegio[i])
    }
  }
  return documentos
}

export const getDocumentosByGrupo = async (grupo, idAlumno) => {
  let documentos = []

  const query = `SELECT id_documento, documento, enlace, categoria, fecha FROM documentos, grupos WHERE documentos.id_grupo = grupos.id AND grupos.grupo = "${grupo}" ORDER BY fecha`
  const documentosGrupo = await executeQuery(query)
  if (documentosGrupo.length) {
    for (let i = 0; i < documentosGrupo.length; i++) {
      documentosGrupo[i].protegido = 'No'
      documentosGrupo[i].grupo = grupo
      documentosGrupo[i].id_alumno = idAlumno
      documentos.push(documentosGrupo[i])
    }
  }

  const query2 = `SELECT id_documento, documento, enlace, categoria, fecha, id_alumno FROM documentos_alumno WHERE id_alumno = ${idAlumno}`
  const documentosAlumno = await executeQuery(query2)
  if (documentosAlumno.length) {
    for (let i = 0; i < documentosAlumno.length; i++) {
      documentosAlumno[i].protegido = 'Si'
      documentosAlumno[i].grupo = grupo
      documentosAlumno[i].id_alumno = idAlumno
      documentos.push(documentosAlumno[i])
    }
  }

  return documentos
}
