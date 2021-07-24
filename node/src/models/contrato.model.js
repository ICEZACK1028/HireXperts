const mongoose = require("mongoose")
var Schema = mongoose.Schema;

var ContratoSchema = Schema({
    titulo: String,
    fechaInicial: String,
    descripcion: String,
    trabajador: {type: Schema.Types.ObjectId, ref:'usuarios'},
    contratante: {type: Schema.Types.ObjectId, ref:'usuarios'},
    precio: Number,
})

module.exports = mongoose.model('contrato', ContratoSchema);