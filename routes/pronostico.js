const { Router } = require('express')
const { getClima5dias, getClima5diasPorCiudad, getClima5diasPorCodigoPostal } = require('../controllers/pronostico')
const rutas = Router()

rutas.get('/extendido', getClima5dias)
rutas.get('/extendidoPorCiudad/:ciudad', getClima5diasPorCiudad)
rutas.get('/extendidoPorCodigoPostal', getClima5diasPorCodigoPostal)

module.exports = rutas
