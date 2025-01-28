const express = require('express')
var cors = require('cors')

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT || 3000
    this.middleware()
    this.rutas()
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
      console.log(`La API esta escuchando en el this.PORT ${this.port}`)
    })
  }
}

module.exports = Server
