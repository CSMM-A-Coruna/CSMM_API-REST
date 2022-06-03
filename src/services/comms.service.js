import { executeQuery } from '../database'
import Comunicacion from '../models/Comunicacion'

export const getAllCommsReceived = async (userId) => {
  const query = `SELECT *, nombreRemite(comunicaciones_generales.tiporemite, comunicaciones_generales.idremite) AS nombreRemite, 
                            nombreDestino(comunicaciones_generales.tipodestino, comunicaciones_generales.iddestino) AS nombreDestino,
                            calculoAdjuntos(comunicaciones_generales.idcomunicacion) AS adjuntos
                            FROM comunicaciones_generales
                            WHERE tipodestino = 2 AND iddestino = ${userId} 
                            AND comunicaciones_generales.eliminado IS NULL 
                            ORDER BY comunicaciones_generales.fecha DESC`
  const result = await executeQuery(query)
  if (result.length) {
    let comms = []
    for (let index = 0; index < result.length; index++) {
      let adjuntos = []
      if (result[index].adjuntos !== 0) {
        const result1 = await executeQuery(
          `SELECT adjunto FROM comunicaciones_adjuntos WHERE idcomunicacion = ${result[index].idcomunicacion}`
        )
        if (result1.length === 1) {
          adjuntos.push(result1[0].adjunto)
        } else {
          for (let i = 0; i < result1.length; i++) {
            adjuntos.push(result1[i].adjunto)
          }
        }
      }
      const com = new Comunicacion(
        result[index].idcomunicacion,
        result[index].idremite,
        result[index].iddestino,
        result[index].idAlumnoAsociado,
        result[index].asunto,
        result[index].texto,
        result[index].importante,
        result[index].fecha,
        result[index].leida,
        result[index].eliminado,
        'recibida',
        result[index].alumnoAsociado,
        result[index].nombreRemite,
        result[index].nombreDestino,
        adjuntos
      )
      com.calcularTipoDestino(result[index].tipodestino)
      com.calcularTipoRemite(result[index].tiporemite)
      comms.push(com)
      if (!result[index + 1]) {
        return comms
      }
    }
  } else {
    return '404'
  }
}

export const getAllCommsSent = async (userId) => {
  const query = `SELECT *, nombreRemite(comunicaciones_generales.tiporemite, comunicaciones_generales.idremite) AS nombreRemite, 
                            nombreDestino(comunicaciones_generales.tipodestino, comunicaciones_generales.iddestino) AS nombreDestino,
                            calculoAdjuntos(comunicaciones_generales.idcomunicacion) AS adjuntos
                            FROM comunicaciones_generales
                            WHERE tiporemite = 2 AND idremite = ${userId} 
                            AND comunicaciones_generales.eliminado IS NULL 
                            ORDER BY comunicaciones_generales.fecha DESC`
  const result = await executeQuery(query)
  if (result.length) {
    let comms = []
    for (let index = 0; index < result.length; index++) {
      let adjuntos = []
      if (result[index].adjuntos !== 0) {
        const result1 = await executeQuery(
          `SELECT adjunto FROM comunicaciones_adjuntos WHERE idcomunicacion = ${result[index].idcomunicacion}`
        )
        if (result1.length === 1) {
          adjuntos.push(result1[0].adjunto)
        } else {
          for (let i = 0; i < result1.length; i++) {
            adjuntos.push(result1[i].adjunto)
          }
        }
      }
      const com = new Comunicacion(
        result[index].idcomunicacion,
        result[index].idremite,
        result[index].iddestino,
        result[index].idAlumnoAsociado,
        result[index].asunto,
        result[index].texto,
        result[index].importante,
        result[index].fecha,
        result[index].leida,
        result[index].eliminado,
        'enviada',
        result[index].alumnoAsociado,
        result[index].nombreRemite,
        result[index].nombreDestino,
        adjuntos
      )
      com.calcularTipoDestino(result[index].tipodestino)
      com.calcularTipoRemite(result[index].tiporemite)
      comms.push(com)
      if (!result[index + 1]) {
        return comms
      }
    }
  } else {
    return '404'
  }
}

export const getAllCommsDeleted = async (userId) => {
  const query = `SELECT *, nombreRemite(comunicaciones_generales.tiporemite, comunicaciones_generales.idremite) AS nombreRemite, 
  nombreDestino(comunicaciones_generales.tipodestino, comunicaciones_generales.iddestino) AS nombreDestino,
  calculoAdjuntos(comunicaciones_generales.idcomunicacion) AS adjuntos
  FROM comunicaciones_generales
  WHERE tipodestino = 2 AND iddestino = ${userId} 
  AND comunicaciones_generales.eliminado IS NOT NULL 
  ORDER BY comunicaciones_generales.eliminado DESC`
  const result = await executeQuery(query)
  let comms = []
  if (result.length) {
    for (let index = 0; index < result.length; index++) {
      let adjuntos = []
      if (result[index].adjuntos !== 0) {
        const result1 = await executeQuery(
          `SELECT adjunto FROM comunicaciones_adjuntos WHERE idcomunicacion = ${result[index].idcomunicacion}`
        )
        if (result1.length === 1) {
          adjuntos.push(result1[0].adjunto)
        } else {
          for (let i = 0; i < result1.length; i++) {
            adjuntos.push(result1[i].adjunto)
          }
        }
      }
      const com = new Comunicacion(
        result[index].idcomunicacion,
        result[index].idremite,
        result[index].iddestino,
        result[index].idAlumnoAsociado,
        result[index].asunto,
        result[index].texto,
        result[index].importante,
        result[index].fecha,
        result[index].leida,
        result[index].eliminado,
        'borrada',
        result[index].alumnoAsociado,
        result[index].nombreRemite,
        result[index].nombreDestino,
        adjuntos
      )
      com.calcularTipoDestino(result[index].tipodestino)
      com.calcularTipoRemite(result[index].tiporemite)
      comms.push(com)
      if (!result[index + 1]) {
        return comms
      }
    }
  } else {
    return '404'
  }
}

export const setImportant = async (idCom, idDestino) => {
  const query = `UPDATE comunicaciones_destinos SET importante = 1 WHERE comunicaciones_destinos.idcomunicacion = ${idCom} AND comunicaciones_destinos.iddestino = ${idDestino} AND comunicaciones_destinos.tipodestino = 2`
  const result = await executeQuery(query)
  if (result.changedRows === 1) {
    return '200'
  } else if (
    result.affectedRows === 0 ||
    (result.affectedRows === 1 && result.changedRows === 0)
  ) {
    return '409'
  } else {
    return '500'
  }
}

export const setNotImportant = async (idCom, idDestino) => {
  const query = `UPDATE comunicaciones_destinos SET importante = 0 WHERE comunicaciones_destinos.idcomunicacion = ${idCom} AND comunicaciones_destinos.iddestino = ${idDestino} AND comunicaciones_destinos.tipodestino = 2`
  const result = await executeQuery(query)
  if (result.changedRows === 1) {
    return '200'
  } else if (
    result.affectedRows === 0 ||
    (result.affectedRows === 1 && result.changedRows === 0)
  ) {
    return '409'
  } else {
    return '500'
  }
}

export const setLeida = async (idCom, idDestino) => {
  const currentDate = new Date()
  const date = currentDate.toISOString()
  const query = `UPDATE comunicaciones_destinos SET leida = "${date}" WHERE comunicaciones_destinos.idcomunicacion = ${idCom} AND comunicaciones_destinos.iddestino = ${idDestino} AND comunicaciones_destinos.tipodestino = 2`
  const result = await executeQuery(query)
  if (result.changedRows === 1) {
    return '200'
  } else if (
    result.affectedRows === 0 ||
    (result.affectedRows === 1 && result.changedRows === 0)
  ) {
    return '409'
  } else {
    return '500'
  }
}

export const setEliminada = async (idCom, idDestino) => {
  const currentDate = new Date()
  const date = currentDate.toISOString()
  const query = `UPDATE comunicaciones_destinos SET eliminado = "${date}" WHERE comunicaciones_destinos.idcomunicacion = ${idCom} AND comunicaciones_destinos.iddestino = ${idDestino} AND comunicaciones_destinos.tipodestino = 2`
  const result = await executeQuery(query)
  if (result.changedRows === 1) {
    return '200'
  } else if (
    result.affectedRows === 0 ||
    (result.affectedRows === 1 && result.changedRows === 0)
  ) {
    return '409'
  } else {
    return '500'
  }
}

export const setNotEliminada = async (idCom, idDestino) => {
  const query = `UPDATE comunicaciones_destinos SET eliminado = NULL WHERE comunicaciones_destinos.idcomunicacion = ${idCom} AND comunicaciones_destinos.iddestino = ${idDestino} AND comunicaciones_destinos.tipodestino = 2`
  const result = await executeQuery(query)
  if (result.changedRows === 1) {
    return '200'
  } else if (
    result.affectedRows === 0 ||
    (result.affectedRows === 1 && result.changedRows === 0)
  ) {
    return '409'
  } else {
    return '500'
  }
}

export const createNewCom = async (com) => {
  const query = `INSERT INTO comunicaciones (tiporemite, idremite, fecha, asunto, texto) VALUES (${com.tipoRemite}, ${com.idRemite}, "${com.fecha}", "${com.asunto}", "${com.texto}");`
  const result = await executeQuery(query)
  if (result.message === '') {
    const query2 = `INSERT INTO comunicaciones_destinos (idcomunicacion, tipodestino, iddestino, leida, eliminado, email, idAlumnoAsociado, importante) VALUES (${result.insertId}, ${com.tipoDestino}, ${com.idDestino}, ${com.leida}, ${com.eliminado}, ${com.email}, ${com.idAlumnoAsociado}, ${com.importante});`
    const result2 = await executeQuery(query2)
    if (result2.message === '') {
      return result.insertId
    }
  } else {
    return '500'
  }
}

export const getAllDispoSenders = async (idAlumno) => {
  const query = `SELECT id_profesor, profesor 
  FROM docencia_alumnos 
  WHERE docencia_alumnos.id_alumno = ${idAlumno}
  AND (docencia_alumnos.materia = 'Formación Humana' OR docencia_alumnos.materia = 'Globalizada')`
  const result = await executeQuery(query)
  if (result.length) {
    let destinatarios = []
    for (let i = 0; i < result.length; i++) {
      const destinatario = {
        id: result[i].id_profesor,
        nombre: result[i].profesor,
        tipo_usuario: 'tutor',
      }
      destinatarios.push(destinatario)
    }
    return destinatarios
  } else {
    return '404'
  }
}
