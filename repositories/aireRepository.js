const conexionDB = require('../config/conexionDB');

class AireRepository {
  async guardarAire(aireData) {
    const connection = await conexionDB();

    const query = `
      INSERT INTO aire (
        nombre_ciudad, calidad_aire, co, no, no2, o3, so2, pm2_5, pm10, nh3
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    try {
      // Extraer valores del JSON recibido
      const nombre_ciudad = aireData.nombre_ciudad || 'Desconocido';
      const calidad_aire = aireData.data.list[0].main.aqi;
      const componentes = aireData.data.list[0].components;

      const values = [
        nombre_ciudad,
        calidad_aire,
        componentes.co,
        componentes.no,
        componentes.no2,
        componentes.o3,
        componentes.so2,
        componentes.pm2_5,
        componentes.pm10,
        componentes.nh3
      ];

      const [result] = await connection.query(query, values);
      return result;
    } catch (err) {
      console.error('Error al guardar los datos del aire:', err);
      throw err;
    } finally {
      await connection.end();
    }
  }
}

module.exports = AireRepository;
