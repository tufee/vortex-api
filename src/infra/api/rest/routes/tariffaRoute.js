const { Router } = require('express');
const TarifaController = require('../controllers/TarifaController');

const routes = new Router();
/**
 * @swagger
 * /tarifa:
 *  get:
 *    tags: [tarifa]
 *    description:
 *    responses:
 *      '200':
 *        description: Obtém custo de chamada da api falemais
 *    parameters:
 */
routes.get('/tarifa', TarifaController.ObterCustoChamada);

module.exports = routes;
