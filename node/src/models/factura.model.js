const mongoose = require("mongoose")
var Schema = mongoose.Schema;

var FacturaSchema = Schema({
    titulo: String,
    fechaInicial: String,
    descripcion: String,
    trabajador: {type: Schema.Types.ObjectId, ref:'usuarios'},
    contratante: {type: Schema.Types.ObjectId, ref:'usuarios'},
    precio: Number,
    fechaFinal: String,
})

module.exports = mongoose.model('factura', FacturaSchema);