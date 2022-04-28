const { Ok } = require('@herbsjs/herbs');
const Database = require('../../config/database');
const PlanoEntity = require('../../domain/entities/Plano');

class PlanoRepository {
  constructor() {
    this.Database = Database;
  }

  buscarPlano(nome) {
    const plano = this.Database.planos.find((x) => x.nome === nome);
    return Ok(PlanoEntity.toJSON(plano));
  }
}

module.exports = PlanoRepository;
