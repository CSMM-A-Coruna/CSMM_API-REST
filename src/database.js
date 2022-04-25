import mysql from 'mysql'
import config from './config'

export const db = mysql.createConnection({
  host: config.dbHost,
  port: 3306,
  user: 'csmm_gestor',
  password: config.dbPassword,
  database: config.dbDatabase,
})

// Iniciamos base de datos
db.connect(function (err) {
  if (err) {
    console.log(err)
  }
})

export const executeQuery = (query) => {
  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
      if (error) return reject(error)
      return resolve(results)
    })
  })
}
