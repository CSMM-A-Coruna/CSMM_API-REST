import { Router } from 'express'
import authRoutes from './auth.routes'
import commsRoutes from './comms.routes'
import resourcesRoutes from './resources.routes'
import preferencesRoutes from './preferences.routes'
import horarioRoutes from './horarios.routes'

const router = Router()

router.use('/auth', authRoutes)

router.use('/comms', commsRoutes)

router.use('/resources', resourcesRoutes)

router.use('/preferences', preferencesRoutes)

router.use('/horario', horarioRoutes)

export default router
