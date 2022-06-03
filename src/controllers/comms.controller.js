import NuevaComunicacion from '../models/NuevaComunicacion'
import * as commsService from '../services/comms.service'
import app from '../app'

export const getAllCommsReceived = async (req, res, next) => {
  try {
    const comms = await commsService.getAllCommsReceived(req.params.user_id)
    if (comms === '404') {
      next({
        statusCode: 404,
        msg: 'No se han encontrado comunicaciones recibidas'
      })
    } else {
      res.status(200).json(comms)
    }
  } catch (err) {
    next(err)
  }
}

export const getAllCommsSent = async (req, res, next) => {
  try {
    const comms = await commsService.getAllCommsSent(req.params.user_id)
    if (comms === '404') {
      next({
        statusCode: 404,
        msg: 'No se han encontrado comunicaciones enviadas'
      })
    } else {
      res.status(200).json(comms)
    }
  } catch (err) {
    next(err)
  }
}

export const getAllCommsDeleted = async (req, res, next) => {
  try {
    const comms = await commsService.getAllCommsDeleted(req.params.user_id)
    if (comms === '404') {
      next({
        statusCode: 404,
        msg: 'No se han encontrado comunicaciones eliminadas'
      })
    } else {
      res.status(200).json(comms)
    }
  } catch (err) {
    next(err)
  }
}

export const updateCom = async (req, res, next) => {
  try {
    if (req.query.state && req.query.id_destino) {
      let result
      switch (req.query.state) {
        case 'importante':
          result = commsService.setImportant(
            req.params.id_com,
            req.query.id_destino
          )
          break
        case 'no_importante':
          result = commsService.setNotImportant(
            req.params.id_com,
            req.query.id_destino
          )
          break
        case 'leida':
          result = commsService.setLeida(
            req.params.id_com,
            req.query.id_destino
          )
          break
        case 'eliminado':
          result = commsService.setEliminada(
            req.params.id_com,
            req.query.id_destino
          )
          break
        case 'restaurar':
          result = commsService.setNotEliminada(
            req.params.id_com,
            req.query.id_destino
          )
          break
      }
      if (result === '200') {
        res
          .status(200)
          .json({ message: 'Estado de la comunicación actualizado con éxito' })
      } else {
        next({
          statusCode: result,
          msg: 'No se ha encontrado una comunicación con ese ID o hay conflictos'
        })
      }
    } else {
      next({
        statusCode: 400,
        msg: 'Faltán parámetros'
      })
    }
  } catch (err) {
    next(err)
  }
}

export const sendCom = async (req, res, next) => {
  try {
    if (
      req.body.asunto &&
      req.body.texto &&
      req.body.id_remite &&
      req.body.tipo_destino &&
      req.body.id_destino &&
      req.body.id_alumnoAsociado
    ) {
      const com = new NuevaComunicacion(
        req.body.asunto,
        req.body.texto,
        req.body.id_remite,
        req.body.tipo_destino,
        req.body.id_destino,
        req.body.id_alumnoAsociado
      )
      const result = await commsService.createNewCom(com)
      if (result == '500') {
        next({
          statusCode: 500,
          msg: 'Error interno del servidor'
        })
      } else {
        res
          .status(201)
          .json({ message: 'Comunicación enviada con éxito', id: result })
      }
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

export const getAllDispoSenders = async (req, res, next) => {
  try {
    const senders = await commsService.getAllDispoSenders(req.params.id_alumno)
    if (senders === '404') {
      next({
        statusCode: 404,
        msg: 'No existe un usuario con ese ID o no tiene gente disponible para enviar'
      })
    } else {
      res.status(200).json(senders)
    }
  } catch (err) {
    next(err)
  }
}
