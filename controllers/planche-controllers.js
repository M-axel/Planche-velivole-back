const { nanoid } = require("nanoid"); // enorme comme id pour le besoin que j'en ai
const Ligne = require("../models/ligne"); // constructor

//Dummy
const DUMMY_TODAY = new Date(new Date().setHours(0, 0, 0, 0));

const DUMMY_DATA = [
  {
    plancheID: new Date(2021, 0, 1),
    data: [
      {
        volID: "0",
        avion: { immat: "ZV", pilote: "LRC", code: "3208" },
        planeur: { type: "LS6", immat1: "D", immat2: "G" },
        pilotePlaneur: { nom: "DEWEZ", code: "544" },
        placeArriere: { nom: "", code: "" },
        remorquage: { heure: "11", minute: "49", temps: "6" },
        atterrissage: { heure: "16", minute: "54" },
        parachute: "22",
      },
      {
        volID: "1",
        avion: { immat: "ZM", pilote: "LRC", code: "3208" },
        planeur: { type: "LS6", immat1: "D", immat2: "G" },
        pilotePlaneur: { nom: "DEWEZ", code: "544" },
        placeArriere: { nom: "", code: "" },
        remorquage: { heure: "11", minute: "49", temps: "6" },
        atterrissage: { heure: "16", minute: "54" },
        parachute: "22",
      },
    ],
  },
  {
    plancheID: new Date(2021, 0, 2),
    data: [
      {
        volID: "0",
        avion: { immat: "ZV", pilote: "LRC", code: "3208" },
        planeur: { type: "LS6", immat1: "D", immat2: "G" },
        pilotePlaneur: { nom: "DEWEZ", code: "544" },
        placeArriere: { nom: "", code: "" },
        remorquage: { heure: "11", minute: "49", temps: "6" },
        atterrissage: { heure: "16", minute: "54" },
        parachute: "22",
      },
      {
        volID: "1",
        avion: { immat: "ZV", pilote: "LRC", code: "3208" },
        planeur: { type: "LS6", immat1: "D", immat2: "G" },
        pilotePlaneur: { nom: "MAISSA", code: "544" },
        placeArriere: { nom: "", code: "" },
        remorquage: { heure: "11", minute: "49", temps: "6" },
        atterrissage: { heure: "16", minute: "54" },
        parachute: "22",
      },
    ],
  },
  {
    plancheID: new Date(2021, 2, 15),
    data: [
      {
        volID: "0",
        avion: { immat: "ZV", pilote: "LRC", code: "3208" },
        planeur: { type: "LS6", immat1: "D", immat2: "G" },
        pilotePlaneur: { nom: "DEWEZ", code: "544" },
        placeArriere: { nom: "", code: "" },
        remorquage: { heure: "11", minute: "49", temps: "6" },
        atterrissage: { heure: "16", minute: "54" },
        parachute: "22",
      },
      {
        volID: "1",
        avion: { immat: "VZ", pilote: "STS", code: "328" },
        planeur: { type: "LS6", immat1: "F", immat2: "A" },
        pilotePlaneur: { nom: "OKLA", code: "514" },
        placeArriere: { nom: "DELOR", code: "100" },
        remorquage: { heure: "12", minute: "59", temps: "8" },
        atterrissage: { heure: "18", minute: "00" },
        parachute: "21/23",
      },
    ],
  },
  {
    plancheID: DUMMY_TODAY,
    data: [
      {
        volID: "0",
        avion: { immat: "ZV", pilote: "LRC", code: "3208" },
        planeur: { type: "LS6", immat1: "D", immat2: "G" },
        pilotePlaneur: { nom: "DEWEZ", code: "544" },
        placeArriere: { nom: "", code: "" },
        remorquage: { heure: "11", minute: "49", temps: "6" },
        atterrissage: { heure: "16", minute: "54" },
        parachute: "22",
      },
      {
        volID: "1",
        avion: { immat: "VZ", pilote: "STS", code: "328" },
        planeur: { type: "LS6", immat1: "F", immat2: "A" },
        pilotePlaneur: { nom: "OKLA", code: "514" },
        placeArriere: { nom: "DELOR", code: "100" },
        remorquage: { heure: "12", minute: "59", temps: "8" },
        atterrissage: { heure: "18", minute: "00" },
        parachute: "21/23",
      },
    ],
  },
];

const getPlancheByID = async (req, res) => {
  // pid est un date.getTime() au format string
  const plancheID = parseInt(req.params.pid);

  //const planche = DUMMY_DATA.find((p) => p.plancheID.getTime() === plancheID);
  let planche;
  try{
    planche = await Ligne.find({plancheID: plancheID});
  } catch (err){
    console.log("Aucunes lignes avec cette ID de planche "+ err);
    return next(err);
  }

  //console.log(planche);

  // Autre erreur possible :
  // Si on a pas pu recuperer de planche
  if (!planche) {
    return res
      .code(404)
      .send({ message: "Aucune planche n'existe avec cet ID" });
      return;
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
const ajouteLigne = async (req, res, next) => {
  const plancheID = parseInt(req.params.pid);
  //const ligne = req.body;

  // On récupère nos données
  const {
    avion,
    planeur,
    pilotePlaneur,
    placeArriere,
    remorquage,
    atterrissage,
    parachute,
  } = req.body;

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

  ligne.volID = nanoid();

  /*const indexPlanche = DUMMY_DATA.indexOf(
    DUMMY_DATA.find((p) => p.plancheID.getTime() === plancheID)
  );
  DUMMY_DATA[indexPlanche].data.push(ligne);*/

  // await pour etre sûr que la donnée est bien entrée dans la DB
  try {
    await ligne.save();
  } catch (err) {
    console.log("Erreur lors de la sauvegarde dans la base de donnée.");
    return next(error);
  };

  res.status(201).send(ligne);
};

const modifieLigne = async (req, res, next) => {
  const plancheID = parseInt(req.params.pid);
  
  const {
    id,
    avion,
    planeur,
    pilotePlaneur,
    placeArriere,
    remorquage,
    atterrissage,
    parachute,
  } = req.body;
  
  let ligne;
  try {
    ligne = await Ligne.findById(id);
  } catch (err){
    console.log("Impossible de recuperer cette ligne : "+ err);
    return next(err);
  }

  /*
  const planche = DUMMY_DATA.find((p) => p.plancheID.getTime() === plancheID);
  const indexUpdatedPlanche = DUMMY_DATA.indexOf(planche);
*/

  // On copie la ligne, puis on la modifie afin d'éviter un conflit de modification
  /*const updatedLine = {
    ...DUMMY_DATA[indexUpdatedPlanche].data.find(
      (li) => li.volID === ligne.volID
    ),
  };*/

  // Répétitif mais impossible de faire un indexOf avec updatedLine puisque c'est une copie ...
  /*const indexLine = DUMMY_DATA[indexUpdatedPlanche].data.indexOf(
    DUMMY_DATA[indexUpdatedPlanche].data.find((li) => li.volID === ligne.volID)
  );*/

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
    console.log("L'enregistrement de la ligne modifiée a échoué : "+err);
    return next(err);
  }

  // Puis on remplace
  /*
  DUMMY_DATA[indexUpdatedPlanche].data[indexLine] = updatedLine;
  res.send(DUMMY_DATA[indexUpdatedPlanche].data[indexLine]);*/

  res.status(200).send({ ligne: ligne.toObject({getters: true}) });
};

const supprimeLigne = async (req, res) => {
  //const plancheID = parseInt(req.params.pid);
  const ligneID = req.body.id;

  /*
  const indexPlanche = DUMMY_DATA.indexOf(
    DUMMY_DATA.find((p) => p.plancheID.getTime() === plancheID)
  );
  DUMMY_DATA[indexPlanche] = DUMMY_DATA[indexPlanche].data.filter(
    (li) => li.volID !== ligne.volID
  );*/

  try {
    ligne = await Ligne.findById(ligneID);
  } catch (err){
    console.log("Impossible de recuperer la ligne a supprimer : "+ err);
    return next(err);
  }

  try {
    await ligne.remove();
  } catch (err){
    console.log("Impossible de recuperer la ligne a supprimer : "+ err);
    return next(err);
  }

  res.status(200).send({ message: 'Ligne supprimée.'});
};

exports.getPlancheByID = getPlancheByID;
exports.ajouteLigne = ajouteLigne;
exports.modifieLigne = modifieLigne;
exports.supprimeLigne = supprimeLigne;
