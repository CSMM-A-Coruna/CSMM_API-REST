import app from '../app'
import { executeQuery } from '../database'

export const getAllDocumentos = async (req, res) => {
  try {
    const { grupo } = req.query
    if (grupo) {
      let documentos = []
      const query = `SELECT id_documento, documento, enlace, categoria, fecha FROM documentos, grupos WHERE documentos.id_grupo = grupos.id AND grupos.grupo = "${grupo}" ORDER BY fecha`
      const documentosGrupo = executeQuery(query).then((documentosGrupo) => {
        for (let i = 0; i < documentosGrupo.length; i++) {
          documentos.push(documentosGrupo[i])
        }

        const query2 = `SELECT id_documento, documento, enlace, categoria, fecha FROM documentos WHERE id_grupo = 0`
        const documentosTodoColegio = executeQuery(query2).then(
          (documentosColegio) => {
            for (let i = 0; i < documentosColegio.length; i++) {
              documentos.push(documentosColegio[i])
            }

            res.status(200).json(documentos)
          }
        )
      })
    } else {
      throw '400'
    }
  } catch (err) {
    if (err == '400') {
      res.status(400).json({ message: 'Faltan parámetros' })
    } else if (err == '404') {
      res.status(404).json({
        message: 'No se han encontrado documentos correspondientes a ese grupo',
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
