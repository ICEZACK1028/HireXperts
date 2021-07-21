const mongoose = require("mongoose")
var Schema = mongoose.Schema;

var SolicitudSchema = Schema({
    titulo: String,
    descripcion: String,
    estrellas: Number,
    trabajador: {type: Schema.Types.ObjectId, ref:'usuarios'},
    contratante: {type: Schema.Types.ObjectId, ref:'usuarios'},
})

module.exports = mongoose.model('reseña', SolicitudSchema);