const mongoose = require("mongoose")
var Schema = mongoose.Schema;

var SolicitudSchema = Schema({
    titulo: String,
    fechaInicial: Date,
    descripcion: String,
    trabajador: {type: Schema.Types.ObjectId, ref:'usuarios'},
    contratante: {type: Schema.Types.ObjectId, ref:'usuarios'},
    precio: Number,
})

module.exports = mongoose.model('contrato', SolicitudSchema);