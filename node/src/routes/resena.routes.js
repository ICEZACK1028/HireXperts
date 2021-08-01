'use strict'

//Importaciones
const express = require('express');
const resenaController = require('../controllers/resena.controller');

//Rutas
var api = express.Router();
api.post('/crearResena/:contrato', resenaController.crearResena);
api.get('/obtenerResenaContratante/:idTrabajador', resenaController.obtenerResenaContratante);
api.get('/obtenerResenaTrabajador/:idTrabajador', resenaController.obtenerResenaTrabajador);

//Exportación
module.exports= api;