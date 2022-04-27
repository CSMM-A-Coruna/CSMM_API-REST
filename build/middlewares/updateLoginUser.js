"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _database = require("../database");

var updateLoginUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userId, userIp, device) {
    var intAccesos, updateAccesos, updateIp, updateDevice, date, updateUltimo;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _database.executeQuery)("SELECT accesos FROM familias WHERE id = ".concat(userId));

          case 3:
            intAccesos = _context.sent;
            _context.next = 6;
            return (0, _database.executeQuery)("UPDATE familias SET accesos = ".concat(intAccesos[0].accesos + 1, " WHERE id = ").concat(userId));

          case 6:
            updateAccesos = _context.sent;
            _context.next = 9;
            return (0, _database.executeQuery)("UPDATE familias SET ip = '".concat(userIp, "' WHERE id = ").concat(userId));

          case 9:
            updateIp = _context.sent;
            _context.next = 12;
            return (0, _database.executeQuery)("UPDATE familias SET navegador = '".concat(device, "' WHERE id = ").concat(userId));

          case 12:
            updateDevice = _context.sent;
            date = new Date().toISOString();
            _context.next = 16;
            return (0, _database.executeQuery)("UPDATE familias SET ultimo = '".concat(date, "' WHERE id = ").concat(userId));

          case 16:
            updateUltimo = _context.sent;
            _context.next = 22;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 19]]);
  }));

  return function updateLoginUser(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = updateLoginUser;
exports["default"] = _default;