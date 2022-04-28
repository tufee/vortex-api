const { Ok } = require('@herbsjs/herbs');
const Database = require('../../config/database');

const TarifaEntity = require('../../domain/entities/Tarifa');

class TarifaRepository {
  constructor() {
    this.Database = Database;
  }

  buscarTarifa(origem, destino) {
    const tarifa = this.Database.tarifas.find(
      (x) => x.origem === origem && x.destino === destino
    );
    return Ok(TarifaEntity.fromJSON(tarifa));
  }
}

module.exports = TarifaRepository;
