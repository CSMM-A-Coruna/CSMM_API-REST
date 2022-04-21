"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

// -- VERIFICAR EL JSON WEB TOKEN --
var verifyToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var headers, token, decoded;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Cogemos las cabeceras
            headers = req.headers; // Cogemos la cabecera Authorization (cors)

            token = headers.authorization; // Comprobamos que existe

            if (token) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.status(403).json({
              message: 'No token provided'
            }));

          case 4:
            // Quitamos la palabra Bearer (que se pone por defecto)
            token = token.replace('Bearer ', ''); // Comprobamos que la firma es correcta

            _context.prev = 5;
            decoded = _jsonwebtoken["default"].verify(token, _config["default"].jwtSecret);
            next();
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](5);
            return _context.abrupt("return", res.status(401).json({
              message: 'Token invalid'
            }));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 10]]);
  }));

  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.verifyToken = verifyToken;