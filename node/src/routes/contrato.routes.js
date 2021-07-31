'use strict'

//Importaciones
const express = require('express');
const contratoController = require('../controllers/contrato.controller');
const md_authentication = require('../middlewares/authenticated');

//Rutas
var api = express.Router();
api.post('/solicitudInicio/:trabajador', md_authentication.ensureAuth, contratoController.solicitudInicio);
api.put('/solicitudRespuesta/:contrato', md_authentication.ensureAuth, contratoController.solicitudRespuesta);
api.put('/trabajoProceso/:contrato', md_authentication.ensureAuth, contratoController.trabajoProceso);
api.put('/trabajoCancelado/:contrato', md_authentication.ensureAuth, contratoController.trabajoCancelado);
api.put('/trabajoFinalizado/:contrato', md_authentication.ensureAuth, contratoController.trabajoFinalizado);
api.get('/obtenerNoContratosEnviados', contratoController.obtenerNoContratosEnviados);
api.get('/obtenerNoContratosRecibidos', contratoController.obtenerNoContratosRecibidos);
api.get('/obtenerContratanteSolicitudInicio', contratoController.obtenerContratanteSolicitudInicio);
api.get('/obtenerContratanteSolicitudCancelada', contratoController.obtenerContratanteSolicitudCancelada);
api.get('/obtenerContratanteSolicitudRespuesta', contratoController.obtenerContratanteSolicitudRespuesta);

//Exportación
module.exports= api;