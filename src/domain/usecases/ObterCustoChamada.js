const { Ok, usecase, step, Err } = require('@herbsjs/herbs');
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

    'Busca o valor da tarifa': step(async (ctx) => {
      const req = ctx.req;

      const tarifaRepository = new ctx.di.TarifaRepository(injection);
      const DDD = tarifaRepository.buscarDDD(req.origem, req.destino);
      const valorTarifa = DDD.value.valor;

      if (valorTarifa) {
        ctx.valorTarifa = valorTarifa;
        return Ok(ctx.valorTarifa);
      }

      return Err('Valor da tarifa não encontrado');
    }),

    'Calcula o custo da chamada sem plano': step(async (ctx) => {
      const req = ctx.req;

      if (req.duracao) {
        ctx.custoSemPlano = ctx.valorTarifa * req.duracao;
        return Ok(ctx.custoSemPlano);
      }

      return Err('Duração inválida');
    }),

    'Verifica se há minutos excedentes': step(async (ctx) => {
      const req = ctx.req;

      const planoRepository = new ctx.di.PlanoRepository(injection);
      const plano = planoRepository.buscarPlano(req.plano);
      const minutosPlano = plano.value.minutos;

      if (minutosPlano) {
        ctx.minutos = req.duracao - minutosPlano;
        return Ok(ctx.minutos);
      }

      return Err('Minutos do plano não encontrados');
    }),

    'Calcula o custo da chamada com plano': step(async (ctx) => {
      if (ctx.minutos > 0) {
        const taxaAdicional = ctx.valorTarifa * 0.1;
        ctx.custoComPlano = ctx.minutos * (ctx.valorTarifa + taxaAdicional);
        return Ok(ctx.custoComPlano);
      }

      return Ok((ctx.custoComPlano = 0));
    }),

    'Retorna o custo da chamada': step(async (ctx) => {
      const custoComPlano = ctx.custoComPlano;
      const custoSemPlano = ctx.custoSemPlano;

      return Ok((ctx.ret = { custoComPlano, custoSemPlano }));
    }),
  });

module.exports = ObterCustoChamada;
