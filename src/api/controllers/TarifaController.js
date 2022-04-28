const ObterCustoChamada = require('../../domain/usecases/ObterCustoChamada');

class TarifaController {
  async ObterCustoChamada(req, res) {
    try {
      const ucObterCustoChamada = this.ObterCustoChamada();
      const parameters = {
        origem: req.query.origem,
        destino: req.query.destino,
        duracao: req.query.duracao,
        plano: req.query.plano,
      };

      const caseResponse = await ucObterCustoChamada.run(parameters);

      if (caseResponse.isErr) {
        logger.error(caseResponse);
        return res.status(400).json(caseResponse.err);
      }

      return res.json(caseResponse.ok.custo);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = new TarifaController();
