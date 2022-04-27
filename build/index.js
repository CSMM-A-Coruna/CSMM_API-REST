"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _app = _interopRequireDefault(require("./app"));

// Arranque del servidor
var cluster = require('cluster');

if (_app["default"].settings.env == 'production') {
  if (cluster.isMaster) {
    var cpuCount = require('os').cpus().length;

    for (var i = 0; i < cpuCount; i++) {
      cluster.fork();
    } // Chequeamos si el hilo a muerto


    cluster.on('exit', function (worker, code, signal) {
      console.log("Worker ".concat(worker.process.pid, " muri\xF3"));
    });
  } else {
    // Iniciamos el servidor en el puerto definido
    _app["default"].listen(_app["default"].get('port'));

    _app["default"].get('/cluster', function (req, res) {
      var worker = cluster.worker.id;
      res.status(200).json({
        message: "Corriendo con el worker ==> ".concat(worker)
      });
    });

    console.log("Worker: ".concat(cluster.worker.id), '- Servidor iniciado en el puerto', _app["default"].get('port'));
  }
} else {
  _app["default"].listen(_app["default"].get('port'));

  console.log('Servidor iniciado en el puerto', _app["default"].get('port'));
}