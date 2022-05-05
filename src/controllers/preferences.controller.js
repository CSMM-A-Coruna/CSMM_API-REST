import { executeQuery } from "../database"

export const getAllPreferences = async (req, res) => {
  try {
    const { id_usuario } = req.query
    if(id_usuario) {
      const query = await executeQuery(`SELECT * FROM familias_app_ajustes WHERE id_usuario = ${id_usuario}`)
      if(query.length > 0) {
        res.status(200).json(query[0])
      } else {
        throw '404'
      }
    } else {
      throw '400'
    }
  } catch(err) {
    if (err == '400') {
      res.status(400).json({ message: 'Faltan parámetros' })
    } else if ((err = '404')) {
      res
        .status(404)
        .json({ message: 'No se ha encontrado el ID del usuario' })
    } else {
      if (app.settings.env == 'production') {
        res.status(500).json({ message: 'Error interno del servidor' })
      } else {
        res.status(500).json({ message: err })
      }
    }
  }
}

export const updatePreference = async (req, res) => {
  try {
    const { id_usuario, tipo_preferencia, value } = req.body
    if(id_usuario && tipo_preferencia && value != undefined) {
      const query = await executeQuery(`UPDATE familias_app_ajustes SET ${req.body.tipo_preferencia} = ${req.body.value} WHERE id_usuario = ${req.body.id_usuario}`)
      res.status(200).json(query)
    } else {
      throw '400'
    }
  } catch(err) {
    if (err == '400') {
      res.status(400).json({ message: 'Faltan parámetros' })
    } else if ((err = '404')) {
      res
        .status(404)
        .json({ message: 'No se ha encontrado el ID del usuario' })
    } else {
      if (app.settings.env == 'production') {
        res.status(500).json({ message: 'Error interno del servidor' })
      } else {
        res.status(500).json({ message: err })
      }
    }
  }
}