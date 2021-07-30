'use strict'

const express = require('express');
const solicitudController = require('../controllers/solicitud.controller');

var api = express.Router();
api.post('/crearSolicitud/:contratante', solicitudController.crearSolicitud);
api.put('/editarSolicitud/:solicitud', solicitudController.editarSolicitud);
api.delete('/eliminarSolicitud/:solicitud', solicitudController.eliminarSolicitud);
api.get('/listarSolicitud/:contratante', solicitudController.listarSolicitudes);

module.exports= api;