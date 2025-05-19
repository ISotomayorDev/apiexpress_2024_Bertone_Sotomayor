const { Router } = require('express');
const { getPolucionAire, getPolucionAireHistorica, getPolucionFutura } = require('../controllers/aire');
const aireController = require('../controllers/aireControllerDB');
const { validateApiKey } = require('../middleware/authMiddleware');

const rutas = Router();

// rutas para obtener datos climáticos desde la API
rutas.get('/polucion', getPolucionAire)
rutas.get('/polucionHistorica', getPolucionAireHistorica)
rutas.get('/polucionFutura', getPolucionFutura)


// aplica el middleware de validación de API key a todas las rutas
rutas.use(validateApiKey);

// rutas para CRUD en la base de datos
rutas.get('/aireget', aireController.obtenerRegistrosAire);
rutas.post('/airepost', aireController.crearRegistroAire);
rutas.put('/aire/peligroso', aireController.marcarPeligroso);
rutas.delete('/airedelete', aireController.eliminarRegistroAire);

module.exports = rutas;