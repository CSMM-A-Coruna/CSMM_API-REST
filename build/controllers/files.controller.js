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

var fs = require('fs')

var upload = /*#__PURE__*/ (function () {
  var _ref = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee(req, res) {
      return _regenerator['default'].wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.prev = 0
                _context.next = 3
                return (0, _middlewares.uploadFileMiddleware)(req, res)

              case 3:
                if (!(req.file == undefined)) {
                  _context.next = 5
                  break
                }

                return _context.abrupt(
                  'return',
                  res.status(400).json({
                    message: 'Please upload a file',
                  })
                )

              case 5:
                res.status(200).json({
                  message: 'File uploaded succesfully',
                })
                _context.next = 13
                break

              case 8:
                _context.prev = 8
                _context.t0 = _context['catch'](0)

                if (!(_context.t0.code == 'LIMIT_FILE_SIZE')) {
                  _context.next = 12
                  break
                }

                return _context.abrupt(
                  'return',
                  res.status(500).json({
                    message: 'File size cannot be longer than 2MB',
                  })
                )

              case 12:
                res.status(500).json({
                  message: 'Could not upload the file: ' + _context.t0,
                })

              case 13:
              case 'end':
                return _context.stop()
            }
          }
        },
        _callee,
        null,
        [[0, 8]]
      )
    })
  )

  return function upload(_x, _x2) {
    return _ref.apply(this, arguments)
  }
})()

exports.upload = upload

var getListFiles = function getListFiles(req, res) {
  var directoryPath = __basedir + '/resources/uploads/'
  fs.readdir(directoryPath, function (err, files) {
    console.log(err)
    console.log(files)

    if (err) {
      res.status(500).json({
        message: 'Unable to scan files',
      })
    }

    var fileInfos = []
    files.forEach(function (file) {
      fileInfos.push({
        name: file,
        path: directoryPath + file,
      })
    })
    res.status(200).json(fileInfos)
  })
}

exports.getListFiles = getListFiles

var downloadFile = function downloadFile(req, res) {
  var fileName = req.query.file_name
  var directoryPath = __basedir + '/resources/uploads/'
  res.download(directoryPath + fileName, fileName, function (err) {
    if (err) {
      res.status(500).json({
        message: 'Could not download the file ' + err,
      })
    }
  })
}

exports.downloadFile = downloadFile
