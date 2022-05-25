import app from '../../app'
import { updateDocumentDownload } from '../../middlewares/dbUpdates/updateDocumentDownload'
import * as documentosServices from '../../services/resources/documentos.service'

export const getAllDocumentos = async (req, res) => {
  try {
    const { grupo, id_alumno } = req.query
    if (grupo && id_alumno) {
      if (grupo == 0) {
        const documentos = await documentosServices.getDocumentosGenerales(
          grupo,
          id_alumno
        )
        res.status(200).json(documentos)
      } else {
        const documentos = await documentosServices.getDocumentosByGrupo(
          grupo,
          id_alumno
        )
        res.status(200).json(documentos)
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
