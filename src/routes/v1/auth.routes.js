import { Router } from 'express'
import * as authController from '../../controllers/auth.controller'
import { auth } from '../../middlewares/index'

const router = Router()

// -- Autentificación --
// Login
router.post('/login', authController.signIn)
// Registrar un usuario nuevo
router.post('/register', authController.signUp)
// Verificar datos una vez ya está logeado
router.post('/reload', auth.verifyToken, authController.reloadToken)
// Comparar contraseña (uno de los pasos previos para cambiarla)
router.post('/check_pass', auth.verifyToken, authController.checkPassword)
// Cambiar la contraseña
router.put('/change_password', auth.verifyToken, authController.changePassword)
// Actualizar el token de Firebase Cloud Messaging
router.put('/firebase_token', auth.verifyToken, authController.saveFCMToken)

export default router
