import app from '../app'
import * as horarioService from '../services/horario.service'

export const getHorarioByGrupo = async (req, res, next) => {
  try {
    const { grupo } = req.query
    if (grupo) {
      const horario = await horarioService.calcularHorarioByGrupo(grupo)
      if (horario == '404') {
        next({
          statusCode: 404,
          msg: 'No se ha encontrado el horario correspondiente a ese grupo',
        })
      } else {
        res.status(200).json(horario)
      }
    } else {
      next({
        statusCode: 400,
        msg: 'Faltan parámetros',
      })
    }
  } catch (err) {
    next(err)
  }
}
