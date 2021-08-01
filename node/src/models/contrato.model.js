const mongoose = require("mongoose")
var Schema = mongoose.Schema;

var ContratoSchema = Schema({
    titulo: String,
    fechaInicial: Date,
    descripcion: String,
    trabajador: {type: Schema.Types.ObjectId, ref:'usuarios'},
    contratante: {type: Schema.Types.ObjectId, ref:'usuarios'},
    descripcionR: String,
    status: String,
    fechaFinal: Date,
    precio: Number,
})

module.exports = mongoose.model('contrato', ContratoSchema);