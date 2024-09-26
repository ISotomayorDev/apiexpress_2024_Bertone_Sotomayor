const axios = require('axios')

const getCoordenadasDeCiudad = async (req, res) => {
  const { q, units = 'metric', lang = 'sp' } = req.query

  if (!q) {
    return res.status(400).json({
      msg: 'Se requiere el nombre de la ciudad'
    })
  }

  axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${process.env.API_KEY}&units=${units}&lang=${lang}`)
    .then((response) => {
      const { name, lat, lon, country, state } = response.data[0]
      const filtro = {
        ciudad: name,
        latitud: lat,
        longitud: lon,
        estado: state,
        pais: country
      }
      res.status(200).json({
        msg: 'Ok',
        filtro
      })
    })
    .catch((error) => {
      console.error(error)
      if (error.response) {
        res.status(error.response.status).json({
          status: 'error',
          msg: 'Error al obtener datos de la ciudad',
          error: error.response.data.message || error.response.statusText
        })
      } else {
        res.status(500).json({
          status: 'error',
          msg: 'Error inesperado al obtener la información',
          error: error.message
        })
      }
    })
}
const getCoordenadasPorCodigoPostal = async (req, res) => {
  const { zip, countryCode = 'AR', units = 'metric', lang = 'sp' } = req.query

  if (!zip) {
    return res.status(400).json({
      msg: 'Se requiere el codigo postal'
    })
  }

  axios.get(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${countryCode}&appid=${process.env.API_KEY}&units=${units}&lang=${lang}`)
    .then((response) => {
      const { data } = response

      res.status(200).json({
        msg: 'Ok',
        data
      })
    })
    .catch((error) => {
      console.error(error)
      if (error.response) {
        res.status(error.response.status).json({
          status: 'error',
          msg: 'Error al obtener datos de la ciudad',
          error: error.response.data.message || error.response.statusText
        })
      } else {
        res.status(500).json({
          status: 'error',
          msg: 'Error inesperado al obtener la información',
          error: error.message
        })
      }
    })
}

const getCiudadPorCoordenadas = async (req, res) => {
  const { lon, lat, units = 'metric', lang = 'sp' } = req.query

  if (!lon || !lat) {
    return res.status(400).json({
      msg: 'Se requiere la latitud y la longitud'
    })
  }

  axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=${units}&lang=${lang}`)
    .then((response) => {
      const { name, lat, lon, country, state } = response.data[0]
      const filtro = {
        ciudad: name,
        latitud: lat,
        longitud: lon,
        estado: state,
        pais: country
      }
      res.status(200).json({
        msg: 'Ok',
        filtro
      })
    })
    .catch((error) => {
      console.error(error)
      if (error.response) {
        res.status(error.response.status).json({
          status: 'error',
          msg: 'Error al obtener datos de la ciudad',
          error: error.response.data.message || error.response.statusText
        })
      } else {
        res.status(500).json({
          status: 'error',
          msg: 'Error inesperado al obtener la información',
          error: error.message
        })
      }
    })
}

module.exports = { getCoordenadasDeCiudad, getCoordenadasPorCodigoPostal, getCiudadPorCoordenadas }
