const { Ok, usecase, step, ifElse, Err } = require('@herbsjs/herbs');
const Chamada = require('../entities/Chamada');

const dependency = {
  PlanoRepository: require('../../repository/db/PlanoRepository'),
  TarifaRepository: require('../../repository/db/TarifaRepository'),
};

const ObterCustoChamada = (injection) =>
  usecase('Obtém custo de chamada por plano e DDD', {
    request: {
      origem: String,
      destino: String,
      duracao: Number,
      plano: String,
    },

    response: { custo: Number },

    setup: (ctx) => (ctx.di = Object.assign({}, dependency, injection)),

    'Verifica se a chamada é válida': step(async (ctx) => {
      const req = ctx.req;
      const chamada = (ctx.chamada = new Chamada());

      chamada.id = Math.floor(Math.random() * 1000);
      chamada.origem = req.origem;
      chamada.destino = req.destino;
      chamada.duracao = req.duracao;
      chamada.plano = req.plano;

      if (!chamada.isValid())
        return Err.invalidEntity({
          message: `Chamada inválida`,
          payload: { entity: 'chamada' },
          cause: JSON.stringify(chamada.errors),
        });

      return Ok();
    }),

    // buscar o plano e pegar os minutos
    // fazer os minutos do plano - duracao e se a
    // duracao for maior , fazer * 10% de taxa
    'Busca o plano': step(async (ctx) => {
      const req = ctx.req;

      const planoRepository = new ctx.di.PlanoRepository(injection);
      const plano = planoRepository.buscarPlano(ctx.req.plano);

      const tarifaRepository = new ctx.di.TarifaRepository(injection);

      const tarifa = tarifaRepository.buscarTarifa(
        ctx.req.origem,
        ctx.req.destino
      );

      //console.log(plano.value.minutos);

      const minExcedentes = req.duracao - plano.value.minutos;

      const custoComTarifaFixa = req.duracao * tarifa.value.valor;

      if (minExcedentes > 0) {
        const taxaAdicional = tarifa.value.valor * 0.1;

        const custoComTarifaExtra =
          minExcedentes * (tarifa.value.valor + taxaAdicional);

        console.log(custoComTarifaExtra + ' com tarifa');

        return Ok((ctx.ret = { custoComTarifaExtra, custoComTarifaFixa }));
      }

      const comPlano = 0;

      return Ok((ctx.ret = { comPlano, custoComTarifaFixa }));
    }),
  });

module.exports = ObterCustoChamada;
