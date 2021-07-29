'use strict'

const contratoModel = require('../models/contrato.model');

function crearContrato(req, res) {
    var contratoConstructor = new contratoModel();
    var idContratante = req.user.sub;
    var idTrabajador = req.params.trabajador;

    var params = req.body;

    if(params.trabajo == null, params.descripcion == null, params.fechaInicio == null, params.trabajador == null) return res.status(500).send({mensaje: "Por favor, ingrese la información deseada"});

    contratoConstructor.trabajo = params.trabajo;
    contratoConstructor.descripcion = params.descripcion;
    contratoConstructor.fechaInicio = params.fechaInicio;
    contratoConstructor.trabajador = idTrabajador;
    contratoConstructor.contratante = idContratante;

    contratoModel.find({trabajo: contratoConstructor.trabajo, fechaInicio: contratoConstructor.fechaInicio, trabajador: contratoConstructor.trabajador})
    .exec((err, contratoEncontrada) => {
        if(err) return res.status(500).send({mensaje: "Error al buscar contrato"});
        if(contratoEncontrada && contratoEncontrada.length >= 1 ) return res.status(500).send({mensaje: "Contrato ya existente"});
        contratoConstructor.save((err, contratoGuardado) => {
            if(err) return res.status(500).send({mensaje: "Error al guardar contrato"});
            return res.status(200).send(contratoGuardado)
        })
    })
}

module.exports = {
    crearContrato,
}