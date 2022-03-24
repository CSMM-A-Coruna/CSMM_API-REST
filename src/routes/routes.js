import { Router } from 'express'
import * as authController from '../controllers/auth.controller'
const router = Router()


// -- Autentificación --
// Login
router.post('/auth/login', authController.signIn)
// Registrar administrador
router.post('/auth/admin/register', authController.signUp)
// Registrar profesor
router.post('/auth/profesor/register', authController.signUp)
// Registrar alumno
router.post('/auth/alumno/register', authController.signUp)
// Registrar familia
router.post('/auth/familia/register', authController.signUp)


export default router;