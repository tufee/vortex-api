const { entity, field } = require('@herbsjs/herbs')

const Tarifa = entity('Tarifa', {
  origem: field(String),
  destino: field(String),
  valor: field(String)
})

module.exports = Tarifa
