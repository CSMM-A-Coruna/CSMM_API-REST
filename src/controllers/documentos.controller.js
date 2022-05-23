import { doc } from 'prettier'
import app from '../app'
import { executeQuery } from '../database'
import { updateDocumentDownload } from '../middlewares/dbUpdates/updateDocumentDownload'

export const getAllDocumentos = async (req, res) => {
  try {
    const { grupo, id_alumno } = req.query
    if (grupo && id_alumno) {
      let documentos = []
      if (grupo == 0) {
        const query = `SELECT id_documento, documento, enlace, categoria, fecha FROM documentos WHERE id_grupo = 0`
        const documentosColegio = executeQuery(query).then((docColegio) => {
          for (let i = 0; i < docColegio.length; i++) {
            docColegio[i].protegido = 'No'
            docColegio[i].grupo = grupo
            docColegio[i].id_alumno = id_alumno
            documentos.push(docColegio[i])
          }
          res.status(200).json(documentos)
        })
      } else {
        const query = `SELECT id_documento, documento, enlace, categoria, fecha FROM documentos, grupos WHERE documentos.id_grupo = grupos.id AND grupos.grupo = "${grupo}" ORDER BY fecha`
        const documentosGrupo = executeQuery(query).then((docGrupo) => {
          for (let i = 0; i < docGrupo.length; i++) {
            docGrupo[i].protegido = 'No'
            docGrupo[i].grupo = grupo
            docGrupo[i].id_alumno = id_alumno
            documentos.push(docGrupo[i])
          }
          const query2 = `SELECT id_documento, documento, enlace, categoria, fecha, id_alumno FROM documentos_alumno WHERE id_alumno = ${id_alumno}`
          const documentosAlumno = executeQuery(query2).then((docAlumno) => {
            for (let i = 0; i < docAlumno.length; i++) {
              docAlumno[i].protegido = 'Si'
              docAlumno[i].grupo = grupo
              docAlumno[i].id_alumno = id_alumno
              documentos.push(docAlumno[i])
            }
            res.status(200).json(documentos)
          })
        })
      }
    } else {
      throw '400'
    }
  } catch (err) {
    if (err == '400') {
      res.status(400).json({ message: 'Faltan parámetros' })
    } else if (err == '404') {
      res.status(404).json({
        message: 'No se han encontrado documentos correspondientes a ese grupo',
      })
    } else {
      if (app.settings.env == 'production') {
        res.status(500).json({ message: 'Error interno del servidor' })
      } else {
        res.status(500).json({ message: err })
      }
    }
  }
}

export const downloadDocumentoGeneral = async (req, res) => {
  const fileName = req.query.file_name
  const grupo = req.query.grupo.replace(/\s/g, '')
  const directoryPath =
    __basedir + '/resources/downloads/documentos/generales/' + grupo
  res.download(directoryPath + '/' + fileName, fileName, (err) => {
    if (err) {
      if (app.settings.env == 'production') {
        res.status(500).json({ message: 'Error interno del servidor' })
      } else {
        res.status(500).json({ message: err })
      }
    }
  })
}

export const downloadDocumentoAlumno = async (req, res) => {
  const fileName = req.query.file_name
  const idAlumno = req.query.id_alumno
  const directoryPath =
    __basedir + '/resources/downloads/documentos/alumnos/' + idAlumno
  updateDocumentDownload(fileName, idAlumno, req.ip)
  res.download(directoryPath + '/' + fileName, fileName, (err) => {
    if (err) {
      if (app.settings.env == 'production') {
        res.status(500).json({ message: 'Error interno del servidor' })
      } else {
        res.status(500).json({ message: err })
      }
    }
  })
}
