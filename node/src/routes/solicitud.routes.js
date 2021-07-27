'use strict'

const express = require('express');
const solicitudController = require('../controllers/solicitud.controller');

var api = express.Router();
api.post('/crearSolicitud', solicitudController.crearSolicitud);

module.exports= api;