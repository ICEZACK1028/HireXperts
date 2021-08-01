'use strict'

//Importaciones
const express = require('express');
const profesionController = require('../controllers/profesion.controller');

//Rutas
var api = express.Router();
api.post('/crearProfesion', profesionController.crearProfesion);
api.get('/obtenerProfesiones', profesionController.obtenerProfesiones);
api.put('/editarProfesion/:idProfesion', profesionController.editarProfesion);
api.delete('/eliminarProfesion/:idProfesion', profesionController.eliminarProfesion);

//Exportación
module.exports= api;