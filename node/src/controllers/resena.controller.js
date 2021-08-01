'use strict'

const resenaModel = require('../models/resena.model');
const contratoModel = require('../models/contrato.model');

function crearResena(req, res) {
    var resenaConstructor = new resenaModel();
    var idContrato = req.params.contrato;
    var params = req.body;

    if(params.titulo == null,
       params.descripcion == null, 
       params.estrellas == null) return res.status(500).send({mensaje: "Ingrese los datos necesarios"})

    contratoModel.findById(idContrato, (err, contratoEncontrado) => {
        if (err) return res.status(500).send({mensaje: "Error al buscar contrato"})
        if (contratoEncontrado) {
            resenaConstructor.titulo = params.titulo;
            resenaConstructor.descripcion = params.descripcion;
            resenaConstructor.estrellas = params.estrellas;
            resenaConstructor.trabajador = contratoEncontrado.trabajador;
            resenaConstructor.contratante = contratoEncontrado.contratante;
            resenaConstructor.save((err, resenaGuardada) => {
                if(err) return res.status(200).send({mensaje: "Error al guardar resena"});
                return res.status(200).send({resenaGuardada});
            })
        }
    })
}

module.exports = {
    crearResena,
}
