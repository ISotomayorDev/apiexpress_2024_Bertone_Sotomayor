const { Router } = require('express')
const { getCoordenadasDeCiudad, getCoordenadasPorCodigoPostal, getCiudadPorCoordenadas } = require('../controllers/geocoding')
const rutas = Router()

rutas.get('/ciudad', getCoordenadasDeCiudad)
rutas.get('/codigoPostal', getCoordenadasPorCodigoPostal)
rutas.get('/coordenadas', getCiudadPorCoordenadas)
module.exports = rutas
