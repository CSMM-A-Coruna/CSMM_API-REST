import { Router } from 'express'
import * as preferenceController from '../../controllers/preferences.controller'
import { auth } from '../../middlewares/index'
import apicache from 'apicache'

const cache = apicache.middleware
const router = Router()
// -- Preferencias del usuario --
// Coger todas las preferencias definidas por el usuario
router.get(
  '/:user_id',
  auth.verifyToken,
  cache('2 minutes'),
  preferenceController.getAllPreferences
)
// Actualizar las preferencias del usuario
router.put('/:user_id', auth.verifyToken, preferenceController.updatePreference)

export default router
