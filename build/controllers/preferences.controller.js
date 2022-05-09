'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.updatePreference = exports.getAllPreferences = void 0

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'))

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator')
)

var _database = require('../database')

var getAllPreferences = /*#__PURE__*/ (function () {
  var _ref = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee(req, res) {
      var id_usuario, query
      return _regenerator['default'].wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.prev = 0
                id_usuario = req.query.id_usuario

                if (!id_usuario) {
                  _context.next = 13
                  break
                }

                _context.next = 5
                return (0, _database.executeQuery)(
                  'SELECT * FROM familias_app_ajustes WHERE id_usuario = '.concat(
                    id_usuario
                  )
                )

              case 5:
                query = _context.sent

                if (!(query.length > 0)) {
                  _context.next = 10
                  break
                }

                res.status(200).json(query[0])
                _context.next = 11
                break

              case 10:
                throw '404'

              case 11:
                _context.next = 14
                break

              case 13:
                throw '400'

              case 14:
                _context.next = 19
                break

              case 16:
                _context.prev = 16
                _context.t0 = _context['catch'](0)

                if (_context.t0 == '400') {
                  res.status(400).json({
                    message: 'Faltan parámetros',
                  })
                } else if ((_context.t0 = '404')) {
                  res.status(404).json({
                    message: 'No se ha encontrado el ID del usuario',
                  })
                } else {
                  if (app.settings.env == 'production') {
                    res.status(500).json({
                      message: 'Error interno del servidor',
                    })
                  } else {
                    res.status(500).json({
                      message: _context.t0,
                    })
                  }
                }

              case 19:
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

  return function getAllPreferences(_x, _x2) {
    return _ref.apply(this, arguments)
  }
})()

exports.getAllPreferences = getAllPreferences

var updatePreference = /*#__PURE__*/ (function () {
  var _ref2 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee2(req, res) {
      var _req$body, id_usuario, tipo_preferencia, value, query

      return _regenerator['default'].wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                _context2.prev = 0
                ;(_req$body = req.body),
                  (id_usuario = _req$body.id_usuario),
                  (tipo_preferencia = _req$body.tipo_preferencia),
                  (value = _req$body.value)

                if (!(id_usuario && tipo_preferencia && value != undefined)) {
                  _context2.next = 9
                  break
                }

                _context2.next = 5
                return (0, _database.executeQuery)(
                  'UPDATE familias_app_ajustes SET '
                    .concat(req.body.tipo_preferencia, ' = ')
                    .concat(req.body.value, ' WHERE id_usuario = ')
                    .concat(req.body.id_usuario)
                )

              case 5:
                query = _context2.sent
                res.status(200).json(query)
                _context2.next = 10
                break

              case 9:
                throw '400'

              case 10:
                _context2.next = 15
                break

              case 12:
                _context2.prev = 12
                _context2.t0 = _context2['catch'](0)

                if (_context2.t0 == '400') {
                  res.status(400).json({
                    message: 'Faltan parámetros',
                  })
                } else if ((_context2.t0 = '404')) {
                  res.status(404).json({
                    message: 'No se ha encontrado el ID del usuario',
                  })
                } else {
                  if (app.settings.env == 'production') {
                    res.status(500).json({
                      message: 'Error interno del servidor',
                    })
                  } else {
                    res.status(500).json({
                      message: _context2.t0,
                    })
                  }
                }

              case 15:
              case 'end':
                return _context2.stop()
            }
          }
        },
        _callee2,
        null,
        [[0, 12]]
      )
    })
  )

  return function updatePreference(_x3, _x4) {
    return _ref2.apply(this, arguments)
  }
})()

exports.updatePreference = updatePreference
