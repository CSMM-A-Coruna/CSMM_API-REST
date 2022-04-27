import { Router } from 'express'
import * as authController from '../controllers/auth.controller'
import * as commsController from '../controllers/comms.controller'
import * as fileController from '../controllers/files.controller'
import { auth } from '../middlewares/index'

const router = Router()

// -- Autentificación --
// Login
router.post('/auth/login', authController.signIn)
// Registrar un usuario nuevo
router.post('/auth/register', authController.signUp)
// Verificar datos una vez ya está logeado
router.post('/auth/update', auth.verifyToken, authController.compareData)

// -- Comunicaciones (JWT Required) --
// Comunicaciones recibidas
router.get('/comms/received', auth.verifyToken, commsController.getAllCommsReceived)
// Comunicaciones enviadas
router.get('/comms/sent', auth.verifyToken, commsController.getAllCommsSent)
// Comunicaciones borradas
router.get('/comms/deleted', auth.verifyToken, commsController.getAllCommsDeleted)
// Enviar comunicación
router.post('/comms/send', auth.verifyToken, commsController.sendCom)
// Actualizar comunicación
router.post('/comms/update', auth.verifyToken, commsController.updateCom)

// -- Subida de archivos --
// Subir archivo
router.post('/resources/upload', auth.verifyToken, fileController.upload)
// Ver lista de archivos
router.get('/resources/list', auth.verifyToken, fileController.getListFiles)
// Descargar un archivo
router.get('/resources/download', auth.verifyAuthDownload,fileController.downloadFile)

export default router
