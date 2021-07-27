'use strict'

const solicitudModel = require('../models/solicitud.model');

function crearSolicitud(req, res) {
    var solicitudConstructor = new solicitudModel();
    var idContratante = req.params.contratante;
    var params = req.body;

    if(params == null) return res.stauts(500).send({mensaje: "Por favor, ingrese la información deseada"});

    solicitudConstructor.trabajo = params.trabajo;
    solicitudConstructor.descripcion = params.descripcion;
    solicitudConstructor.fechaInicio = params.fechaInicio;
    solicitudConstructor.trabajador = params.trabajador;
    solicitudConstructor.contratante = idContratante;

    solicitudModel.find({trabajo: solicitudConstructor.trabajo, fechaInicio: solicitudConstructor.fechaInicio, trabajador: solicitudConstructor.trabajador})
    .exec((err, solicitudEncontrada) => {
        if(err) return res.status(500).send({mensaje: "Error al buscar solicitud"});
        if(solicitudEncontrada && solicitudEncontrada.length >= 1 ) return res.status(500).send({mensaje: "Solicitud ya existente"});
        solicitudConstructor.save((err, solicitudGuardada) => {
            if(err) return res.status(500).send({mensaje: "Error al guardar solicitud"});
            return res.status(200).send(solicitudGuardada)
        })
    })
}

module.exports = {
    crearSolicitud,
}