import { Router } from 'express'
import * as authController from '../controllers/auth.controller'
import * as commsController from '../controllers/comms.controller'
import { authJwt } from '../middlewares/index'
const router = Router()


// -- Autentificación --
// Login
router.post('/auth/login', authController.signIn)
// Registrar un usuario nuevo
router.post('/auth/register', authController.signUp)

// -- Comunicaciones (JWT Required) --
// Comunicaciones recibidas
router.get('/comms/received', authJwt.verifyToken, commsController.getAllCommsReceived)
// Comunicaciones enviadas
router.get('/comms/sent', authJwt.verifyToken, commsController.getAllCommsSent)
// Enviar comunicación
router.post('/comms/send', authJwt.verifyToken, commsController.sendCom)

    
export default router