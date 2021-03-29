const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ligneSchema = new Schema({
  plancheID: { type: Number, required: true },
  avion: {
    immat: { type: String /*required:true*/ },
    pilote: { type: String /*required:true*/ },
    code: { type: Number /*required:true*/ },
  },
  planeur: {
    type: { type: String /*required:true*/ },
    immat1: { type: String /*required:true*/ },
    immat2: { type: String /*required:true*/ },
  },
  pilotePlaneur: {
    nom: { type: String /*required:true*/ },
    code: { type: Number /*required:true*/ },
  },
  placeArriere: {
    nom: { type: String },
    code: { type: Number },
  },
  remorquage: {
      heure: { type: Number },
      minute: { type: Number },
      temps: { type: Number }
  },
  atterrissage:{
    heure: { type: Number },
    minute: { type: Number }
  },
  parachute:{type: String}
});

/*

        volID: "0", => désormais inutile
        avion: { immat: "ZV", pilote: "LRC", code: "3208" },
        planeur: { type: "LS6", immat1: "D", immat2: "G" },
        pilotePlaneur: { nom: "DEWEZ", code: "544" },
        placeArriere: { nom: "", code: "" },
        remorquage: { heure: "11", minute: "49", temps: "6" },
        atterrissage: { heure: "16", minute: "54" },
        parachute: "22",

*/

module.exports = mongoose.model('Ligne', ligneSchema); // model est un constructor