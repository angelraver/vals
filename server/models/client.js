var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  gender: String,
  description: String
});

var Client = mongoose.model("Clients", ClientSchema);
module.exports = Client;
