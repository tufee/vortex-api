const { entity, field, id } = require('@herbsjs/herbs');

const Chamada = entity('Chamada', {
  id: id(Number),
  origem: field(String, {
    validation: { presence: true, length: { is: 3 } },
  }),
  destino: field(String, {
    validation: { presence: true, length: { is: 3 } },
  }),
  valorPorMinuto: field(Number, {
    validation: { presence: true },
  }),
});

module.exports = Chamada;
