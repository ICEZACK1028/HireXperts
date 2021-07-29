'use strict'

//Importaciones
const express = require('express');
const contratoController = require('../controllers/contrato.controller');

//Rutas
var api = express.Router();
api.post('/crearContrato/:trabajador', contratoController.crearContrato);

//Exportación
module.exports= api;