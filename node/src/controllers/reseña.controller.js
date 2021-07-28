'use strict'

const reseñaModel = require('../models/reseña.model');

function crearReseña(req, res) {
    var reseñaContructor = new reseñaModel();
    var idContrato = req.params.contrato;
    var params = req.body;

    if(params.titulo == null,
       params.descripcion == null, 
       params.estrellas == null) return res.status(500).send({mensaje: "Ingrese los datos necesarios"})

    reseñaContructor.titulo = params.titulo;
    reseñaContructor.descripcion = params.descripcion;
    reseñaContructor.estrellas = params.estrellas;

    reseñaConstructor.save((err, reseñaGuardada) => {
        if(err) return res.status(200).send({mensaje: "Error al guardar reseña"});
        return res.status(200).send({reseñaGuardada});
    })
}

module.exports = {
    crearReseña,
}
