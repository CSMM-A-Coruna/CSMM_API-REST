'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.verifyToken = exports.verifyAuthDownload = void 0

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'))

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator')
)

var _jsonwebtoken = _interopRequireDefault(require('jsonwebtoken'))

var _config = _interopRequireDefault(require('../config'))

// -- VERIFICAR EL JSON WEB TOKEN --
var verifyToken = /*#__PURE__*/ (function () {
  var _ref = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee(
      req,
      res,
      next
    ) {
      var headers, token, decoded
      return _regenerator['default'].wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                // Cogemos las cabeceras
                headers = req.headers // Cogemos la cabecera Authorization (cors)

                token = headers.authorization // Comprobamos que existe

                if (token) {
                  _context.next = 4
                  break
                }

                return _context.abrupt(
                  'return',
                  res.status(403).json({
                    message: 'No token provided',
                  })
                )

              case 4:
                // Quitamos la palabra Bearer (que se pone por defecto)
                token = token.replace('Bearer ', '') // Comprobamos que la firma es correcta

                _context.prev = 5
                decoded = _jsonwebtoken['default'].verify(
                  token,
                  _config['default'].jwtSecret
                )
                next()
                _context.next = 13
                break

              case 10:
                _context.prev = 10
                _context.t0 = _context['catch'](5)
                return _context.abrupt(
                  'return',
                  res.status(401).json({
                    message: 'Token invalid',
                  })
                )

              case 13:
              case 'end':
                return _context.stop()
            }
          }
        },
        _callee,
        null,
        [[5, 10]]
      )
    })
  )

  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments)
  }
})()

exports.verifyToken = verifyToken

var verifyAuthDownload = /*#__PURE__*/ (function () {
  var _ref2 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee2(
      req,
      res,
      next
    ) {
      var query, auth, fileName, idCom, decoded
      return _regenerator['default'].wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                // Cogemos el query
                query = req.query
                auth = req.query.auth
                fileName = req.query.file_name
                idCom = req.query.id_comunicacion

                if (auth) {
                  _context2.next = 6
                  break
                }

                return _context2.abrupt(
                  'return',
                  res.status(403).json({
                    message: 'Parece que no tienes permisos...',
                  })
                )

              case 6:
                // Quitamos la palabra Bearer (que se pone por defecto)
                auth = auth.replace('Bearer ', '') // Comprobamos que la firma es correcta

                _context2.prev = 7
                decoded = _jsonwebtoken['default'].verify(
                  auth,
                  _config['default'].jwtSecret
                )
                next()
                _context2.next = 15
                break

              case 12:
                _context2.prev = 12
                _context2.t0 = _context2['catch'](7)
                return _context2.abrupt(
                  'return',
                  res.status(401).json({
                    message: 'No tienes permiso para descargar este documento.',
                  })
                )

              case 15:
              case 'end':
                return _context2.stop()
            }
          }
        },
        _callee2,
        null,
        [[7, 12]]
      )
    })
  )

  return function verifyAuthDownload(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments)
  }
})()

exports.verifyAuthDownload = verifyAuthDownload

function reverseString(str) {
  return str === '' ? '' : reverseString(str.substr(1)) + str.charAt(0)
}
