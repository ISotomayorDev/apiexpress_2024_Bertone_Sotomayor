const { Router } = require('express')
const rutas = Router()
const { getPolucionAire, getPolucionAireHistorica, getPolucionFutura } = require('../controllers/aire')

rutas.get('/polucion', getPolucionAire)
rutas.get('/polucionHistorica', getPolucionAireHistorica)
rutas.get('/polucionFutura', getPolucionFutura)

module.exports = rutas
