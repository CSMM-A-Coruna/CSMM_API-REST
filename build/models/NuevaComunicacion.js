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

var NuevaComunicacion = /*#__PURE__*/ (0, _createClass2['default'])(
  function NuevaComunicacion(
    asunto,
    texto,
    idRemite,
    tipoDestino,
    idDestino,
    idAlumnoAsociado
  ) {
    ;(0, _classCallCheck2['default'])(this, NuevaComunicacion)
    ;(this.asunto = asunto),
      (this.texto = texto),
      (this.fecha = new Date().toISOString()),
      (this.idRemite = idRemite),
      (this.tipoRemite = 2),
      (this.tipoDestino = tipoDestino),
      (this.idDestino = idDestino),
      (this.leida = null),
      (this.eliminado = null),
      (this.email = 1),
      (this.idAlumnoAsociado = idAlumnoAsociado)
    this.importante = 0
  }
)
var _default = NuevaComunicacion
exports['default'] = _default
