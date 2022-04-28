"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _config = _interopRequireDefault(require("./../config"));

var fs = require('fs');

var Client = require('ftp');

var FTPClient = /*#__PURE__*/function () {
  function FTPClient() {
    var host = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'csmm-es.espacioseguro.com';
    var port = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 21;
    var username = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'jmiralles';
    var password = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _config["default"].ftpPassword;
    var secure = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    (0, _classCallCheck2["default"])(this, FTPClient);
    this.settings = {
      host: host,
      port: port,
      user: username,
      password: password,
      secure: secure
    };
    this.client = new Client();
  }

  (0, _createClass2["default"])(FTPClient, [{
    key: "getList",
    value: function () {
      var _getList = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(path, res) {
        var c;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                c = this.client;
                c.on('ready', function () {
                  c.list(path, function (err, list) {
                    if (err) throw err;
                    res.status(200).send(list);
                    c.end();
                  });
                });
                c.connect(this.settings);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getList(_x, _x2) {
        return _getList.apply(this, arguments);
      }

      return getList;
    }()
  }, {
    key: "makeDir",
    value: function () {
      var _makeDir = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(idComunicacion) {
        var c;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                c = this.client;
                c.on('ready', function () {
                  c.mkdir('/adjuntos/' + idComunicacion, true, function (err) {
                    if (err) throw err;
                  });
                  c.end();
                });
                c.connect(this.settings);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function makeDir(_x3) {
        return _makeDir.apply(this, arguments);
      }

      return makeDir;
    }()
  }, {
    key: "uploadFile",
    value: function () {
      var _uploadFile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(idComunicacion, fileName) {
        var c;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                c = this.client; // Primero creamos el directorio en caso de que no exista.

                c.on('ready', function () {
                  c.mkdir('/adjuntos/' + idComunicacion, false, function (err) {
                    if (err && err != 'Error: Create directory operation failed.') {
                      console.log(err);
                    }

                    var cacheDir = __basedir + '/resources/uploads/' + idComunicacion + '/' + fileName;
                    var ftpDir = '/adjuntos/' + idComunicacion + '/' + fileName;
                    c.put(cacheDir, ftpDir, function (err) {
                      c.end();
                    });
                  });
                });
                c.connect(this.settings);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function uploadFile(_x4, _x5) {
        return _uploadFile.apply(this, arguments);
      }

      return uploadFile;
    }()
  }, {
    key: "cacheFile",
    value: function () {
      var _cacheFile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(path, fileName, id_comunicacion) {
        var c;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                c = this.client;
                c.on('ready', function () {
                  c.get(path, function (err, stream) {
                    if (err) throw err;
                    stream.once('close', function () {
                      c.end();
                    });
                    var dir = __basedir + '/resources/downloads/' + id_comunicacion;

                    if (!fs.existsSync(dir)) {
                      fs.mkdirSync(dir);
                    }

                    stream.pipe(fs.createWriteStream(dir + '/' + fileName));
                  });
                });
                c.connect(this.settings);

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function cacheFile(_x6, _x7, _x8) {
        return _cacheFile.apply(this, arguments);
      }

      return cacheFile;
    }()
  }]);
  return FTPClient;
}();

var _default = FTPClient;
exports["default"] = _default;