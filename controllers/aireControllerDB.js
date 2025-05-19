const db = require('../config/conexionDB')

// get
const obtenerRegistrosAire = (req, res) => {
  console.log('🟢 obtenerRegistrosAire fue llamado')
  db.all('SELECT * FROM aire', (err, results) => {
    if (err) {
      console.error('❌ Error en la consulta:', err)
      return res.status(500).json({ error: 'Error al obtener los registros de aire' })
    }
    res.status(200).json(results)
  })
}

// post
const crearRegistroAire = (req, res) => {
  console.log('🟢 crearRegistroAire fue llamado con datos:', req.body)

  try {
    const {
      nombreCiudad,
      calidadAire,
      co,
      no,
      no2,
      o3,
      so2,
      // Renombramos pm2_5 a pm25 o particulasFinas
      pm2_5: particulasFinas, // Aquí renombramos la variable al destructurar
      pm10,
      nh3
    } = req.body

    // validacion completa de los datos de entrada
    if (!nombreCiudad || nombreCiudad.trim() === '') {
      return res.status(400).json({ error: 'El campo nombreCiudad es obligatorio' })
    }

    // convertir y validar valores numéricos
    const calidadAireNum = Number(calidadAire)
    const coNum = Number(co)
    const noNum = Number(no)
    const no2Num = Number(no2)
    const o3Num = Number(o3)
    const so2Num = Number(so2)
    // Cambiamos pm2_5Num a particulasFinasNum
    const particulasFinasNum = Number(particulasFinas)
    const pm10Num = Number(pm10)
    const nh3Num = Number(nh3)

    if (isNaN(calidadAireNum) || calidadAireNum < 1 || calidadAireNum > 5) {
      return res.status(400).json({ error: 'calidadAire debe ser un número entre 1 y 5' })
    }

    if (isNaN(coNum) || isNaN(noNum) || isNaN(no2Num) || isNaN(o3Num) ||
        isNaN(so2Num) || isNaN(particulasFinasNum) || isNaN(pm10Num) || isNaN(nh3Num)) {
      return res.status(400).json({ error: 'Todos los valores de contaminantes deben ser números válidos' })
    }

    // obtiene la conexión a la base de datos
    const db = require('../config/conexionDB')

    // SQL para insertar un nuevo registro
    // no incluimos fecha ni es_peligroso, ya que tienen valores por defecto
    const sql = `
      INSERT INTO aire (
        nombre_ciudad, calidad_aire, co, no, no2, o3, so2, pm2_5, pm10, nh3
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

    db.run(
      sql,
      [
        nombreCiudad,
        calidadAireNum,
        coNum,
        noNum,
        no2Num,
        o3Num,
        so2Num,
        particulasFinasNum, // Usamos el nuevo nombre de variable aquí
        pm10Num,
        nh3Num
      ],
      function (err) {
        if (err) {
          console.error('❌ Error al crear el registro de aire:', err)
          return res.status(500).json({
            error: 'Error al crear el registro de aire',
            details: err.message
          })
        }

        // obtiene la fecha que se generó automáticamente
        db.get('SELECT fecha FROM aire WHERE id = ?', [this.lastID], (err, row) => {
          if (err) {
            console.error('❌ Error al obtener la fecha del nuevo registro:', err)
            return res.status(201).json({
              message: 'Registro de aire creado correctamente',
              id: this.lastID
            })
          }

          console.log('✅ Registro creado correctamente con ID:', this.lastID)
          res.status(201).json({
            message: 'Registro de aire creado correctamente',
            id: this.lastID,
            fecha: row ? row.fecha : null
          })
        })
      }
    )
  } catch (error) {
    console.error('❌ Error general:', error)
    res.status(500).json({
      error: 'Error interno del servidor',
      details: error.message
    })
  }
}

// put
const marcarPeligroso = (req, res) => {
  console.log('🟢 marcarPeligroso fue llamado con datos:', req.body)
  const { nombreCiudad } = req.body

  if (!nombreCiudad) {
    return res.status(400).json({ error: 'El nombre de la ciudad es obligatorio' })
  }

  // obtiene el estado actual del registro si existe
  const sqlSelect = 'SELECT es_peligroso FROM aire WHERE nombre_ciudad = ?'

  db.get(sqlSelect, [nombreCiudad], (err, row) => {
    if (err) {
      console.error('❌ Error al obtener el estado del registro de aire:', err)
      return res.status(500).json({ error: 'Error al obtener el estado del registro de aire' })
    }

    if (!row) {
      return res.status(404).json({ error: 'Ciudad no encontrada' })
    }

    const nuevoEstado = row.es_peligroso ? 0 : 1
    const sqlUpdate = 'UPDATE aire SET es_peligroso = ? WHERE nombre_ciudad = ?'

    db.run(sqlUpdate, [nuevoEstado, nombreCiudad], function (err) {
      if (err) {
        console.error('❌ Error al actualizar el estado del registro de aire:', err)
        return res.status(500).json({ error: 'Error al actualizar el estado del registro de aire' })
      }

      const mensaje = nuevoEstado
        ? `Registro de aire en ${nombreCiudad} marcado como peligroso`
        : `Registro de aire en ${nombreCiudad} desmarcado como peligroso`

      res.status(200).json({ message: mensaje })
    })
  })
}

// delete
const eliminarRegistroAire = (req, res) => {
  console.log('🟢 eliminarRegistroAire fue llamado con datos:', req.body)
  const { nombreCiudad } = req.body

  if (!nombreCiudad) {
    return res.status(400).json({ error: 'El nombre de la ciudad es obligatorio' })
  }

  const sql = 'DELETE FROM aire WHERE nombre_ciudad = ?'

  db.run(sql, [nombreCiudad], function (err) {
    if (err) {
      console.error('❌ Error al eliminar el registro de aire:', err)
      return res.status(500).json({ error: 'Error al eliminar el registro de aire' })
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Ciudad no encontrada' })
    }

    res.status(200).json({ message: `Registro de aire en ${nombreCiudad} eliminado` })
  })
}

module.exports = {
  obtenerRegistrosAire,
  crearRegistroAire,
  marcarPeligroso,
  eliminarRegistroAire
}
