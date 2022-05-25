import NuevaComunicacion from '../models/NuevaComunicacion'
import * as commsService from '../services/comms.service'
import app from '../app'

export const getAllCommsReceived = async (req, res) => {
  try {
    const comms = await commsService.getAllCommsReceived(req.params.user_id)
    if (comms === '404') {
      throw '404'
    } else {
      res.status(200).json(comms)
    }
  } catch (err) {
    if (err == '404') {
      res
        .status(404)
        .json({ message: 'No se han encontrado comunicaciones recibidas' })
    } else {
      if (app.settings.env == 'production') {
        res.status(500).json({ message: 'Error interno del servidor' })
      } else {
        res.status(500).json({ message: err })
      }
    }
  }
}

export const getAllCommsSent = async (req, res) => {
  try {
    const comms = await commsService.getAllCommsSent(req.params.user_id)
    if (comms === '404') {
      throw '404'
    } else {
      res.status(200).json(comms)
    }
  } catch (err) {
    if (err == '404') {
      res
        .status(404)
        .json({ message: 'No se han encontrado comunicaciones enviadas' })
    } else {
      if (app.settings.env == 'production') {
        res.status(500).json({ message: 'Error interno del servidor' })
      } else {
        res.status(500).json({ message: err })
      }
    }
  }
}

export const getAllCommsDeleted = async (req, res) => {
  try {
    const comms = await commsService.getAllCommsDeleted(req.params.user_id)
    if (comms === '404') {
      throw '404'
    } else {
      res.status(200).json(comms)
    }
  } catch (err) {
    if (err == '404') {
      res
        .status(404)
        .json({ message: 'No se han encontrado comunicaciones eliminadas' })
    } else {
      if (app.settings.env == 'production') {
        res.status(500).json({ message: 'Error interno del servidor' })
      } else {
        res.status(500).json({ message: err })
      }
    }
  }
}

export const updateCom = async (req, res) => {
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
        throw result
      }
    } else {
      throw '400'
    }
  } catch (err) {
    if (err == '404') {
      res
        .status(404)
        .json({ message: 'No se ha encontrado una comunicación con ese ID' })
    } else if (err == '400') {
      res.status(400).json({ message: 'Faltan parámetros' })
    } else if (err == '409') {
      res.status(409).send()
    } else {
      if (app.settings.env == 'production') {
        res.status(500).json({ message: 'Error interno del servidor' })
      } else {
        res.status(500).json({ message: err })
      }
    }
  }
}

export const sendCom = async (req, res) => {
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
        throw '500'
      } else {
        res
          .status(201)
          .json({ message: 'Comunicación enviada con éxito', id: result })
      }
    } else {
      throw '400'
    }
  } catch (err) {
    if (err == '400') {
      res.status(400).json({ message: 'Faltan parámetros' })
    } else if (err == '409') {
      res.status(409).send()
    } else {
      if (app.settings.env == 'production') {
        res.status(500).json({ message: 'Error interno del servidor' })
      } else {
        res.status(500).json({ message: err })
      }
    }
  }
}

export const getAllDispoSenders = async (req, res) => {
  try {
    const senders = await commsService.getAllDispoSenders(req.params.id_alumno)
    if (senders === '404') {
      throw '404'
    } else {
      res.status(200).json(senders)
    }
  } catch (err) {
    if (err == '404') {
      res.status(404).json({
        message:
          'No existe un usuario con ese ID o no tiene gente disponible para enviar',
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
