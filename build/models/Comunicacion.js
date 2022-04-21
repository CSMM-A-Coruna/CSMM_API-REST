"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _database = require("../database");

var Comunicacion = /*#__PURE__*/function () {
  function Comunicacion(id_comunicacion, id_remite, id_destino, id_alumnoAsociado, asunto, texto, importante, fecha, leida, eliminado, estado, nombre_alumnoAsociado, nombre_remite, nombre_destino) {
    (0, _classCallCheck2["default"])(this, Comunicacion);
    this.id_comunicacion = id_comunicacion, this.id_remite = id_remite, this.id_destino = id_destino, this.tipo_remite = null, this.tipo_destino = null, this.id_alumnoAsociado = id_alumnoAsociado, this.asunto = asunto, this.texto = texto, this.importante = importante, this.fecha = fecha, this.leida = leida, this.eliminado = eliminado, this.estado = estado, this.nombre_alumnoAsociado = nombre_alumnoAsociado, this.nombre_remite = nombre_remite, this.nombre_destino = nombre_destino;
  } // Calculamos el tipo de remite y destino según el número (1 = alumnos, 2 = familias, 3 = profesores)


  (0, _createClass2["default"])(Comunicacion, [{
    key: "calcularTipoRemite",
    value: function calcularTipoRemite(tipo) {
      var tipos = ['', 'alumnos', 'familias', 'profesores'];
      this.tipo_remite = tipos[tipo];
    }
  }, {
    key: "calcularTipoDestino",
    value: function calcularTipoDestino(tipo) {
      var tipos = ['', 'alumnos', 'familias', 'profesores'];
      this.tipo_destino = tipos[tipo];
    }
  }, {
    key: "calcularNombreRemite",
    value: function calcularNombreRemite() {
      var query = "SELECT * FROM ".concat(this.tipo_remite, " WHERE id = ").concat(this.id_remite);
      return new Promise(function (resolve, reject) {
        _database.db.query(query, function (error, results, fields) {
          if (error) return reject(error);
          return resolve(results);
        });
      });
    }
  }, {
    key: "calcularNombreDestino",
    value: function calcularNombreDestino() {
      var query = "SELECT * FROM ".concat(this.tipo_destino, " WHERE id = ").concat(this.id_destino);
      return new Promise(function (resolve, reject) {
        _database.db.query(query, function (error, results, fields) {
          if (error) return reject(error);
          return resolve(results);
        });
      });
    }
  }]);
  return Comunicacion;
}();

var _default = Comunicacion;
exports["default"] = _default;