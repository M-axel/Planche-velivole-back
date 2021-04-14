const fastify  = require('fastify')(); // ecriture rapide pour dire que c'est une fonction
const mongoose = require('mongoose');
const fs = require('fs');

// Pour ne pas publier mes credentials
let credential;
try{
    const data = fs.readFileSync('../Credentials/credential_mongo_planches.txt', 'utf8');
    console.log("Credential recupéré");
    credential = data;
} catch (err){
    console.error("Impossible de recuperer le fichier de credential : "+err);
};

// Pour correspondre au principe CORS des navigateurs, on doit spécifier des options dans notre réponse
// pour qu'elle soit acceptée par le navigateur
fastify.register(require('fastify-cors'), {
    origin: "*",
    methods: ['GET', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Content-Range', 'Accept', 'Authorization']
});

// Route
fastify.register(require('./routes/planche-routes'), { prefix: '/api/planche'});

// Connect retourne une promise
mongoose
    .connect('mongodb+srv://'+credential+'@cluster0.gsij6.mongodb.net/planches?retryWrites=true&w=majority')
    .then(  // Si la connexion à la DB est établie correctement, on lance notre serveur
        ()=> // Ecouteur
        fastify.listen(5000, (err, adresse)=> {
                if(err){
                    console.log(err);
                    process.exit(1);
                } else {
                    console.log("Up and running on port 5000");
                }
            })) 
    .catch(
        // La detection d'erreur ne fonctionne pas
        err => {
        console.log("Connexion impossible à la base de donnée : "+err);
    });
