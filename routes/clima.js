const { Router } = require('express')
const { getClimaActualPorCiudad, getClimaPorCoordenadasFiltrado, getClimaPorCiudadFiltrado } = require('../controllers/clima')
const climaController = require('../controllers/climaControllerDB')
const { validateApiKey } = require('../middleware/authMiddleware')

const rutas = Router()

// rutas para obtener datos climáticos desde la API
rutas.get('/ciudad', getClimaActualPorCiudad)
rutas.get('/coordenadas', getClimaPorCoordenadasFiltrado)
rutas.get('/ciudad/:ciudad', getClimaPorCiudadFiltrado)


// aplica el middleware de validación de API key a todas las rutas
rutas.use(validateApiKey);

// rutas para CRUD en la base de datos
rutas.get('/climaget', climaController.obtenerCiudades)
rutas.post('/climapost', climaController.crearCiudad)
rutas.put('/clima/favorito', climaController.marcarFavorito)
rutas.delete('/climadelete', climaController.eliminarCiudad)

module.exports = rutas