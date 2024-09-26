const { Router } = require('express')
const { getClimaActualPorCiudad, getClimaPorCoordenadasFiltrado, getClimaPorCiudadFiltrado } = require('../controllers/clima')
const rutas = Router()

rutas.get('/ciudad', getClimaActualPorCiudad)
rutas.get('/coordenadas', getClimaPorCoordenadasFiltrado)
rutas.get('/ciudad/:ciudad', getClimaPorCiudadFiltrado)

module.exports = rutas
