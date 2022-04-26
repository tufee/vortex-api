const { entity, field, id } = require('@herbsjs/herbs');

const Tarifa = entity('Tarifa', {
  id: id(Number, {
    validation: {
      presence: true,
      numericality: {
        greaterThan: 0,
        onlyInteger: true,
      },
    },
  }),
  origem: field(String, {
    validation: {
      presence: true,
      contains: { allowed: ['011', '016', '017', '018'] },
    },
  }),
  destino: field(String, {
    validation: {
      presence: true,
      contains: { allowed: ['011', '016', '017', '018'] },
    },
  }),
  valor: field(Number, {
    validation: {
      presence: true,
      contains: { allowed: [1.9, 2.9, 1.7, 2.7, 0.9, 1.9] },
    },
  }),
});

module.exports = Tarifa;
