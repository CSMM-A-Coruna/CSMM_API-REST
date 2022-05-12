import { executeQuery } from '../database'
import app from '../app'

export const getHorarioByGrupo = async (req, res) => {
  try {
    const { grupo } = req.query
    if (grupo) {
      const horario = await executeQuery(
        `SELECT diasemana, nombre, apellido1, apellido2, materia, inicio, fin from horario_marco_profesores WHERE grupo = "${grupo}" ORDER BY diasemana`
      )
      if (horario.length) {
        const horarioFinal = {
          lunes: [],
          martes: [],
          miercoles: [],
          jueves: [],
          viernes: [],
        }
        for (let i = 0; i < horario.length; i++) {
          const aux = {
            profesor:
              horario[i].nombre +
              ' ' +
              horario[i].apellido1 +
              ' ' +
              horario[i].apellido2,
            materia: horario[i].materia,
            inicio: horario[i].inicio,
            fin: horario[i].fin,
          }
          switch (horario[i].diasemana) {
            case 1:
              horarioFinal.lunes.push(aux)
              break
            case 2:
              horarioFinal.martes.push(aux)
              break
            case 3:
              horarioFinal.miercoles.push(aux)
              break
            case 4:
              horarioFinal.jueves.push(aux)
              break
            case 5:
              horarioFinal.viernes.push(aux)
              break
          }
        }
        res.status(200).json(horarioFinal)
      } else {
        throw '404'
      }
    } else {
      throw '400'
    }
  } catch (err) {
    if (err == '400') {
      res.status(400).json({ message: 'Faltan parámetros' })
    } else if (err == '404') {
      res
        .status(404)
        .json({
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
