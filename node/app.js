'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

//Rutas 
const usuario_rutas= require('./src/routes/usuario.routes');
const profesion_rutas= require('./src/routes/profesion.routes');
const especialidad_rutas= require('./src/routes/especialidad.routes');
const solicitud_rutas = require('./src/routes/solicitud.routes');
const reseña_rutas = require('./src/routes/reseña.routes');

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Carga de Rutas
app.use('/api', usuario_rutas, profesion_rutas, especialidad_rutas, solicitud_rutas, reseña_rutas);

//Exportación
module.exports = app;