require("dotenv/config")
const express = require('express')
const cors = require('cors')
const Swagger = require('./swagger')
const tariffaRoute = require('./routes/tariffaRoute')

class App {
  constructor() {
    this.server = express()

    this.middlewares()
    this.router()
  }

  middlewares() {
    this.server.use(express.json())
    this.server.use(cors())
  }

  router() {
    const swagger = new Swagger()
    this.server.use(swagger.GetSwaggerRoutes())
    this.server.use(tariffaRoute)
  }
}

module.exports = App
