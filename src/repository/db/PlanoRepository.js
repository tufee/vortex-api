const database = require('../../config/database')

const PlanoEntity = require('../../domain/entities/Plano')

class PlanoRepository {
  async BuscarPlano(nome) {
    try {

      return database.planos.filter(x => x.nome == nome);

    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = PlanoRepository
