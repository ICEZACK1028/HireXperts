'use strict'

//Importaciones
const express = require('express');
const profesionController = require('../controllers/profesion.controller');

//Rutas
var api = express.Router();
api.post('/crearProfesion', profesionController.crearProfesion);


//Exportación
module.exports= api;