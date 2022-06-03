import * as preferencesServices from '../services/preferences.service'

export const getAllPreferences = async (req, res) => {
  try {
    const { user_id } = req.params
    if (user_id) {
      const preferences =
        await preferencesServices.getAllPreferencesByIdUsuario(user_id)
      if (preferences == '404') {
        next({
          statusCode: 404,
          msg: 'No se ha encontrado el ID del usuario'
        })
      } else {
        res.status(200).json(preferences)
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
      next({
        statusCode: 400,
        msg: 'Faltan parámetros'
      })

    }
  } catch (err) {
    next(err)
  }
}
