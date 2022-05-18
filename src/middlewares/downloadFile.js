import { threadId } from 'worker_threads'
import FTPClient from '../middlewares/FTPClient'
const fs = require('fs')

const snooze = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const cacheFile = async (req, res, next) => {
  if (req.query.file_name && req.query.id_comunicacion) {
    const fileName = req.query.file_name
    let apiDir =
      __basedir +
      '/resources/downloads/' +
      req.query.id_comunicacion +
      '/' +
      fileName

    const ftp = new FTPClient()
    const cacheFile = await ftp.cacheFile(
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

export default cacheFile
