import * as llaveroService from '../services/llavero.service'

export const getLlaveroByIdAlumno = async (req, res, next) => {
  try {
    const llavero = await llaveroService.getLlaveroByIdAlumno(
      req.params.id_alumno
    )
    if (llavero == '404') {
      next({
        statusCode: 404,
        msg: 'No se ha encontrado el llavero correspondiente a ese alumno'
      })
    }
    res.status(200).json(llavero)
  } catch (err) {
    next(err)
  }
}

export const nuevoLlavero = async (req, res, next) => {
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
        next({
          statusCode: 500,
          msg: 'Error interno del servidor'
        })

      }
      res.status(201).json({ message: 'Registro creado con éxito' })
    } else {
      next({
        statusCode: 400,
        msg: 'Faltan parámetros'
      })
    }
  } catch (err) {
    next(err)
  }
}

export const actualizarLlavero = async (req, res, next) => {
  try {
    const llavero = await llaveroService.getLlaveroById(req.params.id_llavero)
    if (llavero == '404') {
      next({
        statusCode: 404,
        msg: 'No se ha encontrado el llavero correspondiente a ese alumno'
      })
    } else if (llavero == '401') {
      next({
        statusCode: 401,
        msg: 'No tienes permiso para editar este llavero'
      })
    }
    const actualizarLlavero = await llaveroService.actualizarLlavero(
      req.params.id_llavero,
      req.body
    )
    if (actualizarLlavero == '500') {
      next({
        statusCode: 500,
        msg: 'Error interno del servidor'
      })
    }
    res.status(200).json({ message: 'Llavero modificado con éxito' })
  } catch (err) {
    next(err)
  }
}
