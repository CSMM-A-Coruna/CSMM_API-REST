"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.executeQuery = exports.db = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

var _config = _interopRequireDefault(require("./config"));

var db = _mysql["default"].createConnection({
  host: _config["default"].dbHost,
  port: 3306,
  user: 'csmm_gestor',
  password: _config["default"].dbPassword,
  database: _config["default"].dbDatabase
}); // Iniciamos base de datos


exports.db = db;
db.connect(function (err) {
  if (err) {
    console.log(err);
  }
});

var executeQuery = function executeQuery(query) {
  return new Promise(function (resolve, reject) {
    db.query(query, function (error, results, fields) {
      if (error) return reject(error);
      return resolve(results);
    });
  });
};

exports.executeQuery = executeQuery;