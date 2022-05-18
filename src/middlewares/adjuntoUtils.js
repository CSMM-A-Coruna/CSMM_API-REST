import FTPClient from '../middlewares/FTPClient'
import util from 'util'
import multer from 'multer'
const fs = require('fs')

const maxSize = 10 * 1024 * 1024
const snooze = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const downloadAdjuntoToAPI = async (req, res, next) => {
  if (req.query.file_name && req.query.id_comunicacion) {
    const fileName = req.query.file_name
    let apiDir = __basedir + '/resources/downloads/adjuntos/' + req.query.id_comunicacion + '/' + fileName
    const ftp = new FTPClient()
    const cacheFile = await ftp.cacheAdjunto(
      '/adjuntos/' + req.query.id_comunicacion + '/' + fileName,
      fileName,
      req.query.id_comunicacion
    )
    while (!fs.existsSync(apiDir)) {
      await snooze(1)
    }
    next()
  } else {
    res.status(400)
  }
}

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = __basedir + '/resources/uploads/adjuntos/' + req.query.id_comunicacion
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.replace(/\s/g, '-'))
  },
})

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single('file')

export let uploadAdjuntoToAPI = util.promisify(uploadFile)
