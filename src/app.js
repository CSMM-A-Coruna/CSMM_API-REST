// CONFIG SERVER
import express from 'express'
import config from './config'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import RoutesV1 from './routes/v1/routes'
import RoutesV2 from './routes/v2/routes'
import { useTreblle } from 'treblle'
import { errorLogger, errorResponder, invalidPathHandler } from './middlewares/errorHandling'


// Definimos la ruta base, para el sistema de descarga y subida de archivos
global.__basedir = __dirname

const app = express()

// Definir el puerto
app.set('port', config.port)

// Real time logs with treblle
if (app.settings.env === 'production') {
  useTreblle(app, {
    apiKey: 'jjPNsgfxz6qFFjUksixnWR1kVS45AcrN',
    projectId: '7bHOBENbeXSgaXvs',
  })

  // ---- SEGURIDAD ----
  // Usamos cors y helmet para más seguridad
  const corsOptions = {
    origin: 'https://csmm-api.herokuapp.com/',
  }
  app.use(cors(corsOptions))
  app.use(helmet())
  // Deshabilitamos cabeceras que dan información adicional
  app.disable('x-powered-by')
} else {
  // ---- LOGGER ----
  // Le decimos que utilice morgan como logger
  app.use(morgan('dev'))
}


// Desactivamos response 304
app.disable('etag')

// ---- JSON y URLEncoded ----
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

// ---- RUTAS ----
// Ruta base - V1
app.get('/v1', (req, res) => {
  res.json({ message: 'CSMM Gestor Escolar API REST - V1' })
})
app.get('/v2', (req, res) => {
  res.json({ message: 'CSMM Gestor Escolar API REST - V2' })
})

app.use('/v1', RoutesV1)
app.use('/v2', RoutesV2)

// Gestión de errores
app.use(errorLogger)
app.use(errorResponder)
app.use(invalidPathHandler)


export default app
