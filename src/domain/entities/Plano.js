const { entity, field, id } = require('@herbsjs/herbs');

const Plano = entity('Plano', {
  id: id(Number),
  nome: field(String, {
    validation: { presence: true, length: { minimum: 11 } },
  }),
  minutos: field(Number, {
    validation: {
      presence: true,
      numericality: {
        greaterThan: 0,
      },
    },
  }),
});

module.exports = Plano;
