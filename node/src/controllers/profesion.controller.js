'use strict'

const profesionModel = require('../models/profesion.model');
const { param } = require('../routes/especialidad.routes');

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

//FUNCION PARA EDITAR UNA PROFESION

function editarProfesion (req, res){
    var params = req.body
    var idProfesion = req.params.idProfesion

    profesionModel.findOneAndUpdate({_id: idProfesion}, 
        {nombreProfesion: params.nombreProfesion, imagen: params.imagen}, 
        {new: true, useFindAndModify:false},
         (err, profesionActualizada)=>{
        if(err) return res.status(500).send({mensaje: 'Error al actualizar la profesion'})
        return res.status(200).send({profesionActualizada})
    })

}
//FUNCION PARA ELIMINAR UNA PROFESION

function eliminarProfesion (req, res){
    var idProfesion = req.params.idProfesion

    profesionModel.findOneAndDelete({_id: idProfesion}, (err, profesionEliminada)=>{
        if(err) return res.status(500).send({mensaje: 'La profesion no ha podido eliminarse'})
        return res.status(200).send({mensaje: 'Profesion eliminada con Éxito'})
    })

}
//FUNCION PARA OBTENER TODAS LAS PROFESIONES

function obtenerProfesiones (req, res){
    profesionModel.find().populate('profesion').exec((err, profesionesEcontradas)=>{
        if(err) return res.status(500).send({mensaje: 'Error al obtener las profesiones'})
        return res.status(200).send({profesionesEcontradas})
    })
}

module.exports = {
    crearProfesion,
    editarProfesion,
    eliminarProfesion,
    obtenerProfesiones
}
