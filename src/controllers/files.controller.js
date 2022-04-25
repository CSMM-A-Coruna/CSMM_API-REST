import { cacheFileMiddleware } from '../middlewares'
import FTPClient from '../middlewares/FTPClient'
import { executeQuery } from '../database'


export const upload = async (req, res) => {
  try {

    await cacheFileMiddleware(req, res)

    if(req.file == undefined || req.query.id_comunicacion == undefined) {
      return res.status(400).json({ message: 'Sube un archivo o especifica el id de la comunicación' })
    }

    req.file.originalname = req.file.originalname.replace(/\s/g, '-')
    
    const ftp = new FTPClient()
    const uploadFileToFtp = await ftp.uploadFile(req.query.id_comunicacion, req.file.originalname)

    const result = await executeQuery(`INSERT INTO comunicaciones_adjuntos (idcomunicacion, adjunto) VALUES (${req.query.id_comunicacion}, '${req.file.originalname}')`)

    res.status(200).json({ message: 'Archivo subido con éxito' })

  } catch (err) {
    if(err.code == 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ message: 'El archivo no puede superar los 10MB'})
    }
    res.status(500).json({ message: 'No se ha podido subir el archivo: ' + err })
  }
}


export const downloadFile = async (req, res) => {
  if(req.query.file_name && req.query.id_comunicacion) {
    const fileName = req.query.file_name
    const directoryPath = __basedir + '/resources/downloads/' + req.query.id_comunicacion
  
    const ftp = new FTPClient()
    const cacheFile = await ftp.cacheFile('/adjuntos/'+ req.query.id_comunicacion + '/' +   fileName, fileName, req.query.id_comunicacion)
  
    res.download(directoryPath + '/' + fileName, fileName, (err) => {
      if(err) {
        console.log(err)
        res.status(500).json({ message: 'No se ha podido descargar el archivo ' +  err })
      }
    })
  } else {
    res.status(400)
  }
}

export const getListFiles = async (req, res) => {
  let path = ''
  if(req.query.path) {
    path = req.query.path
  }
  const ftp = new FTPClient()
  ftp.getList(path, res)
}