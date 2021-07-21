const mongoose = require("mongoose")
var Schema = mongoose.Schema;

var EspecialidadSchema = Schema({
    nombreEspecialidad: String,
})

module.exports = mongoose.model('especialidad', EspecialidadSchema);