'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports['default'] = void 0

var _express = _interopRequireDefault(require('express'))

var _config = _interopRequireDefault(require('./config'))

var _morgan = _interopRequireDefault(require('morgan'))

var _helmet = _interopRequireDefault(require('helmet'))

var _cors = _interopRequireDefault(require('cors'))

var _routes = _interopRequireDefault(require('./routes/routes'))

// CONFIG SERVER
// Definimos la ruta base, para el sistema de descarga y subida de archivos
global.__basedir = __dirname
var app = (0, _express['default'])() // Definir el puerto

app.set('port', _config['default'].port) // ---- LOGGER ----
// Le decimos que utilice morgan como logger

app.use((0, _morgan['default'])('dev')) // Desactivamos response 304

app.disable('etag') // ---- JSON y URLEncoded ----

app.use(_express['default'].json())
app.use(
  _express['default'].urlencoded({
    extended: true,
  })
) // ---- SEGURIDAD ----
// Usamos cors y helmet para más seguridad

var corsOptions = {
  // origin: "http://localhost:3000",
}
app.use((0, _cors['default'])(corsOptions))
app.use((0, _helmet['default'])()) // ---- RUTAS ----
// Ruta base

app.get('/v1', function (req, res) {
  res.json({
    message: 'CSMM Gestor Escolar API REST',
  })
})
app.use('/v1', _routes['default'])
var _default = app
exports['default'] = _default
