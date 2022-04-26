const { entity, field, id } = require('@herbsjs/herbs');

const Plano = entity('Plano', {
  id: id(Number, {
    validation: {
      presence: true,
      numericality: {
        greaterThan: 0,
        onlyInteger: true,
      },
    },
  }),
  nome: field(String, {
    validation: {
      presence: true,
      contains: { allowed: ['FaleMais 30', 'FaleMais 60', 'FaleMais 120'] },
    },
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
