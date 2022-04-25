class NuevaComunicacion {
  constructor(
    asunto,
    texto,
    idRemite,
    tipoDestino,
    idDestino,
    idAlumnoAsociado
  ) {
    ;(this.asunto = asunto),
      (this.texto = texto),
      (this.fecha = new Date().toISOString()),
      (this.idRemite = idRemite),
      (this.tipoRemite = 2),
      (this.tipoDestino = tipoDestino),
      (this.idDestino = idDestino),
      (this.leida = null),
      (this.eliminado = null),
      (this.email = 1),
      (this.idAlumnoAsociado = idAlumnoAsociado)
    this.importante = 0
  }
}

export default NuevaComunicacion
