const { Ok, usecase, step, ifElse, Err } = require('@herbsjs/herbs')
const Tarifa = require('../entities/Tarifa')
const TarifaRepository = require('../../repository/db/TarifaRepository')

const dependency = { Tarifa, TarifaRepository }

const ObterCustoChamada = injection =>
  usecase('Obtém custo de chamada por plano e DDD', {
    request: {
      origem: String,
      destino: Number,
      duracao: Number, 
      plano: String
    },

    setup: ctx => (ctx.di = Object.assign({}, dependency, injection)),

    'Retorna custo de chamada': step(async ctx => {
      const tarifaRepo = new ctx.di.TarifaRepository(ctx.di)
      custo = ctx.ret.custo = await tarifaRepo.CalcularPrecoChamada(ctx.req.country)
      return Ok({ custo })
    }),
  })

module.exports = ObterCustoChamada
