const { Ok } = require('@herbsjs/herbs');
const Database = require('../../config/database');

const TarifaEntity = require('../../domain/entities/Tarifa');

class TarifaRepository {
  constructor() {
    this.Database = Database;
  }

  buscarDDD(origem, destino) {
    const DDD = this.Database.DDDs.find(
      (x) => x.origem === origem && x.destino === destino
    );
    return Ok(TarifaEntity.fromJSON(DDD));
  }
}

module.exports = TarifaRepository;
