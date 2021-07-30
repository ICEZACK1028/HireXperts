const mongoose = require("mongoose")
var Schema = mongoose.Schema;

var SolicitudSchema = Schema({
    trabajo: String,
    descripcion: String,
    fechaInicio: String,
    trabajador: {type: Schema.Types.ObjectId, ref:'usuarios'},
    contratante: {type: Schema.Types.ObjectId, ref:'usuarios'},
})

module.exports = mongoose.model('solicitud', SolicitudSchema);