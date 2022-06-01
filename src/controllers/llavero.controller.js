import * as llaveroService from '../services/llavero.service'

export const getLlaveroByIdAlumno = async (req, res) => {
  try {
    const llavero = await llaveroService.getLlaveroByIdAlumno(
      req.params.id_alumno
    )
    if (llavero == '404') {
      throw llavero
    }
    res.status(200).json(llavero)
  } catch (err) {
    if (err == '400') {
      res.status(400).json({ message: 'Faltan parámetros' })
    } else if (err == '404') {
      res.status(404).json({
        message: 'No se ha encontrado el llavero correspondiente a ese alumno',
      })
    } else {
      if (app.settings.env == 'production') {
        res.status(500).json({ message: 'Error interno del servidor' })
      } else {
        res.status(500).json({ message: err })
      }
    }
  }
}

export const nuevoLlavero = async (req, res) => {
  try {
    const { id_alumno, aplicacion, usuario, email, contraseña } = req.body
    if (id_alumno && aplicacion && usuario && email && contraseña) {
      const nuevoLlavero = await llaveroService.createNewLlavero(
        id_alumno,
        aplicacion,
        usuario,
        email,
        contraseña
      )
      if (nuevoLlavero == '500') {
        throw '500'
      }
      res.status(201).json({ message: 'Registro creado con éxito' })
    } else {
      throw '400'
    }
  } catch (err) {
    if (err == '400') {
      res.status(400).json({ message: 'Faltan parámetros' })
    } else if (err == '404') {
      res.status(404).json({
        message: 'No se ha encontrado el llavero correspondiente a ese alumno',
      })
    } else {
      if (app.settings.env == 'production') {
        res.status(500).json({ message: 'Error interno del servidor' })
      } else {
        res.status(500).json({ message: err })
      }
    }
  }
}

export const actualizarLlavero = async (req, res) => {
  try {
    const llavero = await llaveroService.getLlaveroById(req.params.id_llavero)
    if (llavero == '404') {
      throw '404'
    } else if (llavero == '401') {
      throw '401'
    }
    const actualizarLlavero = await llaveroService.actualizarLlavero(
      req.params.id_llavero,
      req.body
    )
    if (actualizarLlavero == '500') {
      throw '500'
    }
    res.status(200).json({ message: 'Llavero modificado con éxito' })
  } catch (err) {
    if (err == '400') {
      res.status(400).json({ message: 'Faltan parámetros' })
    } else if (err == '404') {
      res.status(404).json({
        message: 'No se ha encontrado el llavero correspondiente a ese alumno',
      })
    } else {
      if (app.settings.env == 'production') {
        res.status(500).json({ message: 'Error interno del servidor' })
      } else {
        res.status(500).json({ message: err })
      }
    }
  }
}
