import { Router } from 'express'
import * as authController from '../controllers/auth.controller'
import * as commsController from '../controllers/comms.controller'
import * as adjuntosController from '../controllers/resources/adjuntos.controller'
import * as preferenceController from '../controllers/preferences.controller'
import * as horarioController from '../controllers/horario.controller'
import * as documentController from '../controllers/resources/documentos.controller'
import { auth, adjuntoUtil } from '../middlewares/index'

const router = Router()

// -- Autentificación --
// Login
router.post('/auth/login', authController.signIn)
// Registrar un usuario nuevo
router.post('/auth/register', authController.signUp)
// Verificar datos una vez ya está logeado
router.post('/auth/reload', auth.verifyToken, authController.reloadToken)
// Comparar contraseña (uno de los pasos previos para cambiarla)
router.post('/auth/check_pass', auth.verifyToken, authController.checkPassword)
// Cambiar la contraseña
router.put(
  '/auth/change_password',
  auth.verifyToken,
  authController.changePassword
)
// Actualizar el token de Firebase Cloud Messaging
router.put(
  '/auth/firebase_token',
  auth.verifyToken,
  authController.saveFCMToken
)

// -- Comunicaciones (JWT Required) --
// Comunicaciones recibidas
router.get(
  '/comms/received/:user_id',
  auth.verifyToken,
  commsController.getAllCommsReceived
)
// Comunicaciones enviadas
router.get(
  '/comms/sent/:user_id',
  auth.verifyToken,
  commsController.getAllCommsSent
)
// Comunicaciones borradas
router.get(
  '/comms/deleted/:user_id',
  auth.verifyToken,
  commsController.getAllCommsDeleted
)
// Enviar comunicación
router.post('/comms/send/:user_id', auth.verifyToken, commsController.sendCom)
// Actualizar comunicación
router.put(
  '/comms/update/:id_com',
  auth.verifyToken,
  commsController.updateCom
)
// Usuario disponibles a los que enviar una comunicannción (siendo usuario familia)
router.get(
  '/comms/senders/:id_alumno',
  auth.verifyToken,
  commsController.getAllDispoSenders
)

// -- Todo lo relacionado con los archivos y FTP --
// Subir un adjunto
router.post(
  '/resources/adjuntos/upload',
  auth.verifyToken,
  adjuntosController.upload
)
// Descargar un adjunto
router.get(
  '/resources/adjuntos/download',
  auth.verifyAuthDownload,
  adjuntoUtil.downloadAdjuntoToAPI,
  adjuntosController.downloadFile
)
// Coger todos los documentos
router.get('/resources/documentos', auth.verifyToken, documentController.getAllDocumentos)
// Descargar un documento general
router.get(
  '/resources/documentos/generales/download',
  auth.verifyAuthDownload,
  adjuntoUtil.downloadDocumentoGeneralToAPI,
  documentController.downloadDocumentoGeneral
)
// Descargar un documento de un alumno concreto
router.get(
  '/resources/documentos/alumnos/download',
  auth.verifyAuthDownload,
  adjuntoUtil.downloadDocumentoAlumnoToAPI,
  documentController.downloadDocumentoAlumno
)

// -- Preferencias del usuario --
// Coger todas las preferencias definidas por el usuario
router.get(
  '/preferences/:user_id',
  auth.verifyToken,
  preferenceController.getAllPreferences
)
// Actualizar las preferencias del usuario
router.put(
  '/preferences/:user_id',
  auth.verifyToken,
  preferenceController.updatePreference
)

// -- Horarios --
router.get('/horario', auth.verifyToken, horarioController.getHorarioByGrupo)


export default router
