import * as preferencesServices from '../services/preferences.service'

export const getAllPreferences = async (req, res) => {
  try {
    const { user_id } = req.params
    if (user_id) {
      const preferences =
        await preferencesServices.getAllPreferencesByIdUsuario(user_id)
      if (preferences == '404') {
        throw '404'
      } else {
        res.status(200).json(preferences)
      }
    } else {
      throw '400'
    }
  } catch (err) {
    if (err == '400') {
      res.status(400).json({ message: 'Faltan parámetros' })
    } else if ((err = '404')) {
      res.status(404).json({ message: 'No se ha encontrado el ID del usuario' })
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
    const { tipo_preferencia, value } = req.body
    const id_usuario = req.params.user_id
    if (id_usuario && tipo_preferencia && value != undefined) {
      await preferencesServices.updatePreference(
        id_usuario,
        tipo_preferencia,
        value
      )
      res.status(200).json({ message: 'Preferencia actualizada con éxito' })
    } else {
      throw '400'
    }
  } catch (err) {
    if (err == '400') {
      res.status(400).json({ message: 'Faltan parámetros' })
    } else if ((err = '404')) {
      res.status(404).json({ message: 'No se ha encontrado el ID del usuario' })
    } else {
      if (app.settings.env == 'production') {
        res.status(500).json({ message: 'Error interno del servidor' })
      } else {
        res.status(500).json({ message: err })
      }
    }
  }
}
