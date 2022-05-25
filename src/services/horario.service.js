import { executeQuery } from '../database'

export const calcularHorarioByGrupo = async (grupo) => {
  const horario = await executeQuery(
    `SELECT diasemana, nombre, apellido1, apellido2, materia, inicio, fin from horario_marco_profesores WHERE grupo = "${grupo}" ORDER BY diasemana, inicio`
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
    return horarioFinal
  } else {
    return '404'
  }
}
