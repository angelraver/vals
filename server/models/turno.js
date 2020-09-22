var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TurnoSchema = new Schema({
  cliente: Object,
  tratamiento: Object,
  fecha: Object
});

var Turno = mongoose.model("Turnos", TurnoSchema);
module.exports = Turno;
