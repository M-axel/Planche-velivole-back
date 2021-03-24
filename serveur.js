const fastify  = require('fastify')();
const bodyParser = require('body-parser');

// Route
fastify.register(require('./routes/planche'), { prefix: '/api/planche'})
// Ecouteur
fastify.listen(3000, (err, adresse)=> {
    if(err){
        console.log(err);
        process.exit(1);
    } else {
        console.log("Up and running on port 3000");
    }
})