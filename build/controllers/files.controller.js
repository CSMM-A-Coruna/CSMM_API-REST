'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.upload = exports.getListFiles = exports.downloadFile = void 0

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'))

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator')
)

var _middlewares = require('../middlewares')

var _FTPClient = _interopRequireDefault(require('../middlewares/FTPClient'))

var _database = require('../database')

var _app = _interopRequireDefault(require('../app'))

var upload = /*#__PURE__*/ (function () {
  var _ref = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee(req, res) {
      var ftp, uploadFileToFtp, result
      return _regenerator['default'].wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.prev = 0
                _context.next = 3
                return (0, _middlewares.cacheFileMiddleware)(req, res)

              case 3:
                if (
                  !(
                    req.file == undefined ||
                    req.query.id_comunicacion == undefined
                  )
                ) {
                  _context.next = 5
                  break
                }

                return _context.abrupt(
                  'return',
                  res.status(400).json({
                    message:
                      'Sube un archivo o especifica el id de la comunicación',
                  })
                )

              case 5:
                req.file.originalname = req.file.originalname.replace(
                  /\s/g,
                  '-'
                )
                ftp = new _FTPClient['default']()
                _context.next = 9
                return ftp.uploadFile(
                  req.query.id_comunicacion,
                  req.file.originalname
                )

              case 9:
                uploadFileToFtp = _context.sent
                _context.next = 12
                return (0, _database.executeQuery)(
                  'INSERT INTO comunicaciones_adjuntos (idcomunicacion, adjunto) VALUES ('
                    .concat(req.query.id_comunicacion, ", '")
                    .concat(req.file.originalname, "')")
                )

              case 12:
                result = _context.sent
                res.status(200).json({
                  message: 'Archivo subido con éxito',
                })
                _context.next = 21
                break

              case 16:
                _context.prev = 16
                _context.t0 = _context['catch'](0)

                if (!(_context.t0.code == 'LIMIT_FILE_SIZE')) {
                  _context.next = 20
                  break
                }

                return _context.abrupt(
                  'return',
                  res.status(413).json({
                    message: 'El archivo no puede superar los 10MB',
                  })
                )

              case 20:
                if (_app['default'].settings.env == 'production') {
                  res.status(500).json({
                    message: 'Error interno del servidor',
                  })
                } else {
                  res.status(500).json({
                    message: _context.t0,
                  })
                }

              case 21:
              case 'end':
                return _context.stop()
            }
          }
        },
        _callee,
        null,
        [[0, 16]]
      )
    })
  )

  return function upload(_x, _x2) {
    return _ref.apply(this, arguments)
  }
})()

exports.upload = upload

var downloadFile = /*#__PURE__*/ (function () {
  var _ref2 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee2(req, res) {
      var fileName, directoryPath
      return _regenerator['default'].wrap(function _callee2$(_context2) {
        while (1) {
          switch ((_context2.prev = _context2.next)) {
            case 0:
              fileName = req.query.file_name
              directoryPath =
                __basedir + '/resources/downloads/' + req.query.id_comunicacion
              res.download(
                directoryPath + '/' + fileName,
                fileName,
                function (err) {
                  if (err) {
                    if (_app['default'].settings.env == 'production') {
                      res.status(500).json({
                        message: 'Error interno del servidor',
                      })
                    } else {
                      res.status(500).json({
                        message: err,
                      })
                    }
                  }
                }
              )

            case 3:
            case 'end':
              return _context2.stop()
          }
        }
      }, _callee2)
    })
  )

  return function downloadFile(_x3, _x4) {
    return _ref2.apply(this, arguments)
  }
})()

exports.downloadFile = downloadFile

var getListFiles = /*#__PURE__*/ (function () {
  var _ref3 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee3(req, res) {
      var path, ftp
      return _regenerator['default'].wrap(function _callee3$(_context3) {
        while (1) {
          switch ((_context3.prev = _context3.next)) {
            case 0:
              path = ''

              if (req.query.path) {
                path = req.query.path
              }

              ftp = new _FTPClient['default']()
              ftp.getList(path, res)

            case 4:
            case 'end':
              return _context3.stop()
          }
        }
      }, _callee3)
    })
  )

  return function getListFiles(_x5, _x6) {
    return _ref3.apply(this, arguments)
  }
})()

exports.getListFiles = getListFiles
