const plancheControllers = require('../controllers/planche-controllers');

async function routes (fastify, options) {

    // GET /planche/:pid
    fastify.get('/:pid', plancheControllers.getPlancheByID);

    fastify.post('/:pid/ligne', plancheControllers.ajouteLigne);

    fastify.patch('/:pid/ligne', plancheControllers.modifieLigne);

    fastify.delete('/:pid/ligne', plancheControllers.supprimeLigne);
};
//  1609455600000
module.exports = routes;