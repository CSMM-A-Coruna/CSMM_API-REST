import { db, executeQuery } from '../database'

class Comunicacion {
    constructor(idComunicacion, idRemite, idDestino, tipoRemite, tipoDestino, asunto, texto, fecha) {
        this.idComunicacion = idComunicacion
        this.idRemite = idRemite,
        this.idDestino = idDestino,
        this.tipoRemite = null,
        this.tipoDestino = null,
        this.asunto = asunto,
        this.texto = texto,
        this.fecha = fecha,
        this.nombreRemite = null,
        this.nombreDestino = null
    }
    

    // Calculamos el tipo de remite y destino según el número (1 = alumnos, 2 = familias, 3 = profesores)
    calcularTipoRemite(tipo) {
        const tipos = ['', 'alumnos', 'familias', 'profesores']
        this.tipoRemite = tipos[tipo]
    }

    calcularTipoDestino(tipo) {
        const tipos = ['', 'alumnos', 'familias', 'profesores']
        this.tipoDestino = tipos[tipo]
    }

    calcularNombreRemite() {
        const query = `SELECT * FROM ${this.tipoRemite} WHERE id = ${this.idDestino}`
        return new Promise((resolve, reject) => {
            db.query(query, (error, results, fields) => {
                if(error) return reject(error)
                return resolve(results)
              })
          })
    }

    calcularNombreDestino() {
        const query = `SELECT * FROM ${this.tipoDestino} WHERE id = ${this.idDestino}`
        return new Promise((resolve, reject) => {
            db.query(query, (error, results, fields) => {
                if(error) return reject(error)
                return resolve(results)
              })
          })
    }
} 

export default Comunicacion;