const database = require('../../config/database')

const TarifaEntity = require('../../domain/entities/Tarifa')

class TarifaRepository {
  async CalcularPrecoChamada(country) {
    try {
         
       //Aqui eu faço o cálculo da chamada ? 

    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = TarifaRepository
