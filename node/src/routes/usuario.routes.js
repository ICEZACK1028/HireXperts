'use strict';

//Importaciones
const express = require('express');
const usuarioController = require('../controllers/usuario.controller');
const md_authentication = require("../middlewares/authenticated");

//Rutas
var api = express.Router();

api.post('/registrarUsuario', usuarioController.registrarUsuario);
api.post('/login', usuarioController.login);
api.put('/editarMiPerfil/:usuarioId', usuarioController.editarMiPerfil);
api.put('/registrarProfesional', md_authentication.ensureAuth,  usuarioController.registrarProfesional);
api.delete('/eliminarMiPerfil/:usuarioId', usuarioController.eliminarMiPerfil);
api.get('/obtenerUsuarios', usuarioController.obtenerUsuarios);
api.delete('/eliminarUsuarios/usuarioId', usuarioController.eliminarUsuarios);
api.put('/editarUsuarios/usuarioId', usuarioController.editarUsuarios);
api.get('/obtenerUsuarioId/:idUsuario', md_authentication.ensureAuth, usuarioController.obtenerUsuarioId)
api.get('/obtenerUsuarioLogueado', md_authentication.ensureAuth, usuarioController.obtenerUsuarioLogueado)


//Exportación
module.exports= api;