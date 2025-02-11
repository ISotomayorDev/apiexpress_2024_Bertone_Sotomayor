// repositories/ClimaRepository.js
const conexionDB = require('../config/conexionDB') // Importa la función de conexión

class ClimaRepository {
  async guardarClima (climaData) {
    const connection = await conexionDB() // Establece la conexión

    const query = `
      INSERT INTO clima (
        nombre_ciudad, descripcion, temperatura, temp_minima, temp_maxima,
        sensacion_termica, humedad, viento, icono
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    const values = [
      climaData.nombre_ciudad,
      climaData.descripcion,
      climaData.temperatura,
      climaData.temp_minima,
      climaData.temp_maxima,
      climaData.sensacion_termica,
      climaData.humedad,
      climaData.viento,
      climaData.icono
    ]

    try {
      const [result] = await connection.query(query, values)
      return result
    } catch (err) {
      console.error('Error al guardar los datos del clima:', err)
      throw err // Lanza el error para manejarlo en el controlador
    } finally {
      await connection.end() // Cierra la conexión después de usarla
    }
  }
}

module.exports = ClimaRepository // Exporta la clase para usarla en el controlador
