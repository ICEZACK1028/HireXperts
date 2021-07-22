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
    DIP: String,
    direccion: String,
    pais: String,
    ciudad: String,
    estrellas: Number,
    imagen: String,
    profesion:{
        nombreProfesion:String
    },
    descripcionP: String,
    direccionP: String,
    verificado: Boolean,
    estrellasP: Number,
    disponible: Boolean
})

module.exports = mongoose.model('usuarios', UsuarioSchema);