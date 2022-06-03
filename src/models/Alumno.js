class Alumno {
  constructor(id, nombre, apellido1, apellido2, grupo) {
    ;(this.id = id),
      (this.nombre = `${nombre} ${apellido1} ${apellido2}`),
      (this.grupo = grupo)
  }
}

export default Alumno
