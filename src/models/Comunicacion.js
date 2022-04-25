import { db, executeQuery } from '../database'

class Comunicacion {
  constructor(
    id_comunicacion,
    id_remite,
    id_destino,
    id_alumnoAsociado,
    asunto,
    texto,
    importante,
    fecha,
    leida,
    eliminado,
    estado,
    nombre_alumnoAsociado,
    nombre_remite,
    nombre_destino,
    adjuntos
  ) {
    ;(this.id_comunicacion = id_comunicacion),
      (this.id_remite = id_remite),
      (this.id_destino = id_destino),
      (this.tipo_remite = null),
      (this.tipo_destino = null),
      (this.id_alumnoAsociado = id_alumnoAsociado),
      (this.asunto = asunto),
      (this.texto = texto),
      (this.importante = importante),
      (this.fecha = fecha),
      (this.leida = leida),
      (this.eliminado = eliminado),
      (this.estado = estado),
      (this.nombre_alumnoAsociado = nombre_alumnoAsociado),
      (this.nombre_remite = nombre_remite),
      (this.nombre_destino = nombre_destino),
      (this.adjuntos = adjuntos)
  }

  // Calculamos el tipo de remite y destino según el número (1 = alumnos, 2 = familias, 3 = profesores)
  calcularTipoRemite(tipo) {
    const tipos = ['', 'alumnos', 'familias', 'profesores']
    this.tipo_remite = tipos[tipo]
  }

  calcularTipoDestino(tipo) {
    const tipos = ['', 'alumnos', 'familias', 'profesores']
    this.tipo_destino = tipos[tipo]
  }

  calcularNombreRemite() {
    const query = `SELECT * FROM ${this.tipo_remite} WHERE id = ${this.id_remite}`
    return new Promise((resolve, reject) => {
      db.query(query, (error, results, fields) => {
        if (error) return reject(error)
        return resolve(results)
      })
    })
  }

  calcularNombreDestino() {
    const query = `SELECT * FROM ${this.tipo_destino} WHERE id = ${this.id_destino}`
    return new Promise((resolve, reject) => {
      db.query(query, (error, results, fields) => {
        if (error) return reject(error)
        return resolve(results)
      })
    })
  }
}

export default Comunicacion
