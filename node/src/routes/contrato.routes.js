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
api.get('/obtenerNoContratosEnviados', md_authentication.ensureAuth, contratoController.obtenerNoContratosEnviados);
api.get('/obtenerNoContratosRecibidos', md_authentication.ensureAuth, contratoController.obtenerNoContratosRecibidos);
api.get('/obtenerContratanteSolicitudInicio', md_authentication.ensureAuth, contratoController.obtenerContratanteSolicitudInicio);
api.get('/obtenerContratanteSolicitudCancelada', md_authentication.ensureAuth, contratoController.obtenerContratanteSolicitudCancelada);
api.get('/obtenerContratanteSolicitudRespuesta', md_authentication.ensureAuth, contratoController.obtenerContratanteSolicitudRespuesta);
api.get('/obtenerContratanteTrabajoProceso', md_authentication.ensureAuth, contratoController.obtenerContratanteTrabajoProceso);
api.get('/obtenerContratanteTrabajoCancelado', md_authentication.ensureAuth, contratoController.obtenerContratanteTrabajoCancelado);
api.get('/obtenerContratanteTrabajoFinalizado', md_authentication.ensureAuth, contratoController.obtenerContratanteTrabajoFinalizado);
api.get('/obtenerTrabajadorSolicitudCancelada', md_authentication.ensureAuth, contratoController.obtenerTrabajadorSolicitudCancelada);
api.get('/obtenerTrabajadorSolicitudInicio', md_authentication.ensureAuth, contratoController.obtenerTrabajadorSolicitudInicio);
api.get('/obtenerTrabajadorSolicitudRespuesta', md_authentication.ensureAuth, contratoController.obtenerTrabajadorSolicitudRespuesta);
api.get('/obtenerTrabajadorTrabajoCancelado', md_authentication.ensureAuth, contratoController.obtenerTrabajadorTrabajoCancelado);
api.get('/obtenerTrabajadorTrabajoFinalizado', md_authentication.ensureAuth, contratoController.obtenerTrabajadorTrabajoFinalizado);
api.get('/obtenerTrabajadorTrabajoProceso', md_authentication.ensureAuth, contratoController.obtenerTrabajadorTrabajoProceso);

//Exportación
module.exports= api;