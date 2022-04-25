'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.updateCom =
  exports.sendCom =
  exports.getAllCommsSent =
  exports.getAllCommsReceived =
  exports.getAllCommsDeleted =
    void 0

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'))

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator')
)

var _database = require('../database')

var _Comunicacion = _interopRequireDefault(require('../models/Comunicacion'))

var _NuevaComunicacion = _interopRequireDefault(
  require('../models/NuevaComunicacion')
)

var getAllCommsReceived = /*#__PURE__*/ (function () {
  var _ref = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee(req, res) {
      var query, result, comms, index, com
      return _regenerator['default'].wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.prev = 0

                if (!req.query.user_id) {
                  _context.next = 14
                  break
                }

                query =
                  'SELECT *, nombreRemite(comunicaciones_generales.tiporemite, comunicaciones_generales.idremite) AS nombreRemite, nombreDestino(comunicaciones_generales.tipodestino, comunicaciones_generales.iddestino) AS nombreDestino\n                            FROM comunicaciones_generales\n                            WHERE tipodestino = 2 AND iddestino = '.concat(
                    req.query.user_id,
                    ' AND comunicaciones_generales.eliminado IS NULL ORDER BY comunicaciones_generales.fecha DESC'
                  )
                _context.next = 5
                return (0, _database.executeQuery)(query)

              case 5:
                result = _context.sent

                if (!result.length) {
                  _context.next = 11
                  break
                }

                comms = []

                for (index = 0; index < result.length; index++) {
                  com = new _Comunicacion['default'](
                    result[index].idcomunicacion,
                    result[index].idremite,
                    result[index].iddestino,
                    result[index].idAlumnoAsociado,
                    result[index].asunto,
                    result[index].texto,
                    result[index].importante,
                    result[index].fecha,
                    result[index].leida,
                    result[index].eliminado,
                    'recibida',
                    result[index].alumnoAsociado,
                    result[index].nombreRemite,
                    result[index].nombreDestino
                  )
                  com.calcularTipoDestino(result[index].tipodestino)
                  com.calcularTipoRemite(result[index].tiporemite)
                  comms.push(com)

                  if (!result[index + 1]) {
                    res.status(200).json(comms)
                  }
                }

                _context.next = 12
                break

              case 11:
                throw '404'

              case 12:
                _context.next = 15
                break

              case 14:
                throw '400'

              case 15:
                _context.next = 20
                break

              case 17:
                _context.prev = 17
                _context.t0 = _context['catch'](0)

                if (_context.t0 == '400') {
                  res.status(400).json({
                    message: 'Faltan parámetros',
                  })
                } else if ((_context.t0 = '404')) {
                  res.status(404).json({
                    message: 'No se han encontrado comunicaciones recibidas',
                  })
                } else {
                  res.status(500).json({
                    message: 'Error interno del servidor',
                  })
                }

              case 20:
              case 'end':
                return _context.stop()
            }
          }
        },
        _callee,
        null,
        [[0, 17]]
      )
    })
  )

  return function getAllCommsReceived(_x, _x2) {
    return _ref.apply(this, arguments)
  }
})()

exports.getAllCommsReceived = getAllCommsReceived

var getAllCommsSent = /*#__PURE__*/ (function () {
  var _ref2 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee3(req, res) {
      return _regenerator['default'].wrap(
        function _callee3$(_context3) {
          while (1) {
            switch ((_context3.prev = _context3.next)) {
              case 0:
                _context3.prev = 0

                if (!req.query.user_id) {
                  _context3.next = 5
                  break
                }

                return _context3.delegateYield(
                  /*#__PURE__*/ _regenerator['default'].mark(
                    function _callee2() {
                      var query, result
                      return _regenerator['default'].wrap(function _callee2$(
                        _context2
                      ) {
                        while (1) {
                          switch ((_context2.prev = _context2.next)) {
                            case 0:
                              query =
                                'SELECT * FROM comunicaciones_generales WHERE tiporemite = 2 AND idremite = '.concat(
                                  req.query.user_id,
                                  ' AND comunicaciones_generales.eliminado IS NULL ORDER BY comunicaciones_generales.fecha DESC'
                                )
                              _context2.next = 3
                              return (0, _database.executeQuery)(query)

                            case 3:
                              result = _context2.sent

                              if (!result.length) {
                                _context2.next = 8
                                break
                              }

                              ;(function () {
                                var comms = []

                                var _loop = function _loop(index) {
                                  var com = new _Comunicacion['default'](
                                    result[index].idcomunicacion,
                                    result[index].idremite,
                                    result[index].iddestino,
                                    result[index].idAlumnoAsociado,
                                    result[index].asunto,
                                    result[index].texto,
                                    result[index].importante,
                                    result[index].fecha,
                                    result[index].leida,
                                    result[index].eliminado,
                                    'enviada',
                                    result[index].alumnoAsociado
                                  )
                                  com.calcularTipoDestino(
                                    result[index].tipodestino
                                  )
                                  com.calcularTipoRemite(
                                    result[index].tiporemite
                                  )
                                  com
                                    .calcularNombreDestino()
                                    .then(function (data) {
                                      com.nombre_destino =
                                        data[0].nombre +
                                        ' ' +
                                        data[0].apellido1 +
                                        ' ' +
                                        data[0].apellido2
                                      com
                                        .calcularNombreRemite()
                                        .then(function (data2) {
                                          com.nombre_remite =
                                            data2[0].nombre +
                                            ' ' +
                                            data2[0].apellido1 +
                                            ' ' +
                                            data2[0].apellido2
                                          comms.push(com)

                                          if (!result[index + 1]) {
                                            res.status(200).json(comms)
                                          }
                                        })
                                    })
                                }

                                for (
                                  var index = 0;
                                  index < result.length;
                                  index++
                                ) {
                                  _loop(index)
                                }
                              })()

                              _context2.next = 9
                              break

                            case 8:
                              throw '404'

                            case 9:
                            case 'end':
                              return _context2.stop()
                          }
                        }
                      },
                      _callee2)
                    }
                  )(),
                  't0',
                  3
                )

              case 3:
                _context3.next = 6
                break

              case 5:
                throw '400'

              case 6:
                _context3.next = 11
                break

              case 8:
                _context3.prev = 8
                _context3.t1 = _context3['catch'](0)

                if (_context3.t1 == '404') {
                  res.status(404).json({
                    message:
                      'No hay comunicaciones enviadas asociadas a este usuario',
                  })
                } else if (_context3.t1 == '400') {
                  res.status(400).json({
                    message: 'Faltan parámetros',
                  })
                } else {
                  res.status(500).json({
                    message: 'Error interno del servidor',
                  })
                }

              case 11:
              case 'end':
                return _context3.stop()
            }
          }
        },
        _callee3,
        null,
        [[0, 8]]
      )
    })
  )

  return function getAllCommsSent(_x3, _x4) {
    return _ref2.apply(this, arguments)
  }
})()

exports.getAllCommsSent = getAllCommsSent

var getAllCommsDeleted = /*#__PURE__*/ (function () {
  var _ref3 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee5(req, res) {
      return _regenerator['default'].wrap(
        function _callee5$(_context5) {
          while (1) {
            switch ((_context5.prev = _context5.next)) {
              case 0:
                _context5.prev = 0

                if (!req.query.user_id) {
                  _context5.next = 5
                  break
                }

                return _context5.delegateYield(
                  /*#__PURE__*/ _regenerator['default'].mark(
                    function _callee4() {
                      var query, result, comms, _loop2, index

                      return _regenerator['default'].wrap(function _callee4$(
                        _context4
                      ) {
                        while (1) {
                          switch ((_context4.prev = _context4.next)) {
                            case 0:
                              query =
                                'SELECT * FROM comunicaciones_generales WHERE tipodestino = 2 AND iddestino = '.concat(
                                  req.query.user_id,
                                  ' AND comunicaciones_generales.eliminado IS NOT NULL ORDER BY comunicaciones_generales.fecha DESC'
                                )
                              _context4.next = 3
                              return (0, _database.executeQuery)(query)

                            case 3:
                              result = _context4.sent
                              comms = []

                              if (!result.length) {
                                _context4.next = 10
                                break
                              }

                              _loop2 = function _loop2(index) {
                                var com = new _Comunicacion['default'](
                                  result[index].idcomunicacion,
                                  result[index].idremite,
                                  result[index].iddestino,
                                  result[index].idAlumnoAsociado,
                                  result[index].asunto,
                                  result[index].texto,
                                  result[index].importante,
                                  result[index].fecha,
                                  result[index].leida,
                                  result[index].eliminado,
                                  'borrada',
                                  result[index].alumnoAsociado
                                )
                                com.calcularTipoDestino(
                                  result[index].tipodestino
                                )
                                com.calcularTipoRemite(result[index].tiporemite)
                                com
                                  .calcularNombreDestino()
                                  .then(function (data) {
                                    com.nombre_destino =
                                      data[0].nombre +
                                      ' ' +
                                      data[0].apellido1 +
                                      ' ' +
                                      data[0].apellido2
                                    com
                                      .calcularNombreRemite()
                                      .then(function (data2) {
                                        com.nombre_remite =
                                          data2[0].nombre +
                                          ' ' +
                                          data2[0].apellido1 +
                                          ' ' +
                                          data2[0].apellido2
                                        comms.push(com)

                                        if (!result[index + 1]) {
                                          res.status(200).json(comms)
                                        }
                                      })
                                  })
                              }

                              for (index = 0; index < result.length; index++) {
                                _loop2(index)
                              }

                              _context4.next = 11
                              break

                            case 10:
                              throw '404'

                            case 11:
                            case 'end':
                              return _context4.stop()
                          }
                        }
                      },
                      _callee4)
                    }
                  )(),
                  't0',
                  3
                )

              case 3:
                _context5.next = 6
                break

              case 5:
                throw '400'

              case 6:
                _context5.next = 11
                break

              case 8:
                _context5.prev = 8
                _context5.t1 = _context5['catch'](0)

                if (_context5.t1 == '400') {
                  res.status(400).json({
                    message: 'Faltan parámetros',
                  })
                } else if ((_context5.t1 = '404')) {
                  res.status(404).json({
                    message: 'No se han encontrado comunicaciones recibidas',
                  })
                } else {
                  res.status(500).json({
                    message: 'Error interno del servidor',
                  })
                }

              case 11:
              case 'end':
                return _context5.stop()
            }
          }
        },
        _callee5,
        null,
        [[0, 8]]
      )
    })
  )

  return function getAllCommsDeleted(_x5, _x6) {
    return _ref3.apply(this, arguments)
  }
})()

exports.getAllCommsDeleted = getAllCommsDeleted

var updateCom = /*#__PURE__*/ (function () {
  var _ref4 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee6(req, res) {
      var query,
        _result,
        query1,
        result1,
        currentDate,
        date,
        query2,
        result2,
        currentDate2,
        date2,
        query3,
        result3,
        query4,
        result4

      return _regenerator['default'].wrap(
        function _callee6$(_context6) {
          while (1) {
            switch ((_context6.prev = _context6.next)) {
              case 0:
                _context6.prev = 0

                if (
                  !(req.query.state && req.query.id_com && req.query.id_destino)
                ) {
                  _context6.next = 100
                  break
                }

                _context6.t0 = req.query.state
                _context6.next =
                  _context6.t0 === 'importante'
                    ? 5
                    : _context6.t0 === 'no_importante'
                    ? 23
                    : _context6.t0 === 'leida'
                    ? 41
                    : _context6.t0 === 'eliminado'
                    ? 61
                    : _context6.t0 === 'restaurar'
                    ? 81
                    : 98
                break

              case 5:
                query =
                  'UPDATE comunicaciones_destinos SET importante = 1 WHERE comunicaciones_destinos.idcomunicacion = '
                    .concat(
                      req.query.id_com,
                      ' AND comunicaciones_destinos.iddestino = '
                    )
                    .concat(
                      req.query.id_destino,
                      ' AND comunicaciones_destinos.tipodestino = 2'
                    )
                _context6.next = 8
                return (0, _database.executeQuery)(query)

              case 8:
                _result = _context6.sent

                if (!(_result.changedRows == 1)) {
                  _context6.next = 13
                  break
                }

                res.status(200).json({
                  message: 'Estado de la comunicación actualizado',
                })
                _context6.next = 22
                break

              case 13:
                if (!(_result.affectedRows == 0)) {
                  _context6.next = 17
                  break
                }

                throw '409'

              case 17:
                if (!(_result.affectedRows == 1 && _result.changedRows == 0)) {
                  _context6.next = 21
                  break
                }

                throw '409'

              case 21:
                throw '500'

              case 22:
                return _context6.abrupt('break', 98)

              case 23:
                query1 =
                  'UPDATE comunicaciones_destinos SET importante = 0 WHERE comunicaciones_destinos.idcomunicacion = '
                    .concat(
                      req.query.id_com,
                      ' AND comunicaciones_destinos.iddestino = '
                    )
                    .concat(
                      req.query.id_destino,
                      ' AND comunicaciones_destinos.tipodestino = 2'
                    )
                _context6.next = 26
                return (0, _database.executeQuery)(query1)

              case 26:
                result1 = _context6.sent

                if (!(result1.changedRows == 1)) {
                  _context6.next = 31
                  break
                }

                res.status(200).json({
                  message: 'Estado de la comunicación actualizado',
                })
                _context6.next = 40
                break

              case 31:
                if (!(result1.affectedRows == 0)) {
                  _context6.next = 35
                  break
                }

                throw '404'

              case 35:
                if (!(result1.affectedRows == 1 && result1.changedRows == 0)) {
                  _context6.next = 39
                  break
                }

                throw '409'

              case 39:
                throw '500'

              case 40:
                return _context6.abrupt('break', 98)

              case 41:
                currentDate = new Date()
                date = currentDate.toISOString()
                query2 = 'UPDATE comunicaciones_destinos SET leida = "'
                  .concat(
                    date,
                    '" WHERE comunicaciones_destinos.idcomunicacion = '
                  )
                  .concat(
                    req.query.id_com,
                    ' AND comunicaciones_destinos.iddestino = '
                  )
                  .concat(
                    req.query.id_destino,
                    ' AND comunicaciones_destinos.tipodestino = 2'
                  )
                _context6.next = 46
                return (0, _database.executeQuery)(query2)

              case 46:
                result2 = _context6.sent

                if (!(result2.changedRows == 1)) {
                  _context6.next = 51
                  break
                }

                res.status(200).json({
                  message: 'Estado de la comunicación actualizado',
                })
                _context6.next = 60
                break

              case 51:
                if (!(result2.affectedRows == 0)) {
                  _context6.next = 55
                  break
                }

                throw '404'

              case 55:
                if (!(result2.affectedRows == 1 && result2.changedRows == 0)) {
                  _context6.next = 59
                  break
                }

                throw '409'

              case 59:
                throw '500'

              case 60:
                return _context6.abrupt('break', 98)

              case 61:
                currentDate2 = new Date()
                date2 = currentDate2.toISOString()
                query3 = 'UPDATE comunicaciones_destinos SET eliminado = "'
                  .concat(
                    date2,
                    '" WHERE comunicaciones_destinos.idcomunicacion = '
                  )
                  .concat(
                    req.query.id_com,
                    ' AND comunicaciones_destinos.iddestino = '
                  )
                  .concat(
                    req.query.id_destino,
                    ' AND comunicaciones_destinos.tipodestino = 2'
                  )
                _context6.next = 66
                return (0, _database.executeQuery)(query3)

              case 66:
                result3 = _context6.sent

                if (!(result3.changedRows == 1)) {
                  _context6.next = 71
                  break
                }

                res.status(200).json({
                  message: 'Estado de la comunicación actualizado',
                })
                _context6.next = 80
                break

              case 71:
                if (!(result3.affectedRows == 0)) {
                  _context6.next = 75
                  break
                }

                throw '404'

              case 75:
                if (!(result3.affectedRows == 1 && result3.changedRows == 0)) {
                  _context6.next = 79
                  break
                }

                throw '409'

              case 79:
                throw '500'

              case 80:
                return _context6.abrupt('break', 98)

              case 81:
                query4 =
                  'UPDATE comunicaciones_destinos SET eliminado = NULL WHERE comunicaciones_destinos.idcomunicacion = '
                    .concat(
                      req.query.id_com,
                      ' AND comunicaciones_destinos.iddestino = '
                    )
                    .concat(
                      req.query.id_destino,
                      ' AND comunicaciones_destinos.tipodestino = 2'
                    )
                _context6.next = 84
                return (0, _database.executeQuery)(query4)

              case 84:
                result4 = _context6.sent

                if (!(result4.changedRows == 1)) {
                  _context6.next = 89
                  break
                }

                res.status(200).json({
                  message: 'Estado de la comunicación actualizado',
                })
                _context6.next = 98
                break

              case 89:
                if (!(result4.affectedRows == 0)) {
                  _context6.next = 93
                  break
                }

                throw '404'

              case 93:
                if (!(result4.affectedRows == 1 && result4.changedRows == 0)) {
                  _context6.next = 97
                  break
                }

                throw '409'

              case 97:
                throw '500'

              case 98:
                _context6.next = 101
                break

              case 100:
                throw '400'

              case 101:
                _context6.next = 106
                break

              case 103:
                _context6.prev = 103
                _context6.t1 = _context6['catch'](0)

                if (_context6.t1 == '404') {
                  res.status(404).json({
                    message: 'No se ha encontrado una comunicación con ese ID',
                  })
                } else if (_context6.t1 == '400') {
                  res.status(400).json({
                    message: 'Faltan parámetros',
                  })
                } else if (_context6.t1 == '409') {
                  res.status(409).send()
                } else {
                  res.status(500).json({
                    message: 'Error interno del servidor',
                  })
                }

              case 106:
              case 'end':
                return _context6.stop()
            }
          }
        },
        _callee6,
        null,
        [[0, 103]]
      )
    })
  )

  return function updateCom(_x7, _x8) {
    return _ref4.apply(this, arguments)
  }
})()

exports.updateCom = updateCom

var sendCom = /*#__PURE__*/ (function () {
  var _ref5 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee7(req, res) {
      var com, query, _result2

      return _regenerator['default'].wrap(
        function _callee7$(_context7) {
          while (1) {
            switch ((_context7.prev = _context7.next)) {
              case 0:
                _context7.prev = 0

                if (
                  !(
                    req.body.asunto &&
                    req.body.texto &&
                    req.body.id_remite &&
                    req.body.tipo_destino &&
                    req.body.id_destino &&
                    req.body.id_alumnoAsociado
                  )
                ) {
                  _context7.next = 7
                  break
                }

                com = new _NuevaComunicacion['default'](
                  req.body.asunto,
                  req.body.texto,
                  req.body.id_remite,
                  req.body.tipo_destino,
                  req.body.id_destino,
                  req.body.id_alumnoAsociado
                )
                query =
                  'INSERT INTO comunicaciones (tiporemite, idremite, fecha, asunto, texto) VALUES ('
                    .concat(com.tipoRemite, ', ')
                    .concat(com.idRemite, ', "')
                    .concat(com.fecha, '", "')
                    .concat(com.asunto, '", "')
                    .concat(com.texto, '");')
                _result2 = (0, _database.executeQuery)(query).then(function (
                  data
                ) {
                  if (data.message == '') {
                    var query2 =
                      'INSERT INTO comunicaciones_destinos (idcomunicacion, tipodestino, iddestino, leida, eliminado, email, idAlumnoAsociado, importante) VALUES ('
                        .concat(data.insertId, ', ')
                        .concat(com.tipoDestino, ', ')
                        .concat(com.idDestino, ', ')
                        .concat(com.leida, ', ')
                        .concat(com.eliminado, ', ')
                        .concat(com.email, ', ')
                        .concat(com.idAlumnoAsociado, ', ')
                        .concat(com.importante, ');')
                    var result2 = (0, _database.executeQuery)(query2).then(
                      function (data2) {
                        if (data2.message == '') {
                          res.status(200).json({
                            message: 'Comunicación enviada con éxito',
                          })
                        }
                      }
                    )
                  } else {
                    throw '500'
                  }
                })
                _context7.next = 8
                break

              case 7:
                throw '400'

              case 8:
                _context7.next = 13
                break

              case 10:
                _context7.prev = 10
                _context7.t0 = _context7['catch'](0)

                if (_context7.t0 == '400') {
                  res.status(400).json({
                    message: 'Faltan parámetros',
                  })
                } else if (_context7.t0 == '409') {
                  res.status(409).send()
                } else {
                  res.status(500).json({
                    message: 'Error interno del servidor',
                  })
                }

              case 13:
              case 'end':
                return _context7.stop()
            }
          }
        },
        _callee7,
        null,
        [[0, 10]]
      )
    })
  )

  return function sendCom(_x9, _x10) {
    return _ref5.apply(this, arguments)
  }
})()

exports.sendCom = sendCom
