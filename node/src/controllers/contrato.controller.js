'use strict'

const contratoModel = require('../models/contrato.model');

function solicitudInicio(req, res) {
    var contratoConstructor = new contratoModel();
    var idContratante = req.user.sub;
    var idTrabajador = req.params.trabajador;

    var params = req.body;

    // if(params.titulo == null || params.descripcion == null || params.fechaInicial == null) return res.status(500).send({mensaje: "Por favor, ingrese la información deseada"});

    contratoConstructor.titulo = params.titulo;
    contratoConstructor.descripcion = params.descripcion;
    contratoConstructor.fechaInicial = params.fechaInicial;
    contratoConstructor.trabajador = idTrabajador;
    contratoConstructor.contratante = idContratante;
    contratoConstructor.status = "solicitudInicio";
    contratoConstructor.descripcionR = null;
    contratoConstructor.precio = null;
    contratoConstructor.fechaFinal = null;

    contratoModel.find({trabajo: contratoConstructor.trabajo, fechaInicio: contratoConstructor.fechaInicio, trabajador: contratoConstructor.trabajador})
    .exec((err, contratoEncontrada) => {
        if(err) return res.status(500).send({mensaje: "Error al buscar contrato"});
        if(contratoEncontrada && contratoEncontrada.length >= 1 ) return res.status(500).send({mensaje: "Contrato ya existente"});
        contratoConstructor.save((err, contratoGuardado) => {
            if(err) return res.status(500).send({mensaje: "Error al guardar contrato"});
            return res.status(200).send({contratoGuardado})
        })
    })
}

function solicitudRespuesta(req, res) {
    var idContrato = req.params.contrato;
    var params = req.body;

    if(params.precio == null || params.descripcionR == null ) return res.status(500).send({mensaje: "Por favor, ingrese la información deseada"});

    contratoModel.findByIdAndUpdate(idContrato, {descripcionR: params.descripcionR, precio: params.precio, status: "solicitudRespuesta"}, {new: true, useFindAndModify:false}, (err, contratoActualizado) => {
        if(err) return res.status(500).send({mensaje: "Error al buscar contrato"});
        return res.status(200).send({contratoActualizado})
    }
    )}

function trabajoProceso(req, res) {
    var idContrato = req.params.contrato;
    var params = req.body;
   
    if(params.respuesta == "aceptada") {
        contratoModel.findByIdAndUpdate(idContrato, {status: "trabajoProceso"}, {new: true, useFindAndModify:false}, (err, contratoActualizado) => {
            if(err) return res.status(500).send({mensaje: "Error al buscar contrato"});
               return res.status(200).send({contratoActualizado})
        }
        )
    } else {
        contratoModel.findByIdAndUpdate(idContrato, {status: "solicitudCancelada"}, {new: true, useFindAndModify:false}, (err, contratoActualizado) => {
            if(err) return res.status(500).send({mensaje: "Error al buscar contrato"});
               return res.status(200).send({contratoActualizado})
        }
        )
    }
    
    }

module.exports = {
    solicitudInicio,
    solicitudRespuesta,
    trabajoProceso,

}