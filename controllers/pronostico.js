const axios = require('axios')

const getClima5dias = async (req, res) => {
  const { lat, lon, units = 'metric', lang = 'sp' } = req.query

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude (lat) y Longitud (lon) son necesarias.' })
  }

  axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=${units}&lang=${lang}`)
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
        return res.status(error.response.status).json({
          status: 'error',
          msg: 'Error al obtener datos del clima',
          error: error.response.data.message || error.response.statusText,
          statusCode: error.response.status
        })
      } else {
        res.status(500).json({
          status: 'error',
          msg: 'Error inesperado al obtener la información',
          error: error.message,
          statusCode: 500
        })
      }
    })
}

const getClima5diasPorCiudad = async (req, res) => {
  const { units = 'metric', lang = 'sp' } = req.query
  const { ciudad } = req.params

  if (!ciudad) {
    return res.status(400).json({ error: 'Ingrese la ciudad para poder continuar' })
  }

  axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=${process.env.API_KEY}&lang=${lang}&units=${units}`)
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
        return res.status(error.response.status).json({
          status: 'error',
          msg: 'Error al obtener datos del clima',
          error: error.response.data.message || error.response.statusText,
          statusCode: error.response.status
        })
      } else {
        res.status(500).json({
          status: 'error',
          msg: 'Error inesperado al obtener la información',
          error: error.message,
          statusCode: 500
        })
      }
    })
}

const getClima5diasPorCodigoPostal = async (req, res) => {
  const { zip, country = 'AR', units = 'metric', lang = 'sp' } = req.query

  if (!zip) {
    return res.status(400).json({ error: 'Ingrese el codigo postal para poder continuar' })
  }

  axios.get(`https://api.openweathermap.org/data/2.5/forecast?zip=${zip},${country}&appid=${process.env.API_KEY}&lang=${lang}&units=${units}`)
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
        return res.status(error.response.status).json({
          status: 'error',
          msg: 'Error al obtener datos del clima',
          error: error.response.data.message || error.response.statusText,
          statusCode: error.response.status
        })
      } else {
        res.status(500).json({
          status: 'error',
          msg: 'Error inesperado al obtener la información',
          error: error.message,
          statusCode: 500
        })
      }
    })
}

module.exports = { getClima5dias, getClima5diasPorCiudad, getClima5diasPorCodigoPostal }
