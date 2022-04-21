"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _app = _interopRequireDefault(require("./app"));

// Arranque del servidor
// Iniciamos el servidor en el puerto definido
_app["default"].listen(_app["default"].get('port'));

console.log('Servidor iniciado en el puerto', _app["default"].get('port'));