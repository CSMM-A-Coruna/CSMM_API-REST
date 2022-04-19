import { db } from '../database'
import bcrypt from 'bcryptjs'

class Usuario {
    constructor(json) {
        this.id = json.id || null
        this.usuario = json.usuario
        this.password = json.password
        this.nombre = json.nombre
        this.apellido1 = json.apellido1
        this.apellido2 = json.apellido2
        this.nacimiento = json.nacimiento || null
        this.dni = json.dni
        this.oa = json.oa
        this.ultimo = json.ultimo || null
        this.ip = json.ip
        this.navegador = json.navegador
        this.accesos = json.accesos
        this.tipoUsuario = json.tipoUsuario
    }

    static encryptPassword = async (password) => {
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt)
    }
      
    static comparePassword = async (password, receivedPassword) => {
        return await bcrypt.compare(password, receivedPassword)
    }

    static compareSyncPassword = (password, receivedPassword) => {
        return bcrypt.compareSync(password, receivedPassword)
    }

    crearUsuario = async () => {
        let query = `INSERT INTO ${this.tipoUsuario} (usuario, password, nombre, apellido1, apellido2, nacimiento, dni, oa, ultimo, ip, navegador, accesos) VALUES (?)`
        let values = [[this.usuario, this.password, this.nombre, this.apellido1, this.apellido2, 
                        this.nacimiento, this.dni, this.oa, this.ultimo, this.ip, this.navegador, this.accesos]]
        
        // Devolvemos true si la consulta fue ejecutada correctamente, devolvemos false en caso contrario
        db.query(query, values, function(err, result) {
            if(err) {
                throw err
            } else {
                console.log('Ok')
            }
        })
    }

    static calcularAlumnosAsociados = async (idUser) => {
        const query = `SELECT * FROM familias_alumnos WHERE idFamiliar = ${idUser}`
        return new Promise((resolve, reject) => {
            db.query(query, (error, results, fields) => {
                if(error) return reject(error)
                return resolve(results)
              })
          })
    }
}
  
export default Usuario;