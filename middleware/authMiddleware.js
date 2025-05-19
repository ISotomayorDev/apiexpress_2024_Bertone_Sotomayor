require('dotenv').config();

/**
 * validacion de apikey
 */
const validateApiKey = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    console.log('API key no proporcionada');
    return res.status(401).json({ error: 'API key no proporcionada' });
  }

  const [bearer, apiKey] = authHeader.split(' ');
  
  if (bearer !== 'Bearer' || !apiKey) {
    console.log('Formato de autorización inválido');
    return res.status(401).json({ error: 'Formato de autorización inválido' });
  }
  
  // verifica si la API key es válida
  const validApiKey = process.env.API_KEY;
  
  if (!validApiKey) {
    console.error('API_KEY no configurada en las variables de entorno');
    return res.status(500).json({ error: 'Error en la configuración del servidor' });
  }
  
  if (apiKey !== validApiKey) {
    console.log(`❌ API key inválida: ${apiKey}`);
    return res.status(403).json({ error: 'API key inválida' });
  }
  
  // si todo está bien, continua con la siguiente función
  console.log('API key validada correctamente');
  next();
};

module.exports = { validateApiKey };