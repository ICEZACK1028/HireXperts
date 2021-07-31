'use strict'

//Importaciones
const express = require('express');
const contratoController = require('../controllers/contrato.controller');
const md_authentication = require('../middlewares/authenticated');

//Rutas
var api = express.Router();
api.post('/solicitudInicio/:trabajador', md_authentication.ensureAuth, contratoController.solicitudInicio);
api.put('/solicitudRespuesta/:contrato', md_authentication.ensureAuth, contratoController.solicitudRespuesta);

//Exportación
module.exports= api;