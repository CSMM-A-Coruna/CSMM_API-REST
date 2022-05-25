import app from '../app'
import * as horarioService from '../services/horario.service'

export const getHorarioByGrupo = async (req, res) => {
  try {
    const { grupo } = req.query
    if (grupo) {
      const horario = await horarioService.calcularHorarioByGrupo(grupo)
      if (horario == '404') {
        throw '404'
      } else {
        res.status(200).json(horario)
      }
    } else {
      throw '400'
    }
  } catch (err) {
    if (err == '400') {
      res.status(400).json({ message: 'Faltan parámetros' })
    } else if (err == '404') {
      res.status(404).json({
        message: 'No se ha encontrado el horario correspondiente a ese grupo',
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
