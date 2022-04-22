import { uploadFileMiddleware } from '../middlewares'
import FTPClient from '../middlewares/FTPClient'

export const upload = async (req, res) => {
  try {

    await uploadFileMiddleware(req, res)

    if(req.file == undefined || req.query.id_comunicacion == undefined) {
      return res.status(400).json({ message: 'Please upload a file or specify id_comunicacion' })
    }

    const ftp = new FTPClient()
    const uploadFileToFtp = await ftp.uploadFile(req.query.id_comunicacion, req.file.originalname)

    res.status(200).json({ message: 'File uploaded succesfully' })

  } catch (err) {
    if(err.code == 'LIMIT_FILE_SIZE') {
      return res.status(500).json({ message: 'File size cannot be longer than 2MB'})
    }
    res.status(500).json({ message: 'Could not upload the file: ' + err })
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
        res.status(500).json({ message: 'Could not download the file ' +  err })
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