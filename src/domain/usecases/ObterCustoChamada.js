const { Ok, usecase, step, ifElse, Err } = require('@herbsjs/herbs');
const Chamada = require('../entities/Chamada');
const Tarifa = require('../entities/Tarifa');
const TarifaRepository = require('../../repository/db/TarifaRepository');

const dependency = { Tarifa, TarifaRepository };

const ObterCustoChamada = (injection) =>
  usecase('Obtém custo de chamada por plano e DDD', {
    request: Chamada,

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
    'Retorna custo de chamada': step(async (ctx) => {
      const tarifaRepo = new ctx.di.TarifaRepository(ctx.di);
      custo = ctx.ret.custo = await tarifaRepo.CalcularPrecoChamada(
        ctx.req.country
      );
      return Ok({ custo });
    }),
  });

module.exports = ObterCustoChamada;
