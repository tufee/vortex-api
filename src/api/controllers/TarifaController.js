const ObterCustoChamada = require('../../domain/usecases/ObterCustoChamada');

class TarifaController {
  async ObterCustoChamada(req, res) {
    try {
      const ucObterCustoChamada = ObterCustoChamada();
      const parameters = {
        origem: req.body.origem,
        destino: req.body.destino,
        duracao: req.body.duracao,
        plano: req.body.plano,
      };

      const caseResponse = await ucObterCustoChamada.run(parameters);

      console.log(caseResponse);
      if (caseResponse.isErr) {
        //logger.error(caseResponse);
        console.error(caseResponse);
        return res.status(400).json(caseResponse.err);
      }

      return res.json(caseResponse);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = new TarifaController();
