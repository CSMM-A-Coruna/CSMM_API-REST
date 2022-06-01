import { Router } from 'express'
import { auth } from '../../middlewares/index'
import * as llaveroController from '../../controllers/llavero.controller'
import router from './auth.routes'

const routes = Router()

router.get(
  '/:id_alumno',
  auth.verifyToken,
  llaveroController.getLlaveroByIdAlumno
)

router.post('/', auth.verifyToken, llaveroController.nuevoLlavero)

router.put(
  '/:id_llavero',
  auth.verifyToken,
  llaveroController.actualizarLlavero
)

export default router
