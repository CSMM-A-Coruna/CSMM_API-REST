'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.updateCom =
  exports.sendCom =
  exports.getAllDispoSenders =
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

var _app = _interopRequireDefault(require('../app'))

var getAllCommsReceived = /*#__PURE__*/ (function () {
  var _ref = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee(req, res) {
      var query, result, comms, index, adjuntos, result1, i, com
      return _regenerator['default'].wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.prev = 0

                if (!req.query.user_id) {
                  _context.next = 29
                  break
                }

                query =
                  'SELECT *, nombreRemite(comunicaciones_generales.tiporemite, comunicaciones_generales.idremite) AS nombreRemite, \n                            nombreDestino(comunicaciones_generales.tipodestino, comunicaciones_generales.iddestino) AS nombreDestino,\n                            calculoAdjuntos(comunicaciones_generales.idcomunicacion) AS adjuntos\n                            FROM comunicaciones_generales\n                            WHERE tipodestino = 2 AND iddestino = '.concat(
                    req.query.user_id,
                    ' \n                            AND comunicaciones_generales.eliminado IS NULL \n                            ORDER BY comunicaciones_generales.fecha DESC'
                  )
                _context.next = 5
                return (0, _database.executeQuery)(query)

              case 5:
                result = _context.sent

                if (!result.length) {
                  _context.next = 26
                  break
                }

                comms = []
                index = 0

              case 9:
                if (!(index < result.length)) {
                  _context.next = 24
                  break
                }

                adjuntos = []

                if (!(result[index].adjuntos != 0)) {
                  _context.next = 16
                  break
                }

                _context.next = 14
                return (0, _database.executeQuery)(
                  'SELECT adjunto FROM comunicaciones_adjuntos WHERE idcomunicacion = '.concat(
                    result[index].idcomunicacion
                  )
                )

              case 14:
                result1 = _context.sent

                if (result1.length == 1) {
                  adjuntos.push(result1[0].adjunto)
                } else {
                  for (i = 0; i < result1.length; i++) {
                    adjuntos.push(result1[i].adjunto)
                  }
                }

              case 16:
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
                  result[index].nombreDestino,
                  adjuntos
                )
                com.calcularTipoDestino(result[index].tipodestino)
                com.calcularTipoRemite(result[index].tiporemite)
                comms.push(com)

                if (!result[index + 1]) {
                  res.status(200).json(comms)
                }

              case 21:
                index++
                _context.next = 9
                break

              case 24:
                _context.next = 27
                break

              case 26:
                throw '404'

              case 27:
                _context.next = 30
                break

              case 29:
                throw '400'

              case 30:
                _context.next = 35
                break

              case 32:
                _context.prev = 32
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
                  if (_app['default'].settings.env == 'production') {
                    res.status(500).json({
                      message: 'Error interno del servidor',
                    })
                  } else {
                    res.status(500).json({
                      message: _context.t0,
                    })
                  }
                }

              case 35:
              case 'end':
                return _context.stop()
            }
          }
        },
        _callee,
        null,
        [[0, 32]]
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
    /*#__PURE__*/ _regenerator['default'].mark(function _callee2(req, res) {
      var query, result, comms, index, adjuntos, result1, i, com
      return _regenerator['default'].wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                _context2.prev = 0

                if (!req.query.user_id) {
                  _context2.next = 29
                  break
                }

                query =
                  'SELECT *, nombreRemite(comunicaciones_generales.tiporemite, comunicaciones_generales.idremite) AS nombreRemite, \n                            nombreDestino(comunicaciones_generales.tipodestino, comunicaciones_generales.iddestino) AS nombreDestino,\n                            calculoAdjuntos(comunicaciones_generales.idcomunicacion) AS adjuntos\n                            FROM comunicaciones_generales\n                            WHERE tiporemite = 2 AND idremite = '.concat(
                    req.query.user_id,
                    ' \n                            AND comunicaciones_generales.eliminado IS NULL \n                            ORDER BY comunicaciones_generales.fecha DESC'
                  )
                _context2.next = 5
                return (0, _database.executeQuery)(query)

              case 5:
                result = _context2.sent

                if (!result.length) {
                  _context2.next = 26
                  break
                }

                comms = []
                index = 0

              case 9:
                if (!(index < result.length)) {
                  _context2.next = 24
                  break
                }

                adjuntos = []

                if (!(result[index].adjuntos != 0)) {
                  _context2.next = 16
                  break
                }

                _context2.next = 14
                return (0, _database.executeQuery)(
                  'SELECT adjunto FROM comunicaciones_adjuntos WHERE idcomunicacion = '.concat(
                    result[index].idcomunicacion
                  )
                )

              case 14:
                result1 = _context2.sent

                if (result1.length == 1) {
                  adjuntos.push(result1[0].adjunto)
                } else {
                  for (i = 0; i < result1.length; i++) {
                    adjuntos.push(result1[i].adjunto)
                  }
                }

              case 16:
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
                  'enviada',
                  result[index].alumnoAsociado,
                  result[index].nombreRemite,
                  result[index].nombreDestino,
                  adjuntos
                )
                com.calcularTipoDestino(result[index].tipodestino)
                com.calcularTipoRemite(result[index].tiporemite)
                comms.push(com)

                if (!result[index + 1]) {
                  res.status(200).json(comms)
                }

              case 21:
                index++
                _context2.next = 9
                break

              case 24:
                _context2.next = 27
                break

              case 26:
                throw '404'

              case 27:
                _context2.next = 30
                break

              case 29:
                throw '400'

              case 30:
                _context2.next = 35
                break

              case 32:
                _context2.prev = 32
                _context2.t0 = _context2['catch'](0)

                if (_context2.t0 == '404') {
                  res.status(404).json({
                    message:
                      'No hay comunicaciones enviadas asociadas a este usuario',
                  })
                } else if (_context2.t0 == '400') {
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

              case 35:
              case 'end':
                return _context2.stop()
            }
          }
        },
        _callee2,
        null,
        [[0, 32]]
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
    /*#__PURE__*/ _regenerator['default'].mark(function _callee3(req, res) {
      var query, result, comms, index, adjuntos, result1, i, com
      return _regenerator['default'].wrap(
        function _callee3$(_context3) {
          while (1) {
            switch ((_context3.prev = _context3.next)) {
              case 0:
                _context3.prev = 0

                if (!req.query.user_id) {
                  _context3.next = 29
                  break
                }

                query =
                  'SELECT *, nombreRemite(comunicaciones_generales.tiporemite, comunicaciones_generales.idremite) AS nombreRemite, \n                            nombreDestino(comunicaciones_generales.tipodestino, comunicaciones_generales.iddestino) AS nombreDestino,\n                            calculoAdjuntos(comunicaciones_generales.idcomunicacion) AS adjuntos\n                            FROM comunicaciones_generales\n                            WHERE tipodestino = 2 AND iddestino = '.concat(
                    req.query.user_id,
                    ' \n                            AND comunicaciones_generales.eliminado IS NOT NULL \n                            ORDER BY comunicaciones_generales.eliminado DESC'
                  )
                _context3.next = 5
                return (0, _database.executeQuery)(query)

              case 5:
                result = _context3.sent
                comms = []

                if (!result.length) {
                  _context3.next = 26
                  break
                }

                index = 0

              case 9:
                if (!(index < result.length)) {
                  _context3.next = 24
                  break
                }

                adjuntos = []

                if (!(result[index].adjuntos != 0)) {
                  _context3.next = 16
                  break
                }

                _context3.next = 14
                return (0, _database.executeQuery)(
                  'SELECT adjunto FROM comunicaciones_adjuntos WHERE idcomunicacion = '.concat(
                    result[index].idcomunicacion
                  )
                )

              case 14:
                result1 = _context3.sent

                if (result1.length == 1) {
                  adjuntos.push(result1[0].adjunto)
                } else {
                  for (i = 0; i < result1.length; i++) {
                    adjuntos.push(result1[i].adjunto)
                  }
                }

              case 16:
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
                  'borrada',
                  result[index].alumnoAsociado,
                  result[index].nombreRemite,
                  result[index].nombreDestino,
                  adjuntos
                )
                com.calcularTipoDestino(result[index].tipodestino)
                com.calcularTipoRemite(result[index].tiporemite)
                comms.push(com)

                if (!result[index + 1]) {
                  res.status(200).json(comms)
                }

              case 21:
                index++
                _context3.next = 9
                break

              case 24:
                _context3.next = 27
                break

              case 26:
                throw '404'

              case 27:
                _context3.next = 30
                break

              case 29:
                throw '400'

              case 30:
                _context3.next = 35
                break

              case 32:
                _context3.prev = 32
                _context3.t0 = _context3['catch'](0)

                if (_context3.t0 == '400') {
                  res.status(400).json({
                    message: 'Faltan parámetros',
                  })
                } else if ((_context3.t0 = '404')) {
                  res.status(404).json({
                    message: 'No se han encontrado comunicaciones recibidas',
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

              case 35:
              case 'end':
                return _context3.stop()
            }
          }
        },
        _callee3,
        null,
        [[0, 32]]
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
    /*#__PURE__*/ _regenerator['default'].mark(function _callee4(req, res) {
      var query,
        result,
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
        function _callee4$(_context4) {
          while (1) {
            switch ((_context4.prev = _context4.next)) {
              case 0:
                _context4.prev = 0

                if (
                  !(req.query.state && req.query.id_com && req.query.id_destino)
                ) {
                  _context4.next = 100
                  break
                }

                _context4.t0 = req.query.state
                _context4.next =
                  _context4.t0 === 'importante'
                    ? 5
                    : _context4.t0 === 'no_importante'
                    ? 23
                    : _context4.t0 === 'leida'
                    ? 41
                    : _context4.t0 === 'eliminado'
                    ? 61
                    : _context4.t0 === 'restaurar'
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
                _context4.next = 8
                return (0, _database.executeQuery)(query)

              case 8:
                result = _context4.sent

                if (!(result.changedRows == 1)) {
                  _context4.next = 13
                  break
                }

                res.status(200).json({
                  message: 'Estado de la comunicación actualizado',
                })
                _context4.next = 22
                break

              case 13:
                if (!(result.affectedRows == 0)) {
                  _context4.next = 17
                  break
                }

                throw '409'

              case 17:
                if (!(result.affectedRows == 1 && result.changedRows == 0)) {
                  _context4.next = 21
                  break
                }

                throw '409'

              case 21:
                throw '500'

              case 22:
                return _context4.abrupt('break', 98)

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
                _context4.next = 26
                return (0, _database.executeQuery)(query1)

              case 26:
                result1 = _context4.sent

                if (!(result1.changedRows == 1)) {
                  _context4.next = 31
                  break
                }

                res.status(200).json({
                  message: 'Estado de la comunicación actualizado',
                })
                _context4.next = 40
                break

              case 31:
                if (!(result1.affectedRows == 0)) {
                  _context4.next = 35
                  break
                }

                throw '404'

              case 35:
                if (!(result1.affectedRows == 1 && result1.changedRows == 0)) {
                  _context4.next = 39
                  break
                }

                throw '409'

              case 39:
                throw '500'

              case 40:
                return _context4.abrupt('break', 98)

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
                _context4.next = 46
                return (0, _database.executeQuery)(query2)

              case 46:
                result2 = _context4.sent

                if (!(result2.changedRows == 1)) {
                  _context4.next = 51
                  break
                }

                res.status(200).json({
                  message: 'Estado de la comunicación actualizado',
                })
                _context4.next = 60
                break

              case 51:
                if (!(result2.affectedRows == 0)) {
                  _context4.next = 55
                  break
                }

                throw '404'

              case 55:
                if (!(result2.affectedRows == 1 && result2.changedRows == 0)) {
                  _context4.next = 59
                  break
                }

                throw '409'

              case 59:
                throw '500'

              case 60:
                return _context4.abrupt('break', 98)

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
                _context4.next = 66
                return (0, _database.executeQuery)(query3)

              case 66:
                result3 = _context4.sent

                if (!(result3.changedRows == 1)) {
                  _context4.next = 71
                  break
                }

                res.status(200).json({
                  message: 'Estado de la comunicación actualizado',
                })
                _context4.next = 80
                break

              case 71:
                if (!(result3.affectedRows == 0)) {
                  _context4.next = 75
                  break
                }

                throw '404'

              case 75:
                if (!(result3.affectedRows == 1 && result3.changedRows == 0)) {
                  _context4.next = 79
                  break
                }

                throw '409'

              case 79:
                throw '500'

              case 80:
                return _context4.abrupt('break', 98)

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
                _context4.next = 84
                return (0, _database.executeQuery)(query4)

              case 84:
                result4 = _context4.sent

                if (!(result4.changedRows == 1)) {
                  _context4.next = 89
                  break
                }

                res.status(200).json({
                  message: 'Estado de la comunicación actualizado',
                })
                _context4.next = 98
                break

              case 89:
                if (!(result4.affectedRows == 0)) {
                  _context4.next = 93
                  break
                }

                throw '404'

              case 93:
                if (!(result4.affectedRows == 1 && result4.changedRows == 0)) {
                  _context4.next = 97
                  break
                }

                throw '409'

              case 97:
                throw '500'

              case 98:
                _context4.next = 101
                break

              case 100:
                throw '400'

              case 101:
                _context4.next = 106
                break

              case 103:
                _context4.prev = 103
                _context4.t1 = _context4['catch'](0)

                if (_context4.t1 == '404') {
                  res.status(404).json({
                    message: 'No se ha encontrado una comunicación con ese ID',
                  })
                } else if (_context4.t1 == '400') {
                  res.status(400).json({
                    message: 'Faltan parámetros',
                  })
                } else if (_context4.t1 == '409') {
                  res.status(409).send()
                } else {
                  if (_app['default'].settings.env == 'production') {
                    res.status(500).json({
                      message: 'Error interno del servidor',
                    })
                  } else {
                    res.status(500).json({
                      message: _context4.t1,
                    })
                  }
                }

              case 106:
              case 'end':
                return _context4.stop()
            }
          }
        },
        _callee4,
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
    /*#__PURE__*/ _regenerator['default'].mark(function _callee5(req, res) {
      var com, query, result
      return _regenerator['default'].wrap(
        function _callee5$(_context5) {
          while (1) {
            switch ((_context5.prev = _context5.next)) {
              case 0:
                _context5.prev = 0

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
                  _context5.next = 7
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
                result = (0, _database.executeQuery)(query).then(function (
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
                            id: data.insertId,
                          })
                        }
                      }
                    )
                  } else {
                    throw '500'
                  }
                })
                _context5.next = 8
                break

              case 7:
                throw '400'

              case 8:
                _context5.next = 13
                break

              case 10:
                _context5.prev = 10
                _context5.t0 = _context5['catch'](0)

                if (_context5.t0 == '400') {
                  res.status(400).json({
                    message: 'Faltan parámetros',
                  })
                } else if (_context5.t0 == '409') {
                  res.status(409).send()
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

              case 13:
              case 'end':
                return _context5.stop()
            }
          }
        },
        _callee5,
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

var getAllDispoSenders = /*#__PURE__*/ (function () {
  var _ref6 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee6(req, res) {
      var result, destinatarios, i, destinatario
      return _regenerator['default'].wrap(
        function _callee6$(_context6) {
          while (1) {
            switch ((_context6.prev = _context6.next)) {
              case 0:
                _context6.prev = 0

                if (!req.query.id_alumno) {
                  _context6.next = 14
                  break
                }

                _context6.next = 4
                return (0, _database.executeQuery)(
                  'SELECT id_profesor, profesor \n                                          FROM docencia_alumnos \n                                          WHERE docencia_alumnos.id_alumno = '.concat(
                    req.query.id_alumno,
                    "\n                                          AND (docencia_alumnos.materia = 'Formaci\xF3n Humana' OR docencia_alumnos.materia = 'Globalizada')"
                  )
                )

              case 4:
                result = _context6.sent

                if (!result.length) {
                  _context6.next = 11
                  break
                }

                destinatarios = []

                for (i = 0; i < result.length; i++) {
                  destinatario = {
                    id: result[i].id_profesor,
                    nombre: result[i].profesor,
                    tipo_usuario: 'tutor',
                  }
                  destinatarios.push(destinatario)
                }

                res.status(200).json(destinatarios)
                _context6.next = 12
                break

              case 11:
                throw '404'

              case 12:
                _context6.next = 15
                break

              case 14:
                throw '400'

              case 15:
                _context6.next = 20
                break

              case 17:
                _context6.prev = 17
                _context6.t0 = _context6['catch'](0)

                if (_context6.t0 == '400') {
                  res.status(400).json({
                    message: 'Faltan parámetros',
                  })
                } else if (_context6.t0 == '404') {
                  res.status(404).json({
                    message:
                      'No existe un usuario con ese ID o no tiene gente disponible para enviar',
                  })
                } else {
                  if (_app['default'].settings.env == 'production') {
                    res.status(500).json({
                      message: 'Error interno del servidor',
                    })
                  } else {
                    res.status(500).json({
                      message: _context6.t0,
                    })
                  }
                }

              case 20:
              case 'end':
                return _context6.stop()
            }
          }
        },
        _callee6,
        null,
        [[0, 17]]
      )
    })
  )

  return function getAllDispoSenders(_x11, _x12) {
    return _ref6.apply(this, arguments)
  }
})()

exports.getAllDispoSenders = getAllDispoSenders
