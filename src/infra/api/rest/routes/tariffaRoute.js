const { Router } = require('express');
const TarifaController = require('../controllers/TarifaController');

const routes = new Router();
/**
 * @swagger
 * /tarifa:
 *  get:
 *    tags: [tarifa]
 *    description:
 *
 *    parameters:
 *      - name: origem
 *        in: query
 *        description: DDD de origem
 *        required: true
 *        schema:
 *          type: string
 *        example: '011'
 *
 *      - name: destino
 *        in: query
 *        description: DDD de destino
 *        required: true
 *        schema:
 *          type: string
 *        example: '016'
 *
 *
 *      - name: duracao
 *        in: query
 *        description: Duração da chamada em minutos
 *        required: true
 *        schema:
 *          type: string
 *        example: 20
 *
 *      - name: plano
 *        in: query
 *        description: Nome do plano
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          - FaleMais 30
 *          - FaleMais 60
 *          - FaleMais 120
 *
 *    responses:
 *      '200':
 *        description: Obtém custo de chamada da api falemais
 *        schema:
 *          type: object
 *          properties:
 *            Ok:
 *              type: object
 *              properties:
 *                custoComPlano:
 *                  type: number
 *                  description: Custo da chamada com o plano
 *
 *                custoSemPlano:
 *                  type: number
 *                  description: Custo da chamada sem o plano
 *
 *      '400':
 *        description: Chamada inválida
 *
 */
routes.get('/tarifa', TarifaController.ObterCustoChamada);

module.exports = routes;
