// models/server.js
const express = require('express')
const cors = require('cors')
const conexionDB = require('../config/conexionDB') // Importa la función de conexión

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT || 3000
    // Conectar a la base de datos antes de configurar middlewares y rutas
    this.conectarDB()
    this.middleware()
    this.rutas()
  }

  // Método para conectar a la base de datos
  async conectarDB () {
    try {
      const connection = await conexionDB() // Intenta conectar a la base de datos
      console.log('Conectado a la base de datos MySQL: api_express')
      this.connection = connection // Guarda la conexión en la instancia del servidor (opcional)
    } catch (err) {
      console.error('Error conectando a la base de datos:', err)
      process.exit(1) // Termina el proceso con un código de error
    }
  }

  middleware () {
    this.app.use(cors())
    this.app.use(express.static('public'))
  }

  rutas () {
    this.app.use('/api/v1/clima', require('../routes/clima'))
    this.app.use('/api/v1/geocoding', require('../routes/geocoding'))
    this.app.use('/api/v1/aire', require('../routes/aire'))
    this.app.use('/api/v1/pronostico', require('../routes/pronostico'))
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log(`La API está escuchando en el puerto ${this.port}`)
    })
  }
}

module.exports = Server
