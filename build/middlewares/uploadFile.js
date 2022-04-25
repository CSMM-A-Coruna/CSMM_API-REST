'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports['default'] = void 0

var _util = _interopRequireDefault(require('util'))

var _multer = _interopRequireDefault(require('multer'))

var maxSize = 2 * 1024 * 1024

var storage = _multer['default'].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, __basedir + '/resources/uploads')
  },
  filename: function filename(req, file, cb) {
    cb(null, file.originalname)
  },
})

var uploadFile = (0, _multer['default'])({
  storage: storage,
  limits: {
    fileSize: maxSize,
  },
}).single('file')

var uploadFileMiddleware = _util['default'].promisify(uploadFile)

var _default = uploadFileMiddleware
exports['default'] = _default
