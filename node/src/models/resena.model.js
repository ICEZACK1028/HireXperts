const mongoose = require("mongoose")
var Schema = mongoose.Schema;

var ResenaSchema = Schema({
    titulo: String,
    descripcion: String,
    estrellas: Number,
    trabajador: { type: Schema.Types.ObjectId, ref: 'usuarios' },
    contratante: { type: Schema.Types.ObjectId, ref: 'usuarios' },
    contrato: { type: Schema.Types.ObjectId, ref: 'contrato' },
})

module.exports = mongoose.model('resena', ResenaSchema);