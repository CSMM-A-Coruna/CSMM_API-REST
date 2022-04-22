import { Router } from 'express'
import * as authController from '../controllers/auth.controller'
import * as commsController from '../controllers/comms.controller'
import * as fileController from '../controllers/files.controller'
import { authJwt } from '../middlewares/index'

const router = Router()

// -- Autentificación --
// Login
router.post('/auth/login', authController.signIn)
// Registrar un usuario nuevo
router.post('/auth/register', authController.signUp)
// Verificar datos una vez ya está logeado
router.post('/auth/update', authJwt.verifyToken, authController.compareData)

// -- Comunicaciones (JWT Required) --
// Comunicaciones recibidas
router.get('/comms/received', authJwt.verifyToken, commsController.getAllCommsReceived)
// Comunicaciones enviadas
router.get('/comms/sent', authJwt.verifyToken, commsController.getAllCommsSent)
// Comunicaciones borradas
router.get('/comms/deleted', authJwt.verifyToken, commsController.getAllCommsDeleted)
// Enviar comunicación
router.post('/comms/send', authJwt.verifyToken, commsController.sendCom)
// Actualizar comunicación
router.post('/comms/update', authJwt.verifyToken, commsController.updateCom)

// -- Subida de archivos --
// Subir archivo
router.post('/resources/upload', fileController.upload)
// Ver lista de archivos
router.get('/resources/list', fileController.getListFiles)
// Descargar un archivo
router.get('/resources/download', fileController.downloadFile)

    
export default router