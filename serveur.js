const fastify  = require('fastify')(); // ecriture rapide pour dire que c'est une fonction

// Route
fastify.register(require('./routes/planche-routes'), { prefix: '/api/planche'});


// Ecouteur
fastify.listen(3000, (err, adresse)=> {
    if(err){
        console.log(err);
        process.exit(1);
    } else {
        console.log("Up and running on port 3000");
    }
});