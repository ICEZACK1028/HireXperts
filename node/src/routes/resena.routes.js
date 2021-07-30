'use strict'

//Importaciones
const express = require('express');
const resenaController = require('../controllers/resena.controller');

//Rutas
var api = express.Router();
api.post('/crearResena/:contrato', resenaController.crearResena);

//Exportación
module.exports= api;