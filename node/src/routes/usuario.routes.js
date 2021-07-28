'use strict';

//Importaciones
const express = require('express');
const usuarioController = require('../controllers/usuario.controller');
const md_authentication = require('../middlewares/authenticated');

//Rutas
var api = express.Router();

api.post('/registrarUsuario', usuarioController.registrarUsuario);
api.post('/login', usuarioController.login);
api.get('/obtenerUsuarioId/:idUsuario', md_authentication.ensureAuth, usuarioController.obtenerUsuarioId)
api.get('/obtenerUsuarioLogueado/:idUsuario', usuarioController.obtenerUsuarioLogueado)


//Exportación
module.exports= api;