import { executeQuery } from '../database'
import Comunicacion from '../models/Comunicacion'
import NuevaComunicacion from '../models/NuevaComunicacion'

export const getAllCommsReceived = async (req, res) => {
    try {
        if(req.query.user_id) {
            const query = `SELECT *, nombreRemite(comunicaciones_generales.tiporemite, comunicaciones_generales.idremite) AS nombreRemite, nombreDestino(comunicaciones_generales.tipodestino, comunicaciones_generales.iddestino) AS nombreDestino
                            FROM comunicaciones_generales
                            WHERE tipodestino = 2 AND iddestino = ${req.query.user_id} AND comunicaciones_generales.eliminado IS NULL ORDER BY comunicaciones_generales.fecha DESC`
            const result = await executeQuery(query)
            if(result.length) {
                let comms = []
                for (let index = 0; index < result.length; index++) {
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
                        result[index].nombreDestino
                    )
                    com.calcularTipoDestino(result[index].tipodestino)
                    com.calcularTipoRemite(result[index].tiporemite)
                    comms.push(com)
                    if(!result[index+1]) {
                        res.status(200).json(comms)
                    }
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
            res.status(404).json({ message: 'No se han encontrado comunicaciones recibidas'})
        } else {
            res.status(500).json({ message: 'Error interno del servidor' })
        }
    }
}

export const getAllCommsSent = async (req, res) => {
    try {
        if(req.query.user_id) {
            const query = `SELECT * FROM comunicaciones_generales WHERE tiporemite = 2 AND idremite = ${req.query.user_id} AND comunicaciones_generales.eliminado IS NULL ORDER BY comunicaciones_generales.fecha DESC`
            const result = await executeQuery(query)
            if(result.length) {
                let comms = []
                for (let index = 0; index < result.length; index++) {
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
                        result[index].alumnoAsociado
                    )
                    com.calcularTipoDestino(result[index].tipodestino)
                    com.calcularTipoRemite(result[index].tiporemite)
                    com.calcularNombreDestino().then(data => {
                        com.nombre_destino = data[0].nombre + ' ' + data[0].apellido1 + ' ' + data[0].apellido2
                        com.calcularNombreRemite().then(data2 => {
                            com.nombre_remite = data2[0].nombre + ' ' + data2[0].apellido1 + ' ' + data2[0].apellido2
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
        if(err=='404') {
            res.status(404).json({ message: 'No hay comunicaciones enviadas asociadas a este usuario' })
        } else if(err=='400') {
            res.status(400).json({ message: 'Faltan parámetros' })
        } else {
            res.status(500).json({ message: 'Error interno del servidor' })
        }
    }
}

export const getAllCommsDeleted = async (req, res) => {
    try {
        if(req.query.user_id) {
            const query = `SELECT * FROM comunicaciones_generales WHERE tipodestino = 2 AND iddestino = ${req.query.user_id} AND comunicaciones_generales.eliminado IS NOT NULL ORDER BY comunicaciones_generales.fecha DESC`
            const result = await executeQuery(query)
            let comms = []
            if(result.length) {
                for (let index = 0; index < result.length; index++) {
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
                        result[index].alumnoAsociado
                    )
                    com.calcularTipoDestino(result[index].tipodestino)
                    com.calcularTipoRemite(result[index].tiporemite)
                    com.calcularNombreDestino().then(data => {
                        com.nombre_destino = data[0].nombre + ' ' + data[0].apellido1 + ' ' + data[0].apellido2
                        com.calcularNombreRemite().then(data2 => {
                            com.nombre_remite = data2[0].nombre + ' ' + data2[0].apellido1 + ' ' + data2[0].apellido2
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
            res.status(404).json({ message: 'No se han encontrado comunicaciones recibidas'})
        } else {
            res.status(500).json({ message: 'Error interno del servidor' })
        }
    }
}

export const updateCom = async (req, res) => {
    try {
        if(req.query.state && req.query.id_com && req.query.id_destino) {
            switch(req.query.state) {
                case 'importante':
                    const query = `UPDATE comunicaciones_destinos SET importante = 1 WHERE comunicaciones_destinos.idcomunicacion = ${req.query.id_com} AND comunicaciones_destinos.iddestino = ${req.query.id_destino} AND comunicaciones_destinos.tipodestino = 2`
                    const result = await executeQuery(query)
                    if(result.changedRows == 1) {
                        res.status(200).json({ message: 'Estado de la comunicación actualizado' })
                    } else if (result.affectedRows == 0){
                        throw '409'
                    } else if (result.affectedRows == 1 && result.changedRows == 0) {
                        throw '409'
                    } else {
                        throw '500'
                    }
                    break
                case 'no_importante':
                    const query1 = `UPDATE comunicaciones_destinos SET importante = 0 WHERE comunicaciones_destinos.idcomunicacion = ${req.query.id_com} AND comunicaciones_destinos.iddestino = ${req.query.id_destino} AND comunicaciones_destinos.tipodestino = 2`
                    const result1 = await executeQuery(query1)
                    if(result1.changedRows == 1) {
                        res.status(200).json({ message: 'Estado de la comunicación actualizado' })
                    } else if (result1.affectedRows == 0){
                        throw '404'
                    } else if (result1.affectedRows == 1 && result1.changedRows == 0) {
                        throw '409'
                    } else {
                        throw '500'
                    }
                    break
                case 'leida':
                    const currentDate = new Date()
                    const date = currentDate.toISOString();
                    const query2 = `UPDATE comunicaciones_destinos SET leida = "${date}" WHERE comunicaciones_destinos.idcomunicacion = ${req.query.id_com} AND comunicaciones_destinos.iddestino = ${req.query.id_destino} AND comunicaciones_destinos.tipodestino = 2`
                    const result2 = await executeQuery(query2)
                    if(result2.changedRows == 1) {
                        res.status(200).json({ message: 'Estado de la comunicación actualizado' })
                    } else if (result2.affectedRows == 0){
                        throw '404'
                    } else if (result2.affectedRows == 1 && result2.changedRows == 0) {
                        throw '409'
                    } else {
                        throw '500'
                    }
                    break
                case 'eliminado':
                    const currentDate2 = new Date()
                    const date2 = currentDate2.toISOString();
                    const query3 = `UPDATE comunicaciones_destinos SET eliminado = "${date2}" WHERE comunicaciones_destinos.idcomunicacion = ${req.query.id_com} AND comunicaciones_destinos.iddestino = ${req.query.id_destino} AND comunicaciones_destinos.tipodestino = 2`
                    const result3 = await executeQuery(query3)
                    if(result3.changedRows == 1) {
                        res.status(200).json({ message: 'Estado de la comunicación actualizado' })
                    } else if (result3.affectedRows == 0){
                        throw '404'
                    } else if (result3.affectedRows == 1 && result3.changedRows == 0) {
                        throw '409'
                    } else {
                        throw '500'
                    }
                    break
                case 'restaurar':
                    const query4 = `UPDATE comunicaciones_destinos SET eliminado = NULL WHERE comunicaciones_destinos.idcomunicacion = ${req.query.id_com} AND comunicaciones_destinos.iddestino = ${req.query.id_destino} AND comunicaciones_destinos.tipodestino = 2`
                    const result4 = await executeQuery(query4)
                    if(result4.changedRows == 1) {
                        res.status(200).json({ message: 'Estado de la comunicación actualizado'})
                    } else if (result4.affectedRows == 0) {
                        throw '404'
                    } else if (result4.affectedRows == 1 && result4.changedRows == 0) {
                        throw '409'
                    } else {
                        throw '500'
                    }
            }
        } else {
            throw '400'
        }
    } catch(err) {
        if(err=='404') {
            res.status(404).json({ message: 'No se ha encontrado una comunicación con ese ID'})
        } else if(err=='400') {
            res.status(400).json({ message: 'Faltan parámetros' })
        } else if(err=='409') {
            res.status(409).send()
        } else {
            res.status(500).json({ message: 'Error interno del servidor' })
        }
    }
}

export const sendCom = async (req, res) => {
    try {
        if(req.body.asunto && req.body.texto && req.body.id_remite && req.body.tipo_destino && req.body.id_destino && req.body.id_alumnoAsociado) {
            const com = new NuevaComunicacion(
                req.body.asunto,
                req.body.texto,
                req.body.id_remite,
                req.body.tipo_destino,
                req.body.id_destino,
                req.body.id_alumnoAsociado
            )
            const query = `INSERT INTO comunicaciones (tiporemite, idremite, fecha, asunto, texto) VALUES (${com.tipoRemite}, ${com.idRemite}, "${com.fecha}", "${com.asunto}", "${com.texto}");`
            const result = executeQuery(query).then(data => {
                if(data.message == '') {
                    const query2 = `INSERT INTO comunicaciones_destinos (idcomunicacion, tipodestino, iddestino, leida, eliminado, email, idAlumnoAsociado, importante) VALUES (${data.insertId}, ${com.tipoDestino}, ${com.idDestino}, ${com.leida}, ${com.eliminado}, ${com.email}, ${com.idAlumnoAsociado}, ${com.importante});`
                    const result2 = executeQuery(query2).then(data2 => {
                        if(data2.message == '') {
                            res.status(200).json({ message: 'Comunicación enviada con éxito'})
                        }
                    })
                } else {
                    throw '500'
                }
            })
        } else {
            throw '400'
        }
    } catch(err) {
        if(err=='400') {
            res.status(400).json({ message: 'Faltan parámetros' })
        } else if(err=='409') {
            res.status(409).send()
        } else {
            res.status(500).json({ message: 'Error interno del servidor' })
        }
    }
}