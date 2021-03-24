const plancheControllers = require('../controllers/planche-controllers');

async function routes (fastify, options) {

    // GET /planche/:pid
    fastify.get('/:pid', plancheControllers.getPlancheByID);

    fastify.post('/:pid/ligne', plancheControllers.ajouteLigne);
};
//  1609455600000
module.exports = routes;