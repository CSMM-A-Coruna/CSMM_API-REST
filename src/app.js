// CONFIG SERVER
import express from 'express'
import config from './config'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import Routes from './routes/routes'

// Definimos la ruta base, para el sistema de descarga y subida de archivos
global.__basedir = __dirname

const app = express()
 
// Definir el puerto
app.set('port', config.port)

// ---- LOGGER ----
// Le decimos que utilice morgan como logger
app.use(morgan('dev'))
// Desactivamos response 304
app.disable('etag');

// ---- JSON y URLEncoded ----
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

// ---- SEGURIDAD ----
// Usamos cors y helmet para más seguridad
const corsOptions = {
  // origin: "http://localhost:3000",
}
app.use(cors(corsOptions))
app.use(helmet())

// ---- RUTAS ----
// Ruta base
app.get('/v1', (req, res) => {
  res.json({ message: 'CSMM Gestor Escolar API REST' })
})

app.use('/v1', Routes)

export default app;