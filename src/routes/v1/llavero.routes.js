import { Router } from 'express'
import { auth } from '../../middlewares/index'
import * as llaveroController from '../../controllers/llavero.controller'
import router from './auth.routes'
import apicache from 'apicache'


const cache = apicache.middleware
const router = Router()

router.get(
  '/:id_alumno',
  auth.verifyToken,
  cache('2 minutes'),
  llaveroController.getLlaveroByIdAlumno
)

router.post('/', auth.verifyToken, llaveroController.nuevoLlavero)

router.put(
  '/:id_llavero',
  auth.verifyToken,
  llaveroController.actualizarLlavero
)

export default router
