const conexionDB = require('../config/conexionDB'); // Importa la función de conexión

class PronosticoRepository {
    async guardarPronosticos(pronosticos) {
        const connection = await conexionDB(); // Establece la conexión
      
        try {
          if (pronosticos.length === 0) return; // Evita ejecutar una consulta vacía
      
          const queryBase = `
            INSERT INTO pronostico (
              nombre_ciudad, fecha, temperatura, descripcion, icono, humedad, viento, sensacion_termica
            ) VALUES 
          `;
      
          const values = [];
          const placeholders = pronosticos.map(() => "(?, ?, ?, ?, ?, ?, ?, ?)").join(", ");
      
          pronosticos.forEach(pronostico => {
            values.push(
              pronostico.nombre_ciudad,
              pronostico.fecha,
              pronostico.temperatura,
              pronostico.descripcion,
              pronostico.icono,
              pronostico.humedad,
              pronostico.viento,
              pronostico.sensacion_termica
            );
          });
      
          const query = queryBase + placeholders;
          await connection.query(query, values); // Ejecuta una sola consulta con todos los datos
        } catch (err) {
          console.error('Error al guardar los datos del pronóstico:', err);
          throw err;
        } finally {
          await connection.end(); // Cierra la conexión después de usarla
        }
      }
}
module.exports = PronosticoRepository; // Exporta la clase para usarla en el controlador