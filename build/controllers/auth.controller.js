'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.signUp =
  exports.signIn =
  exports.saveFCMToken =
  exports.compareData =
  exports.checkPassword =
  exports.changePassword =
    void 0

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'))

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator')
)

var _Usuario = _interopRequireDefault(require('../models/Usuario'))

var _database = require('../database')

var _Alumno = _interopRequireDefault(require('../models/Alumno'))

var _jsonwebtoken = _interopRequireDefault(require('jsonwebtoken'))

var _config = _interopRequireDefault(require('../config'))

var _app = _interopRequireDefault(require('../app'))

var _index = require('../middlewares/index')

var jwtExpireDate = '30d' // Registro

var signUp = /*#__PURE__*/ (function () {
  var _ref = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee(req, res) {
      var nuevoUsuario
      return _regenerator['default'].wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.t0 = req.query.tipoUsuario
                _context.next =
                  _context.t0 === 'admin'
                    ? 3
                    : _context.t0 === 'teacher'
                    ? 5
                    : _context.t0 === 'student'
                    ? 7
                    : _context.t0 === 'family'
                    ? 9
                    : 11
                break

              case 3:
                req.body.tipoUsuario = 'administradores'
                return _context.abrupt('break', 11)

              case 5:
                req.body.tipoUsuario = 'profesores'
                return _context.abrupt('break', 11)

              case 7:
                req.body.tipoUsuario = 'alumnos'
                return _context.abrupt('break', 11)

              case 9:
                req.body.tipoUsuario = 'familias'
                return _context.abrupt('break', 11)

              case 11:
                _context.prev = 11

                if (
                  !(
                    req.body.usuario &&
                    req.body.password &&
                    req.body.nombre &&
                    req.body.apellido1 &&
                    req.body.apellido2 &&
                    req.body.dni &&
                    req.body.oa &&
                    req.body.tipoUsuario
                  )
                ) {
                  _context.next = 25
                  break
                }

                // Definimos un nuevo usuario con el modelo Usuario
                nuevoUsuario = new _Usuario['default'](req.body) // Encriptamos la contraseña

                _context.next = 16
                return _Usuario['default'].encryptPassword(
                  nuevoUsuario.password
                )

              case 16:
                nuevoUsuario.password = _context.sent
                // Recopilamos datos a mayores
                nuevoUsuario.ultimo = new Date()
                nuevoUsuario.ip = req.ip
                nuevoUsuario.navegador = req.headers['user-agent']
                nuevoUsuario.accesos = 1 // Creamos el usuario en la base de datos

                nuevoUsuario.crearUsuario()
                res.status(200).json({
                  message: 'Usuario creado con éxito',
                })
                _context.next = 26
                break

              case 25:
                throw '400'

              case 26:
                _context.next = 31
                break

              case 28:
                _context.prev = 28
                _context.t1 = _context['catch'](11)

                if (_context.t1 == '400') {
                  res.status(400).json({
                    message: 'Faltan parámetros',
                  })
                } else {
                  if (_app['default'].settings.env == 'production') {
                    res.status(500).json({
                      message: 'Error interno del servidor',
                    })
                  } else {
                    res.status(500).json({
                      message: _context.t1,
                    })
                  }
                }

              case 31:
              case 'end':
                return _context.stop()
            }
          }
        },
        _callee,
        null,
        [[11, 28]]
      )
    })
  )

  return function signUp(_x, _x2) {
    return _ref.apply(this, arguments)
  }
})() // Login

exports.signUp = signUp

var signIn = /*#__PURE__*/ (function () {
  var _ref2 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee2(req, res) {
      var result, verifyPassword, alumnosResult
      return _regenerator['default'].wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                _context2.prev = 0

                if (!(req.body.usuario && req.body.password)) {
                  _context2.next = 8
                  break
                }

                _context2.next = 4
                return (0, _database.executeQuery)(
                  "SELECT * FROM familias WHERE usuario = '".concat(
                    req.body.usuario,
                    "'"
                  )
                )

              case 4:
                result = _context2.sent

                if (result.length) {
                  verifyPassword = _Usuario['default'].compareSyncPassword(
                    req.body.password,
                    result[0].password
                  )

                  if (verifyPassword) {
                    alumnosResult = _Usuario['default']
                      .calcularAlumnosAsociados(result[0].id)
                      .then(function (data) {
                        if (data.length) {
                          var alumnos = []

                          for (var index = 0; index < data.length; index++) {
                            var alumno = new _Alumno['default'](
                              data[index].idAlumno,
                              data[index].alumnoNombre,
                              data[index].alumnoApellido1,
                              data[index].alumnoApellido2,
                              data[index].relacion
                            )
                            alumnos.push(alumno)
                          } // Creamos y firmamos el token de autentificación

                          var token = _jsonwebtoken['default'].sign(
                            {
                              id: result[0].id,
                              usuario: result[0].usuario,
                              nombre: result[0].nombre,
                              apellido1: result[0].apellido1,
                              apellido2: result[0].apellido2,
                              nacimiento: result[0].nacimiento,
                              dni: result[0].dni,
                              oa: result[0].oa,
                              accesos: result[0].accesos,
                              tipoUsuario: 'familias',
                              alumnosAsociados: alumnos,
                            },
                            _config['default'].jwtSecret,
                            {
                              expiresIn: jwtExpireDate,
                            }
                          )

                          ;(0, _index.updateLoginUser)(
                            result[0].id,
                            req.connection.remoteAddress.split(':').pop(),
                            'Android'
                          )
                          res.status(200).json({
                            token: token,
                          })
                        }
                      })
                  } else {
                    res.status(401).json({
                      message: 'Contraseña incorrecta',
                    })
                  }
                } else {
                  res.status(404).json({
                    message: 'Usuario no encontrado',
                  })
                }

                _context2.next = 9
                break

              case 8:
                throw '400'

              case 9:
                _context2.next = 14
                break

              case 11:
                _context2.prev = 11
                _context2.t0 = _context2['catch'](0)

                if (_context2.t0 == '400') {
                  res.status(400).json({
                    message: 'Faltan parámetros',
                  })
                } else {
                  if (_app['default'].settings.env == 'production') {
                    res.status(500).json({
                      message: 'Error interno del servidor',
                    })
                  } else {
                    res.status(500).json({
                      message: _context2.t0,
                    })
                  }
                }

              case 14:
              case 'end':
                return _context2.stop()
            }
          }
        },
        _callee2,
        null,
        [[0, 11]]
      )
    })
  )

  return function signIn(_x3, _x4) {
    return _ref2.apply(this, arguments)
  }
})()

exports.signIn = signIn

var compareData = /*#__PURE__*/ (function () {
  var _ref3 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee3(req, res) {
      var token, query, result, alumnosResult
      return _regenerator['default'].wrap(
        function _callee3$(_context3) {
          while (1) {
            switch ((_context3.prev = _context3.next)) {
              case 0:
                _context3.prev = 0
                token = _jsonwebtoken['default'].decode(req.body.token)

                if (!token) {
                  _context3.next = 14
                  break
                }

                query = 'SELECT * FROM '
                  .concat(token.tipoUsuario, ' WHERE id = ')
                  .concat(token.id)
                _context3.next = 6
                return (0, _database.executeQuery)(query)

              case 6:
                result = _context3.sent

                if (!result.length) {
                  _context3.next = 11
                  break
                }

                alumnosResult = _Usuario['default']
                  .calcularAlumnosAsociados(result[0].id)
                  .then(function (data) {
                    if (data.length) {
                      var alumnos = []

                      for (var index = 0; index < data.length; index++) {
                        var alumno = new _Alumno['default'](
                          data[index].idAlumno,
                          data[index].alumnoNombre,
                          data[index].alumnoApellido1,
                          data[index].alumnoApellido2,
                          data[index].relacion
                        )
                        alumnos.push(alumno)
                      } // Creamos y firmamos el token de autentificación

                      var newToken = _jsonwebtoken['default'].sign(
                        {
                          id: result[0].id,
                          usuario: result[0].usuario,
                          nombre: result[0].nombre,
                          apellido1: result[0].apellido1,
                          apellido2: result[0].apellido2,
                          nacimiento: result[0].nacimiento,
                          dni: result[0].dni,
                          oa: result[0].oa,
                          accesos: result[0].accesos,
                          tipoUsuario: token.tipoUsuario,
                          alumnosAsociados: alumnos,
                        },
                        _config['default'].jwtSecret,
                        {
                          expiresIn: jwtExpireDate,
                        }
                      )

                      ;(0, _index.updateLoginUser)(
                        result[0].id,
                        req.connection.remoteAddress.split(':').pop(),
                        'Android'
                      )
                      res.status(200).json({
                        token: newToken,
                      })
                    }
                  })
                _context3.next = 12
                break

              case 11:
                throw '404'

              case 12:
                _context3.next = 15
                break

              case 14:
                throw '400'

              case 15:
                _context3.next = 20
                break

              case 17:
                _context3.prev = 17
                _context3.t0 = _context3['catch'](0)

                if (_context3.t0 == '400') {
                  res.status(400).json({
                    message: 'Faltan parámetros',
                  })
                } else if (_context3.t0 == '404') {
                  res.status(404).json({
                    message: 'No se ha encontrado el usuario',
                  })
                } else {
                  if (_app['default'].settings.env == 'production') {
                    res.status(500).json({
                      message: 'Error interno del servidor',
                    })
                  } else {
                    res.status(500).json({
                      message: _context3.t0,
                    })
                  }
                }

              case 20:
              case 'end':
                return _context3.stop()
            }
          }
        },
        _callee3,
        null,
        [[0, 17]]
      )
    })
  )

  return function compareData(_x5, _x6) {
    return _ref3.apply(this, arguments)
  }
})()

exports.compareData = compareData

var saveFCMToken = /*#__PURE__*/ (function () {
  var _ref4 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee4(req, res) {
      var query, updateToken
      return _regenerator['default'].wrap(
        function _callee4$(_context4) {
          while (1) {
            switch ((_context4.prev = _context4.next)) {
              case 0:
                _context4.prev = 0

                if (!(req.body.id_usuario && req.body.fcm_token)) {
                  _context4.next = 15
                  break
                }

                _context4.next = 4
                return (0, _database.executeQuery)(
                  'SELECT fcm_token FROM familias WHERE id = '.concat(
                    req.body.id_usuario
                  )
                )

              case 4:
                query = _context4.sent

                if (!query.length) {
                  _context4.next = 12
                  break
                }

                _context4.next = 8
                return (0, _database.executeQuery)(
                  "UPDATE familias SET fcm_token = '"
                    .concat(req.body.fcm_token, "' WHERE id = ")
                    .concat(req.body.id_usuario)
                )

              case 8:
                updateToken = _context4.sent
                res.status(200).json({
                  message: updateToken,
                })
                _context4.next = 13
                break

              case 12:
                throw '404'

              case 13:
                _context4.next = 16
                break

              case 15:
                throw '400'

              case 16:
                _context4.next = 21
                break

              case 18:
                _context4.prev = 18
                _context4.t0 = _context4['catch'](0)

                if (_context4.t0 == '400') {
                  res.status(400).json({
                    message: 'Faltan parámetros',
                  })
                } else if (_context4.t0 == '404') {
                  res.status(404).json({
                    message: 'No se ha encontrado el usuario',
                  })
                } else {
                  if (_app['default'].settings.env == 'production') {
                    res.status(500).json({
                      message: 'Error interno del servidor',
                    })
                  } else {
                    res.status(500).json({
                      message: _context4.t0,
                    })
                  }
                }

              case 21:
              case 'end':
                return _context4.stop()
            }
          }
        },
        _callee4,
        null,
        [[0, 18]]
      )
    })
  )

  return function saveFCMToken(_x7, _x8) {
    return _ref4.apply(this, arguments)
  }
})()

exports.saveFCMToken = saveFCMToken

var checkPassword = /*#__PURE__*/ (function () {
  var _ref5 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee5(req, res) {
      var _req$body, id_usuario, password, result, verifyPassword

      return _regenerator['default'].wrap(
        function _callee5$(_context5) {
          while (1) {
            switch ((_context5.prev = _context5.next)) {
              case 0:
                _context5.prev = 0
                ;(_req$body = req.body),
                  (id_usuario = _req$body.id_usuario),
                  (password = _req$body.password)

                if (!(id_usuario && password)) {
                  _context5.next = 14
                  break
                }

                _context5.next = 5
                return (0, _database.executeQuery)(
                  "SELECT * FROM familias WHERE id = '".concat(id_usuario, "'")
                )

              case 5:
                result = _context5.sent

                if (!result.length) {
                  _context5.next = 11
                  break
                }

                verifyPassword = _Usuario['default'].compareSyncPassword(
                  password,
                  result[0].password
                )

                if (verifyPassword) {
                  res.status(200).json({
                    correct_password: true,
                  })
                } else {
                  res.status(401).json({
                    correct_password: false,
                  })
                }

                _context5.next = 12
                break

              case 11:
                throw '404'

              case 12:
                _context5.next = 15
                break

              case 14:
                throw '400'

              case 15:
                _context5.next = 20
                break

              case 17:
                _context5.prev = 17
                _context5.t0 = _context5['catch'](0)

                if (_context5.t0 == '400') {
                  res.status(400).json({
                    message: 'Faltan parámetros',
                  })
                } else if (_context5.t0 == '404') {
                  res.status(404).json({
                    message: 'No se ha encontrado el usuario',
                  })
                } else {
                  if (_app['default'].settings.env == 'production') {
                    res.status(500).json({
                      message: 'Error interno del servidor',
                    })
                  } else {
                    res.status(500).json({
                      message: _context5.t0,
                    })
                  }
                }

              case 20:
              case 'end':
                return _context5.stop()
            }
          }
        },
        _callee5,
        null,
        [[0, 17]]
      )
    })
  )

  return function checkPassword(_x9, _x10) {
    return _ref5.apply(this, arguments)
  }
})()

exports.checkPassword = checkPassword

var changePassword = /*#__PURE__*/ (function () {
  var _ref6 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee6(req, res) {
      var _req$body2, id_usuario, new_password, encryptedPassword, query

      return _regenerator['default'].wrap(
        function _callee6$(_context6) {
          while (1) {
            switch ((_context6.prev = _context6.next)) {
              case 0:
                _context6.prev = 0
                ;(_req$body2 = req.body),
                  (id_usuario = _req$body2.id_usuario),
                  (new_password = _req$body2.new_password)

                if (!(id_usuario != undefined && new_password != undefined)) {
                  _context6.next = 12
                  break
                }

                _context6.next = 5
                return _Usuario['default'].encryptPassword(new_password)

              case 5:
                encryptedPassword = _context6.sent
                _context6.next = 8
                return (0, _database.executeQuery)(
                  "UPDATE familias SET password = '"
                    .concat(encryptedPassword, "' WHERE id = ")
                    .concat(id_usuario)
                )

              case 8:
                query = _context6.sent
                res.status(200).json({
                  message: 'Contraseña cambiada con éxito',
                })
                _context6.next = 13
                break

              case 12:
                throw '400'

              case 13:
                _context6.next = 18
                break

              case 15:
                _context6.prev = 15
                _context6.t0 = _context6['catch'](0)

                if (_context6.t0 == '400') {
                  res.status(400).json({
                    message: 'Faltan parámetros',
                  })
                } else if (_context6.t0 == '404') {
                  res.status(404).json({
                    message: 'No se ha encontrado el usuario',
                  })
                } else {
                  if (_app['default'].settings.env == 'production') {
                    res.status(500).json({
                      message: 'Error interno del servidor',
                    })
                  } else {
                    console.log(_context6.t0)
                    res.status(500).json({
                      message: _context6.t0,
                    })
                  }
                }

              case 18:
              case 'end':
                return _context6.stop()
            }
          }
        },
        _callee6,
        null,
        [[0, 15]]
      )
    })
  )

  return function changePassword(_x11, _x12) {
    return _ref6.apply(this, arguments)
  }
})()

exports.changePassword = changePassword
