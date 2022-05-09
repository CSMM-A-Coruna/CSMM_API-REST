'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports['default'] = void 0

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'))

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator')
)

var _worker_threads = require('worker_threads')

var _FTPClient = _interopRequireDefault(require('../middlewares/FTPClient'))

var fs = require('fs')

var snooze = function snooze(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms)
  })
}

var cacheFile = /*#__PURE__*/ (function () {
  var _ref = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee(
      req,
      res,
      next
    ) {
      var fileName, apiDir, ftp, _cacheFile

      return _regenerator['default'].wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              if (!(req.query.file_name && req.query.id_comunicacion)) {
                _context.next = 15
                break
              }

              fileName = req.query.file_name
              apiDir =
                __basedir +
                '/resources/downloads/' +
                req.query.id_comunicacion +
                '/' +
                fileName
              ftp = new _FTPClient['default']()
              _context.next = 6
              return ftp.cacheFile(
                '/adjuntos/' + req.query.id_comunicacion + '/' + fileName,
                fileName,
                req.query.id_comunicacion
              )

            case 6:
              _cacheFile = _context.sent

            case 7:
              if (fs.existsSync(apiDir)) {
                _context.next = 12
                break
              }

              _context.next = 10
              return snooze(1)

            case 10:
              _context.next = 7
              break

            case 12:
              next()
              _context.next = 16
              break

            case 15:
              res.status(400)

            case 16:
            case 'end':
              return _context.stop()
          }
        }
      }, _callee)
    })
  )

  return function cacheFile(_x, _x2, _x3) {
    return _ref.apply(this, arguments)
  }
})()

var _default = cacheFile
exports['default'] = _default
