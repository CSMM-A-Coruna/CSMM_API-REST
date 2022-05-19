import { Router } from 'express'
import * as authController from '../controllers/auth.controller'
import * as commsController from '../controllers/comms.controller'
import * as fileController from '../controllers/files.controller'
import * as preferenceController from '../controllers/preferences.controller'
import * as horarioController from '../controllers/horario.controller'
import * as documentController from '../controllers/documentos.controller'
import { auth, adjuntoUtil } from '../middlewares/index'

const router = Router()

// -- Autentificación --
// Login
router.post('/auth/login', authController.signIn)
// Registrar un usuario nuevo
router.post('/auth/register', authController.signUp)
// Verificar datos una vez ya está logeado
router.post('/auth/update', auth.verifyToken, authController.compareData)
// Comparar contraseña (uno de los pasos previos para cambiarla)
router.post('/auth/check_pass', auth.verifyToken, authController.checkPassword)
// Cambiar la contraseña
router.post(
  '/auth/change_password',
  auth.verifyToken,
  authController.changePassword
)
// Actualizar el token de Firebase Cloud Messaging
router.post(
  '/auth/update/firebase_token',
  auth.verifyToken,
  authController.saveFCMToken
)

// -- Comunicaciones (JWT Required) --
// Comunicaciones recibidas
router.get(
  '/comms/received',
  auth.verifyToken,
  commsController.getAllCommsReceived
)
// Comunicaciones enviadas
router.get('/comms/sent', auth.verifyToken, commsController.getAllCommsSent)
// Comunicaciones borradas
router.get(
  '/comms/deleted',
  auth.verifyToken,
  commsController.getAllCommsDeleted
)
// Enviar comunicación
router.post('/comms/send', auth.verifyToken, commsController.sendCom)
// Actualizar comunicación
router.post('/comms/update', auth.verifyToken, commsController.updateCom)
// Usuario disponibles a los que enviar una comunicannción (siendo usuario familia)
router.get(
  '/comms/senders',
  auth.verifyToken,
  commsController.getAllDispoSenders
)

// -- Subida de archivos --
// Subir archivo
router.post(
  '/resources/adjunto/upload',
  auth.verifyToken,
  fileController.upload
)
// Descargar un archivo
router.get(
  '/resources/adjunto/download',
  auth.verifyAuthDownload,
  adjuntoUtil.downloadAdjuntoToAPI,
  fileController.downloadFile
)

// -- Preferencias del usuario --
// Coger todas las preferencias definidas por el usuario
router.get(
  '/preferences',
  auth.verifyToken,
  preferenceController.getAllPreferences
)
// Actualizar las preferencias del usuario
router.post(
  '/preferences/update',
  auth.verifyToken,
  preferenceController.updatePreference
)

// -- Horarios --
router.get('/horario', auth.verifyToken, horarioController.getHorarioByGrupo)

// -- Documentos --
router.get('/documentos', auth.verifyToken, documentController.getAllDocumentos)
router.get('/documentos/generales/download', auth.verifyAuthDownload, adjuntoUtil.downloadDocumentoGeneralToAPI, documentController.downloadDocumentoGeneral)
router.get('/documentos/alumnos/download', auth.verifyAuthDownload, adjuntoUtil.downloadDocumentoAlumnoToAPI, documentController.downloadDocumentoAlumno)

export default router
