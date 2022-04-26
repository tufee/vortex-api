const { entity, field, id } = require('@herbsjs/herbs');

const Chamada = entity('Chamada', {
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
  valorPorMinuto: field(Number, {
    validation: {
      presence: true,
    },
  }),
});

module.exports = Chamada;
