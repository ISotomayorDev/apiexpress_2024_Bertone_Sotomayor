// config/conexionDB.js
const mysql = require('mysql2')

const conexionDB = () => {
  return new Promise((resolve, reject) => {
    // Configura la conexión a la base de datos
    const connection = mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'api_express'
    })

    // Intenta conectar a la base de datos
    connection.connect((err) => {
      if (err) {
        reject(err) // Rechaza la promesa si hay un error
      } else {
        resolve(connection) // Resuelve la promesa con la conexión
      }
    })
  })
}

module.exports = conexionDB // Exporta la función para conectar a la base de datos
