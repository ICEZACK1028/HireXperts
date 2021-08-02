'use strict'

const resenaModel = require('../models/resena.model');
const contratoModel = require('../models/contrato.model');

function crearResena(req, res) {
    var resenaConstructor = new resenaModel();
    var idContrato = req.params.contrato;
    var params = req.body;

    if (params.titulo == null,
        params.descripcion == null,
        params.estrellas == null) return res.status(500).send({ mensaje: "Ingrese los datos necesarios" })

    contratoModel.findById(idContrato, (err, contratoEncontrado) => {
        if (err) return res.status(500).send({ mensaje: "Error al buscar contrato" })
        if (contratoEncontrado) {
            resenaConstructor.titulo = params.titulo;
            resenaConstructor.descripcion = params.descripcion;
            resenaConstructor.estrellas = params.estrellas;
            resenaConstructor.trabajador = contratoEncontrado.trabajador;
            resenaConstructor.contratante = contratoEncontrado.contratante;
            resenaConstructor.contrato = idContrato;
            resenaConstructor.save((err, resenaGuardada) => {
                if (err) return res.status(200).send({ mensaje: "Error al guardar resena" });
                return res.status(200).send({ resenaGuardada });
            })
        }
    })
}

function editarResena(req, res) {
    var params = req.body
    var idResena = req.params.idResena
    resenaModel.findOneAndUpdate({ _id: idResena }, { titulo: params.titulo, descripcion: params.descripcion, estrellas: params.estrellas, trabajador: params.trabajador, contratante: params.contratante }, { new: true, useFindAndModify: false }, (err, resenaActualizada) => {
        if (err) return res.status(500).send({ mensaje: 'Error al actualizar la resena' })
        return res.status(200).send({ resenaActualizada })
    })
}

function eliminarResena(req, res) {
    var idResena = req.params.idResena
    resenaModel.findOneAndDelete({ _id: idResena }, (err, resenaEncontrada) => {
        if (err) return res.status(500).send({ mensaje: 'La Reseña no ha podido eliminarse' })
        return res.status(200).send({ mensaje: 'Reseña eliminada con Éxito' })
    })
}


function obtenerResenaContratante(req, res) {
    var idTrabajador = req.user.sub
    resenaModel.find({ contratante: idTrabajador }, (err, reseñasEncontradas) => {
        if (err) return res.status(500).send({ mensaje: 'Error al hacer la busqueda' })
        if (!reseñasEncontradas || reseñasEncontradas.length == 0) return res.status(500).send({ mensaje: 'No existen reseñas' })
        return res.status(200).send({ reseñasEncontradas })
    })
}

function obtenerResenaTrabajador(req, res) {
    var idTrabajador = req.params.idTrabajador
    resenaModel.find({ trabajador: idTrabajador }).populate('contratante').populate('trabajador').populate('contrato').exec((err, reseñasEncontradas) => {
        if (err) return res.status(500).send({ mensaje: 'Error al hacer la busqueda' })
        // if(!reseñasEncontradas || reseñasEncontradas.length == 0) return res.status(500).send({mensaje:'No existen reseñas'})
        return res.status(200).send({ reseñasEncontradas })
    })
}

module.exports = {
    crearResena,
    obtenerResenaTrabajador,
    obtenerResenaContratante,
    editarResena,
    eliminarResena
}
