const { nanoid } =  require("nanoid"); // enorme comme id pour le besoin que j'en ai
//Dummy
const DUMMY_TODAY= new Date((new Date().setHours(0,0,0,0)));

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
  },{
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
  }
];

const getPlancheByID = async (req, res) => {
    // pid est un date.getTime() au format string
    const plancheID = parseInt(req.params.pid);

    const planche = DUMMY_DATA.find(
        (p) => p.plancheID.getTime() === plancheID
    )

    //console.log(planche);

    // Si on a pas pu recuperer de planche
    if(!planche){
        return res.code(404).send({message: "Aucune planche n'existe avec cet ID"});
    } 

    res.send({
        plancheID: planche.plancheID,
        data: planche.data
    });
};


// Les données (l'objet ligne) se trouve dans le body de la requete
const ajouteLigne = async (req, res) => {
  const plancheID = parseInt(req.params.pid);
  const ligne = req.body;

  ligne.volID = nanoid();

  res.send(ligne);
};

exports.getPlancheByID = getPlancheByID;
exports.ajouteLigne = ajouteLigne;