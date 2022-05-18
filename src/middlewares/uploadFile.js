import util from 'util'
import multer from 'multer'
const fs = require('fs')

const maxSize = 10 * 1024 * 1024

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

let cacheFileMiddleware = util.promisify(uploadFile)

export default cacheFileMiddleware
