import config from './../../config'
const fs = require('fs')
const Client = require('ftp')

class FTPClient {
  constructor(
    host = 'csmm-es.espacioseguro.com',
    port = 21,
    username = 'jmiralles',
    password = config.ftpPassword,
    secure = false
  ) {
    this.settings = {
      host: host,
      port: port,
      user: username,
      password: password,
      secure: secure,
    }
    this.client = new Client()
  }

  async getList(path, res) {
    let c = this.client
    c.on('ready', function () {
      c.list(path, function (err, list) {
        if (err) throw err
        res.status(200).send(list)
        c.end()
      })
    })
    c.connect(this.settings)
  }

  async makeDir(idComunicacion) {
    let c = this.client
    c.on('ready', function () {
      c.mkdir('/adjuntos/' + idComunicacion, true, function (err) {
        if (err) throw err
      })
      c.end()
    })
    c.connect(this.settings)
  }

  async uploadFile(idComunicacion, fileName) {
    let c = this.client
    // Primero creamos el directorio en caso de que no exista.
    c.on('ready', function () {
      c.mkdir('/adjuntos/' + idComunicacion, false, function (err) {
        if (err && err != 'Error: Create directory operation failed.') {
          console.log(err)
        }
        const cacheDir =
          __basedir + '/resources/uploads/' + idComunicacion + '/' + fileName
        const ftpDir = '/adjuntos/' + idComunicacion + '/' + fileName
        c.put(cacheDir, ftpDir, function (err) {
          c.end()
        })
      })
    })
    c.connect(this.settings)
  }

  async cacheAdjunto(path, fileName, id_comunicacion) {
    let c = this.client
    c.on('ready', function () {
      c.get(path, function (err, stream) {
        if (err) throw err
        stream.once('close', function () {
          c.end()
        })
        let dir = __basedir + '/resources/downloads/adjuntos/' + id_comunicacion
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir)
        }
        stream.pipe(fs.createWriteStream(dir + '/' + fileName))
      })
    })
    c.connect(this.settings)
  }

  async cacheDocumentoGeneral(path, fileName, grupo) {
    let c = this.client
    c.on('ready', function () {
      c.get(path, function (err, stream) {
        if (err) throw err
        stream.once('close', function () {
          c.end()
        })
        let dir = __basedir + '/resources/downloads/documentos/generales/' + grupo
        if(!fs.existsSync(dir)) {
          fs.mkdirSync(dir)
        }
        stream.pipe(fs.createWriteStream(dir + '/' + fileName))
      })
    })
    c.connect(this.settings)
  }

  async cacheDocumentoAlumno(path, fileName, idAlumno) {
    let c = this.client
    try {
      c.on('ready', function () {
        c.get(path, function (err, stream) {
          if (err) throw err
          stream.once('close', function () {
            c.end()
          })
          let dir = __basedir + '/resources/downloads/documentos/alumnos/' + idAlumno
          if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
          }
          stream.pipe(fs.createWriteStream(dir + '/' + fileName))
        })
      })
      c.connect(this.settings)
    } catch(err) {
      console.log(err)
    }
  }
}

export default FTPClient
