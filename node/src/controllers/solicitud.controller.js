'use strict'

const solicitudModel = require('../models/solicitud.model');

function crearSolicitud(req, res) {
    var solicitudConstructor = new solicitudModel();
    var idContratante = req.params.contratante;
    var params = req.body;

    if(params.trabajo == null, params.descripcion == null, params.fechaInicio == null, params.trabajador == null) return res.status(500).send({mensaje: "Por favor, ingrese la información deseada"});

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

function editarSolicitud(req, res) {
    var params = req.body
    var idSolicitud = req.params.solicitud;
    solicitudModel.findByIdAndUpdate(idSolicitud, {trabajo: params.trabajo, descripcion: params.descripcion, fechaInicio: params.fechaInicio, trabajador: params.trabajador, contratante: params.contratante},
        {new: true, useFindAndModify: false}, (err, solicitudActualizada) => {
            if(err) return res.status(500).send({mensaje: "Error al editar solicitud"})
            return res.status(200).send({solicitudActualizada})
        })
}

function eliminarSolicitud(req, res) {
    var idSolicitud = req.params.solicitud;
    solicitudModel.findByIdAndDelete(idSolicitud, (err, solicitudEliminada) => {
            if(err) return res.status(500).send({mensaje: "Error al eliminar solicitud"})
            return res.status(200).send({solicitudEliminada})
        })
}

function listarSolicitudes(req, res) {
    var idContratante = req.params.contratante
    solicitudModel.find({contratante: idContratante}, (err, solicitudesEncontradas) => {
            if(err) return res.status(500).send({mensaje: "Error al listar solicitudes"})
            return res.status(200).send({solicitudesEncontradas})
        })
}

module.exports = {
    crearSolicitud,
    editarSolicitud,
    eliminarSolicitud,
    listarSolicitudes,
}