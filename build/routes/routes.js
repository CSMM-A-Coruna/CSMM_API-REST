"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var authController = _interopRequireWildcard(require("../controllers/auth.controller"));

var commsController = _interopRequireWildcard(require("../controllers/comms.controller"));

var fileController = _interopRequireWildcard(require("../controllers/files.controller"));

var _index = require("../middlewares/index");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = (0, _express.Router)(); // -- Autentificación --
// Login

router.post('/auth/login', authController.signIn); // Registrar un usuario nuevo

router.post('/auth/register', authController.signUp); // Verificar datos una vez ya está logeado

router.post('/auth/update', _index.authJwt.verifyToken, authController.compareData); // -- Comunicaciones (JWT Required) --
// Comunicaciones recibidas

router.get('/comms/received', _index.authJwt.verifyToken, commsController.getAllCommsReceived); // Comunicaciones enviadas

router.get('/comms/sent', _index.authJwt.verifyToken, commsController.getAllCommsSent); // Comunicaciones borradas

router.get('/comms/deleted', _index.authJwt.verifyToken, commsController.getAllCommsDeleted); // Enviar comunicación

router.post('/comms/send', _index.authJwt.verifyToken, commsController.sendCom); // Actualizar comunicación

router.post('/comms/update', _index.authJwt.verifyToken, commsController.updateCom); // -- Subida de archivos --
// Subir archivo

router.post('/resources/upload', _index.authJwt.verifyToken, fileController.upload); // Ver lista de archivos

router.get('/resources/list', _index.authJwt.verifyToken, fileController.getListFiles); // Descargar un archivo

router.get('/resources/download', _index.authJwt.verifyToken, fileController.downloadFile);
var _default = router;
exports["default"] = _default;