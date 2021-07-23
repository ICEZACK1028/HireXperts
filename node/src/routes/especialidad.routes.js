'use strict'

//Importaciones
const express = require('express');
const especialidadController = require('../controllers/especialidad.controller');

//Rutas
var api = express.Router();
api.post('/crearEspecialidad', especialidadController.crearEspecialidad);
api.get('/obtenerEspecialidades', especialidadController.obtenerEspecialidades);
api.put('/editarEspecialidad/:idEspecialidad', especialidadController.editarEspecialidad);
api.delete('/eliminarEspecialidad/:idEspecialidad', especialidadController.eliminarEspecialidad)


//Exportación
module.exports= api;