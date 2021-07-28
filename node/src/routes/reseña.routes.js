'use strict'

//Importaciones
const express = require('express');
const reseñaController = require('../controllers/reseña.controller');

//Rutas
var api = express.Router();
api.post('/crearReseña/:contrato', reseñaController.crearReseña);

//Exportación
module.exports= api;