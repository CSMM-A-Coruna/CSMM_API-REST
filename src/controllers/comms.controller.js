import { executeQuery } from '../database'
import Comunicacion from '../models/Comunicacion'

export const getAllCommsReceived = async (req, res) => {
    try {
        if(req.query.id) {
            const query = `SELECT * FROM comunicaciones, comunicaciones_destinos WHERE comunicaciones_destinos.iddestino = ${req.query.id} HAVING comunicaciones_destinos.idcomunicacion = comunicaciones.idcomunicacion`
            const result = await executeQuery(query)
            if(result.length) {
                let comms = []
                for (let index = 0; index < result.length; index++) {
                    const com = new Comunicacion(
                        result[index].idcomunicacion, 
                        result[index].idremite, 
                        result[index].iddestino, 
                        result[index].tiporemite, 
                        result[index].tipodestino, 
                        result[index].asunto, 
                        result[index].texto, 
                        result[index].fecha
                    )
                    com.calcularTipoDestino(result[index].tipodestino)
                    com.calcularTipoRemite(result[index].tiporemite)
                    com.calcularNombreDestino().then(data => {
                        com.nombreDestino = data[0].nombre + ' ' + data[0].apellido1 + ' ' + data[0].apellido2
                        com.calcularNombreRemite().then(data2 => {
                            com.nombreRemite = data2[0].nombre + ' ' + data2[0].apellido1 + ' ' + data2[0].apellido2
                            comms.push(com)
                            if(!result[index+1]) {
                                res.status(200).json(comms)
                            }
                        })
                    })
                }
            } else {
                throw '404'
            }
        } else {
            throw '400'
        }
    } catch(err) {
        if(err=='400') {
            res.status(400).json({ message: 'Faltan parámetros' })
        } else if(err='404') {
            res.status(404).json({ message: 'No se han encontrado comunicaciones'})
        } else {
            res.status(500).json({ message: 'Error interno del servidor' })
        }
    }
}

export const getAllCommsSent = async (req, res) => {

}

export const sendCom = async (req, res) => {

}