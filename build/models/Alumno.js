'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports['default'] = void 0

var _createClass2 = _interopRequireDefault(
  require('@babel/runtime/helpers/createClass')
)

var _classCallCheck2 = _interopRequireDefault(
  require('@babel/runtime/helpers/classCallCheck')
)

var _database = require('../database')

var _bcryptjs = _interopRequireDefault(require('bcryptjs'))

var Alumno = /*#__PURE__*/ (0, _createClass2['default'])(function Alumno(
  id,
  nombre,
  apellido1,
  apellido2,
  relacion
) {
  ;(0, _classCallCheck2['default'])(this, Alumno)
  ;(this.id = id),
    (this.nombre = ''
      .concat(nombre, ' ')
      .concat(apellido1, ' ')
      .concat(apellido2)),
    (this.relacion = relacion)
})
var _default = Alumno
exports['default'] = _default
