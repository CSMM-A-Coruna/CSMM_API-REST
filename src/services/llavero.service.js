import { executeQuery } from '../database'

export const getLlaveroByIdAlumno = async (idAlumno) => {
  const llavero = await executeQuery(
    `SELECT * FROM llavero WHERE id_alumno = ${idAlumno}`
  )
  if (llavero.length) {
    return llavero
  } else {
    return '404'
  }
}

export const createNewLlavero = async (
  idAlumno,
  aplicacion,
  usuario,
  email,
  contrasena
) => {
  const query = `INSERT INTO llavero (id_alumno, aplicacion, usuario, email, contraseña, modificable) VALUES (${idAlumno}, ${aplicacion}, "${usuario}", "${email}", "${contrasena}", 1);`
  const result = await executeQuery(query)
  if (result.message !== '') {
    return '500'
  }
}

export const getLlaveroById = async (idLlavero) => {
  const llavero = await executeQuery(
    `SELECT * FROM llavero WHERE id = ${idLlavero}`
  )
  if (llavero.length) {
    if (llavero[0].modificable === 1) {
      return llavero
    } else {
      return '401'
    }
  } else {
    return '404'
  }
}

export const actualizarLlavero = async (id, body) => {
  const { aplicacion, usuario, email, contraseña } = body
  if (aplicacion != null) {
    await executeQuery(
        `UPDATE llavero SET aplicacion = "${aplicacion}" WHERE id = ${id}`
    );
  }
  if (usuario != null) {
    await executeQuery(
        `UPDATE llavero SET usuario = "${usuario}" WHERE id = ${id}`
    );
  }
  if (email != null) {
    await executeQuery(
        `UPDATE llavero SET email = "${email}" WHERE id = ${id}`
    );
  }
  if (contraseña != null) {
    await executeQuery(
        `UPDATE llavero SET contraseña = "${contraseña}" WHERE id = ${id}`
    );
  }
}
