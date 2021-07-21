'use strict'

//Importaciones
const express = require('express');
const especialidadController = require('../controllers/especialidad.controller');

//Rutas
var api = express.Router();
api.post('/crearEspecialidad', especialidadController.crearEspecialidad);


//Exportación
module.exports= api;