import { Router } from 'express'
import * as horarioController from '../../controllers/horario.controller'
import { auth } from '../../middlewares/index'
import apicache from 'apicache'


const cache = apicache.middleware
const router = Router()

// -- Horarios --
router.get('/', auth.verifyToken, cache('2 minutes'), horarioController.getHorarioByGrupo)

export default router
