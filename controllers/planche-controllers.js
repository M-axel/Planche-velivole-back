const { default: fastify } = require("fastify");
const { nanoid } = require("nanoid"); // enorme comme id pour le besoin que j'en ai
const Ligne = require("../models/ligne"); // constructor

const getPlancheByID = async (req, res) => {
  // pid est un date.getTime() au format string
  const plancheID = parseInt(req.params.pid);

  //const planche = DUMMY_DATA.find((p) => p.plancheID.getTime() === plancheID);
  let planche;
  try{
    planche = await Ligne.find({plancheID: plancheID});
  } catch (err){
    console.log.error("Aucunes lignes avec cette ID de planche "+ err);
    process.exit(1);
  }

  //console.log(planche);

  // Autre erreur possible :
  // Si on a pas pu recuperer de planche
  if (planche.length < 1) {
    return res
      .code(404)
      .send({ message: "Aucune planche n'existe avec cet ID" });
  }

  res.send({
    plancheID,
    // Getters pour avoir id et non _id
    data: planche.map(ligne => ligne.toObject({ getters: true}))
  });
  /*res.send({
    plancheID: planche.plancheID,
    data: planche.data,
  });*/

};

// Les données (l'objet ligne) se trouve dans le body de la requete
const ajouteLigne = async (req, res) => {
  const plancheID = parseInt(req.params.pid);

  // Déplacer le parsing en amont
  const parsedJSON = JSON.parse(req.body);

  // On récupère nos données
  const {
    avion,
    planeur,
    pilotePlaneur,
    placeArriere,
    remorquage,
    atterrissage,
    parachute,
  } = parsedJSON;

  // On les injecte dans un objet ligne (Model mongoose)
  // pas besoin de faire plancheID: plancheID puisque même nom
  const ligne = new Ligne({
    plancheID,
    avion,
    planeur,
    pilotePlaneur,
    placeArriere,
    remorquage,
    atterrissage,
    parachute,
  });
  
  ligne.id = nanoid();

  // await pour etre sûr que la donnée est bien entrée dans la DB
  try {
    await ligne.save();
  } catch (err) {
    fastify.log.error("Erreur lors de la sauvegarde dans la base de donnée.");
    console.log("Erreur");
    process.exit(1);
  };

  res.status(201).send(ligne);
};

const modifieLigne = async (req, res) => {
  const plancheID = parseInt(req.params.pid);
  
  const parsedJSON = JSON.parse(req.body);

  console.log(parsedJSON);

  const {
    id,
    avion,
    planeur,
    pilotePlaneur,
    placeArriere,
    remorquage,
    atterrissage,
    parachute,
  } = parsedJSON;
  
  let ligne;
  try {
    ligne = await Ligne.findById(id);
  } catch (err){
    fastify.log.error("Impossible de recuperer cette ligne : "+err);
    process.exit(1)
  }
  // On modifie
  ligne.avion = avion;
  ligne.planeur = planeur;
  ligne.pilotePlaneur = pilotePlaneur;
  ligne.placeArriere = placeArriere;
  ligne.remorquage = remorquage;
  ligne.atterrissage = atterrissage;
  ligne.parachute = parachute;

  // enregistrement dans la database
  try {
    await ligne.save();
  } catch (err){
    fastify.log.error("L'enregistrement de la ligne modifiée a échoué : "+err);
    process.exit(1)
  }
  
  res.status(200).send({ ligne: ligne.toObject({getters: true}) });
};

const supprimeLigne = async (req, res) => {
  //const plancheID = parseInt(req.params.pid);
  const parsedJSON = JSON.parse(req.body);
  const ligneID = parsedJSON.id;

  //console.log("ID ligne à supprimer " + ligneID);

  try {
    ligne = await Ligne.findById(ligneID);
  } catch (err){
    fastify.log.error("Impossible de recuperer la ligne a supprimer : "+err);
    process.exit(1)
  }

  try {
    await ligne.remove();
  } catch (err){
    fastify.log.error("Impossible de recuperer la ligne a supprimer : "+err);
    process.exit(1)
  }

  res.status(200).send({ message: 'Ligne supprimée.'});
};

exports.getPlancheByID = getPlancheByID;
exports.ajouteLigne = ajouteLigne;
exports.modifieLigne = modifieLigne;
exports.supprimeLigne = supprimeLigne;
