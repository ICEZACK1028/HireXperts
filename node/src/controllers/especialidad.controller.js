'use strict'

const especialidadModel = require('../models/especialidad.model')

//FUNCION PARA CREAR UNA ESPECIALIDAD

function crearEspecialidad (req, res){
    var especialidadConstructor = new especialidadModel();
    var params = req.body;

    especialidadConstructor.nombreEspecialidad = params.nombreEspecialidad;

    especialidadModel.find({nombreEspecialidad: especialidadConstructor.nombreEspecialidad}).exec((err, especialidadEncontrada)=>{
        if(err) return res.status(500).send({ mensaje: 'Ha surgido un error'});
        if(especialidadEncontrada && especialidadEncontrada.length == 1) return res.status(500).send({mensaje: 'Esta especialidad ya está en existencia, prueba con otra'});
        especialidadConstructor.save((err, especialidadGuardada) =>{
            if(err) return res.status(500).send({mensaje: 'Error al guardar la especialidad'})
            return res.status(200).send({especialidadGuardada})
        })
    })
}

//FUNCION PARA OBTENER ESPECIALIDADES

function obtenerEspecialidades(req, res){
    especialidadModel.find().populate('especialidad').exec((err, especialidadesEncontradas)=>{
        if(err) return res.status(500).send({mensaje: 'Error al obtener las especialidades'})
        return res.status(200).send({especialidadesEncontradas})
    })
}
//FUNCION PARA EDITAR UNA ESPECIALIDAD

function editarEspecialidad(req, res){
    var params = req.body
    var idEspecialidad = req.params.idEspecialidad

    especialidadModel.findOneAndUpdate({_id: idEspecialidad}, {nombreEspecialidad: params.nombreEspecialidad}, {new: true, useFindAndModify: false}, (err, especialidadActualizada)=>{
        if(err) return res.status(500).send({mensaje: 'Error al actualizar la especialidad'})
        return res.status(200).send({especialidadActualizada})
    })
}
//FUNCION PARA ELIMINAR UNA ESPECIALIDAD

function eliminarEspecialidad(req, res){
    var idEspecialidad = req.params.idEspecialidad

    especialidadModel.findOneAndDelete({_id: idEspecialidad}, (err, especialidadEncontrada)=>{
        if(err) return res.status(500).send({mensaje: 'La especialidad no ha podido eliminarse'})
        return res.status(200).send({mensaje: 'Especialidad eliminada con Exito'})
    })
}



module.exports = {
    crearEspecialidad,
    obtenerEspecialidades,
    editarEspecialidad,
    eliminarEspecialidad
}
