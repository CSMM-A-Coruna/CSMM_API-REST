import { db } from '../database'
import bcrypt from 'bcryptjs'

class Alumno {
  constructor(id, nombre, apellido1, apellido2, relacion) {
    ;(this.id = id),
      (this.nombre = `${nombre} ${apellido1} ${apellido2}`),
      (this.relacion = relacion)
  }
}

export default Alumno
