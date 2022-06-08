import { Router } from 'express'
import * as adjuntosController from '../../controllers/resources/adjuntos.controller'
import * as documentController from '../../controllers/resources/documentos.controller'
import { auth, adjuntoUtil } from '../../middlewares/index'
import apicache from 'apicache'

const cache = apicache.middleware
const router = Router()

// -- Todo lo relacionado con los archivos y FTP --
// Subir un adjunto
router.post('/adjuntos/upload', auth.verifyToken, adjuntosController.upload)
// Descargar un adjunto
router.get(
  '/adjuntos/download',
  auth.verifyAuthDownload,
  adjuntoUtil.downloadAdjuntoToAPI,
  adjuntosController.downloadFile
)
// Coger todos los documentos
router.get(
  '/documentos',
  auth.verifyToken,
  cache('2 minutes'),
  documentController.getAllDocumentos
)
// Descargar un documento general
router.get(
  '/documentos/generales/download',
  auth.verifyAuthDownload,
  adjuntoUtil.downloadDocumentoGeneralToAPI,
  documentController.downloadDocumentoGeneral
)
// Descargar un documento de un alumno concreto
router.get(
  '/documentos/alumnos/download',
  auth.verifyAuthDownload,
  adjuntoUtil.downloadDocumentoAlumnoToAPI,
  documentController.downloadDocumentoAlumno
)

export default router
