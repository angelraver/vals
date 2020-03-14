var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TratamientoSchema = new Schema({
  titulo: String,
  descripcion: String,
  precio: String,
  duracion: String
});

var Tratamiento = mongoose.model("Tratamientos", TratamientoSchema);
module.exports = Tratamiento;
