'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports['default'] = void 0

var _util = _interopRequireDefault(require('util'))

var _multer = _interopRequireDefault(require('multer'))

var fs = require('fs')

var maxSize = 10 * 1024 * 1024

var storage = _multer['default'].diskStorage({
  destination: function destination(req, file, cb) {
    var dir = __basedir + '/resources/uploads/' + req.query.id_comunicacion

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }

    cb(null, dir)
  },
  filename: function filename(req, file, cb) {
    cb(null, file.originalname.replace(/\s/g, '-'))
  },
})

var uploadFile = (0, _multer['default'])({
  storage: storage,
  limits: {
    fileSize: maxSize,
  },
}).single('file')

var cacheFileMiddleware = _util['default'].promisify(uploadFile)

var _default = cacheFileMiddleware
exports['default'] = _default
