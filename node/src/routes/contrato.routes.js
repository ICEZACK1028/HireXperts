'use strict'

//Importaciones
const express = require('express');
const contratoController = require('../controllers/contrato.controller');
const md_authentication = require('../middlewares/authenticated');

//Rutas
var api = express.Router();
api.post('/crearContrato/:trabajador', md_authentication.ensureAuth, contratoController.crearContrato);

//Exportación
module.exports= api;