const mongoose = require("mongoose")
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    usuario: String,
    password: String,
    rol: String,
    nombre: String,
    apellido: String,
    telefono: String,
    correo: String,
    nacimiento: Date,
    dpi: String,
    direccion: String,
    pais: String,
    ciudad: String,
    estrellas: Number,
    imagen: String,
    profesion: {type: Schema.Types.ObjectId, ref:'profesion'},
    descripcionP: String,
    direccionP: String,
    verificado: Boolean,
    estrellasP: Number,
    disponible: Boolean
})

module.exports = mongoose.model('usuarios', UsuarioSchema);