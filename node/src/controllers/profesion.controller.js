'use strict'

const profesionModel = require('../models/profesion.model')

//FUNCION PARA CREAR UNA PROFESION

function crearProfesion (req, res){
    var profesionConstructor = new profesionModel();
    var params = req.body;

    profesionConstructor.nombreProfesion = params.nombreProfesion;
    profesionConstructor.imagen = params.imagen;

    profesionModel.find({ nombreProfesion: profesionConstructor.nombreProfesion}).exec((err, profesionEncontrada)=>{
        if(err) return res.status(500).send({ mensaje: 'Ha surgido un error'});
        if(profesionEncontrada && profesionEncontrada.length == 1) return res.status(500).send({mensaje: 'Esta profesion ya está en existencia, prueba con otra'});
        profesionConstructor.save((err, profesionGuardada) =>{
            if(err) return res.status(500).send({mensaje: 'Error al guardar la profesion'})
            return res.status(200).send({profesionGuardada})
        })        
    }
)}

module.exports = {
    crearProfesion
}
