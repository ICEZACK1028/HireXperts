const mongoose = require("mongoose")
var Schema = mongoose.Schema;

var ProfesionSchema = Schema({
    nombreProfesion: String,
    imagen: String,
})

module.exports = mongoose.model('profesion', ProfesionSchema);