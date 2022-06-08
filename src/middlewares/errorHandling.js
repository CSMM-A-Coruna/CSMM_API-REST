import app from '../app'

const errorLogger = (error, req, res, next) => {
  console.error(error) // or using any fancy logging library
  next(error) // forward to next middleware
}

const errorResponder = (err, req, res, next) => {
  res.header('Content-Type', 'application/json')
  if (err.statusCode === 500 || err.statusCode === undefined) {
    if (app.settings.env === 'production') {
      res.status(500).json({ message: 'Error interno del servidor' })
    } else {
      res.status(500).json({ message: err })
    }
  } else {
    res.status(err.statusCode).json({ message: err.msg })
  }
}

const invalidPathHandler = (req, res, next) => {
  res.redirect('/v1/error')
}

module.exports = { errorLogger, errorResponder, invalidPathHandler }
