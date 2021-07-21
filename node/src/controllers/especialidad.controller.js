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

module.exports = {
    crearEspecialidad
}
