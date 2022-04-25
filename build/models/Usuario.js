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

var _createClass2 = _interopRequireDefault(
  require('@babel/runtime/helpers/createClass')
)

var _classCallCheck2 = _interopRequireDefault(
  require('@babel/runtime/helpers/classCallCheck')
)

var _defineProperty2 = _interopRequireDefault(
  require('@babel/runtime/helpers/defineProperty')
)

var _database = require('../database')

var _bcryptjs = _interopRequireDefault(require('bcryptjs'))

var Usuario = /*#__PURE__*/ (0, _createClass2['default'])(function Usuario(
  json
) {
  var _this = this

  ;(0, _classCallCheck2['default'])(this, Usuario)
  ;(0, _defineProperty2['default'])(
    this,
    'crearUsuario',
    /*#__PURE__*/ (0, _asyncToGenerator2['default'])(
      /*#__PURE__*/ _regenerator['default'].mark(function _callee() {
        var query, values
        return _regenerator['default'].wrap(function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                query = 'INSERT INTO '.concat(
                  _this.tipoUsuario,
                  ' (usuario, password, nombre, apellido1, apellido2, nacimiento, dni, oa, ultimo, ip, navegador, accesos) VALUES (?)'
                )
                values = [
                  [
                    _this.usuario,
                    _this.password,
                    _this.nombre,
                    _this.apellido1,
                    _this.apellido2,
                    _this.nacimiento,
                    _this.dni,
                    _this.oa,
                    _this.ultimo,
                    _this.ip,
                    _this.navegador,
                    _this.accesos,
                  ],
                ] // Devolvemos true si la consulta fue ejecutada correctamente, devolvemos false en caso contrario

                _database.db.query(query, values, function (err, result) {
                  if (err) {
                    throw err
                  } else {
                    console.log('Ok')
                  }
                })

              case 3:
              case 'end':
                return _context.stop()
            }
          }
        }, _callee)
      })
    )
  )
  this.id = json.id || null
  this.usuario = json.usuario
  this.password = json.password
  this.nombre = json.nombre
  this.apellido1 = json.apellido1
  this.apellido2 = json.apellido2
  this.nacimiento = json.nacimiento || null
  this.dni = json.dni
  this.oa = json.oa
  this.ultimo = json.ultimo || null
  this.ip = json.ip
  this.navegador = json.navegador
  this.accesos = json.accesos
  this.tipoUsuario = json.tipoUsuario
})
;(0, _defineProperty2['default'])(
  Usuario,
  'encryptPassword',
  /*#__PURE__*/ (function () {
    var _ref2 = (0, _asyncToGenerator2['default'])(
      /*#__PURE__*/ _regenerator['default'].mark(function _callee2(password) {
        var salt
        return _regenerator['default'].wrap(function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                _context2.next = 2
                return _bcryptjs['default'].genSalt(10)

              case 2:
                salt = _context2.sent
                _context2.next = 5
                return _bcryptjs['default'].hash(password, salt)

              case 5:
                return _context2.abrupt('return', _context2.sent)

              case 6:
              case 'end':
                return _context2.stop()
            }
          }
        }, _callee2)
      })
    )

    return function (_x) {
      return _ref2.apply(this, arguments)
    }
  })()
)
;(0, _defineProperty2['default'])(
  Usuario,
  'comparePassword',
  /*#__PURE__*/ (function () {
    var _ref3 = (0, _asyncToGenerator2['default'])(
      /*#__PURE__*/ _regenerator['default'].mark(function _callee3(
        password,
        receivedPassword
      ) {
        return _regenerator['default'].wrap(function _callee3$(_context3) {
          while (1) {
            switch ((_context3.prev = _context3.next)) {
              case 0:
                _context3.next = 2
                return _bcryptjs['default'].compare(password, receivedPassword)

              case 2:
                return _context3.abrupt('return', _context3.sent)

              case 3:
              case 'end':
                return _context3.stop()
            }
          }
        }, _callee3)
      })
    )

    return function (_x2, _x3) {
      return _ref3.apply(this, arguments)
    }
  })()
)
;(0, _defineProperty2['default'])(
  Usuario,
  'compareSyncPassword',
  function (password, receivedPassword) {
    return _bcryptjs['default'].compareSync(password, receivedPassword)
  }
)
;(0, _defineProperty2['default'])(
  Usuario,
  'calcularAlumnosAsociados',
  /*#__PURE__*/ (function () {
    var _ref4 = (0, _asyncToGenerator2['default'])(
      /*#__PURE__*/ _regenerator['default'].mark(function _callee4(idUser) {
        var query
        return _regenerator['default'].wrap(function _callee4$(_context4) {
          while (1) {
            switch ((_context4.prev = _context4.next)) {
              case 0:
                query =
                  'SELECT * FROM familias_alumnos WHERE idFamiliar = '.concat(
                    idUser
                  )
                return _context4.abrupt(
                  'return',
                  new Promise(function (resolve, reject) {
                    _database.db.query(
                      query,
                      function (error, results, fields) {
                        if (error) return reject(error)
                        return resolve(results)
                      }
                    )
                  })
                )

              case 2:
              case 'end':
                return _context4.stop()
            }
          }
        }, _callee4)
      })
    )

    return function (_x4) {
      return _ref4.apply(this, arguments)
    }
  })()
)
var _default = Usuario
exports['default'] = _default
