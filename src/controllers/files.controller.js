import { uploadFileMiddleware } from '../middlewares'
const fs = require('fs');

export const upload = async (req, res) => {
  try {    
    await uploadFileMiddleware(req, res)
    if(req.file == undefined) {
      return res.status(400).json({ message: 'Please upload a file' })
    }
    res.status(200).json({ message: 'File uploaded succesfully' })
  } catch (err) {
    if(err.code == 'LIMIT_FILE_SIZE') {
      return res.status(500).json({ message: 'File size cannot be longer than 2MB'})
    }
    res.status(500).json({ message: 'Could not upload the file: ' + err })
  }
}

export const getListFiles =  (req, res) => {
  const directoryPath = __basedir + '/resources/uploads/'
  fs.readdir(directoryPath, function(err, files) {
    console.log(err)
    console.log(files)
    if(err) {
      res.status(500).json({ message: 'Unable to scan files' })
    }
    let fileInfos = []
    files.forEach((file) => {
      fileInfos.push({
        name: file,
        path: directoryPath + file
      })
    })
    res.status(200).json( fileInfos )
  })
}

export const downloadFile = (req, res) => {
  const fileName = req.query.file_name
  const directoryPath = __basedir + '/resources/uploads/'
  res.download(directoryPath + fileName, fileName, (err) => {
    if(err) {
      res.status(500).json({ message: 'Could not download the file ' +  err })
    }
  })
}