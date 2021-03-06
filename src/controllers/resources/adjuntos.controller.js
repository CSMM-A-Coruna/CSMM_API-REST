import { adjuntoUtil } from '../../middlewares'
import FTPClient from '../../middlewares/files/FTPClient'
import app from '../../app'
import * as adjuntosServices from '../../services/resources/adjuntos.service'

export const upload = async (req, res, next) => {
  try {
    await adjuntoUtil.uploadAdjuntoToAPI(req, res)

    if (req.file == undefined || req.query.id_comunicacion == undefined) {
      return res.status(400).json({
        message: 'Sube un archivo o especifica el id de la comunicación',
      })
    }

    req.file.originalname = req.file.originalname.replace(/\s/g, '-')

    const ftp = new FTPClient()
    const uploadFileToFtp = await ftp.uploadFile(
      req.query.id_comunicacion,
      req.file.originalname
    )

    const updateToDB = await adjuntosServices.uploadAdjuntoToDB(
      req.query.id_comunicacion,
      req.file.originalname
    )

    res.status(200).json({ message: 'Archivo subido con éxito' })
  } catch (err) {
    if (err.code == 'LIMIT_FILE_SIZE') {
      return res
        .status(413)
        .json({ message: 'El archivo no puede superar los 10MB' })
    }
    if (app.settings.env == 'production') {
      res.status(500).json({ message: 'Error interno del servidor' })
    } else {
      res.status(500).json({ message: err })
    }
  }
}

export const downloadFile = async (req, res, next) => {
  const fileName = req.query.file_name
  const directoryPath =
    __basedir + '/resources/downloads/adjuntos/' + req.query.id_comunicacion
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

export const getListFiles = async (req, res, next) => {
  let path = ''
  if (req.query.path) {
    path = req.query.path
  }
  const ftp = new FTPClient()
  ftp.getList(path, res)
}
