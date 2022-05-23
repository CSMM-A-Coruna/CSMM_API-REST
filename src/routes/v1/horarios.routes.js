import { Router } from 'express'
import * as horarioController from '../../controllers/horario.controller'
import { auth } from '../../middlewares/index'

const router = Router()

// -- Horarios --
router.get('/', auth.verifyToken, horarioController.getHorarioByGrupo)

export default router
