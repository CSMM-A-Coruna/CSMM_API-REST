import { Router } from 'express'
import * as commsController from '../../controllers/comms.controller'
import { auth } from '../../middlewares/index'
import apicache from 'apicache'

const cache = apicache.middleware
const router = Router()

// -- Comunicaciones (JWT Required) --
// Comunicaciones recibidas
router.get(
  '/received/:user_id',
  auth.verifyToken,
  cache('2 minutes'),
  commsController.getAllCommsReceived
)
// Comunicaciones enviadas
router.get(
  '/sent/:user_id',
  auth.verifyToken,
  cache('2 minutes'),
  commsController.getAllCommsSent
)
// Comunicaciones borradas
router.get(
  '/deleted/:user_id',
  auth.verifyToken,
  cache('2 minutes'),
  commsController.getAllCommsDeleted
)
// Enviar comunicación
router.post('/send', auth.verifyToken, commsController.sendCom)
// Actualizar comunicación
router.put('/update/:id_com', auth.verifyToken, commsController.updateCom)
// Usuario disponibles a los que enviar una comunicannción (siendo usuario familia)
router.get(
  '/senders/:id_alumno',
  auth.verifyToken,
  cache('2 minutes'),
  commsController.getAllDispoSenders
)

export default router
