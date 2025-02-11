// config/conexionDB.js
const mysql = require('mysql2/promise'); // Usa mysql2/promise

const conexionDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'api_express'
    });

    console.log('Conexión a la base de datos establecida');
    return connection; // Devuelve la conexión
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
    throw err; // Lanza el error para manejarlo en el repositorio
  }
};

module.exports = conexionDB; // Exporta la función para conectar a la base de datos