'use strict'

//Importaciones
const usuarioModel = require('../models/usuario.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');
const { model } = require('mongoose');

//Funciones

//FUNCIÓN PARA REGISTRAR UN USUARIO
function registrarUsuario (req,res){
    var usuarioConstructor = new usuarioModel();
    var params = req.body;

    usuarioConstructor.usuario = params.usuario;
    usuarioConstructor.rol = 'ROL_USUARIO';
    usuarioConstructor.nombre = params.nombre;
    usuarioConstructor.apellido = params.apellido;
    usuarioConstructor.telefono = params.telefono;
    usuarioConstructor.correo = params.correo;
    usuarioConstructor.nacimiento = params.nacimiento;
    usuarioConstructor.DPI = params.DPI;
    usuarioConstructor.direccion = params.direccion;
    usuarioConstructor.pais = params.pais;
    usuarioConstructor.ciudad = params.ciudad;
    usuarioConstructor.estrellas = 0;
    usuarioConstructor.imagen = params.imagen;

    usuarioModel.find({ usuario: usuarioConstructor.usuario }).exec((err, usuarioEncontrado)=>{
        if(err) return res.status(500).send({ mensaje: 'Ha surgido un error' });

        if(usuarioEncontrado && usuarioEncontrado.length >= 1){
            return res.status(500).send({ 
                mensaje: `El usuario '${params.user}' ya está en uso. Prueba con otro` 
            });
        }else{
            bcrypt.hash(params.password, null, null, (err, passwordEncriptada)=>{
                usuarioConstructor.password = passwordEncriptada;

                usuarioConstructor.save((err, usuarioGuardado )=>{
                    if(usuarioGuardado){
                        return res.status(200).send({ usuarioGuardado });
                    }else{
                        return res.status(500).send({ 
                            mensaje: 'No se ha podido registrar el usuario, inténtalo de nuevo' 
                        });
                    };
                });
            });
        };
    });
}

function login(req, res) {
    var params = req.body;
    usuarioModel.findOne({ usuario: params.usuario }, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de usuario Usuario' });
        if (usuarioEncontrado) {
            bcrypt.compare(params.password, usuarioEncontrado.password, (err, passCorrecta) => {
                if (passCorrecta) {
                    if (params.obtenerToken === 'true') {
                        return res.status(200).send({ token: jwt.createToken(usuarioEncontrado) });
                    } else {
                        usuarioEncontrado.password = undefined;
                        return res.status(200).send({ usuarioEncontrado })
                    }
                } else {
                    return res.status(401).send({ mensaje: 'El usuario no se ha podido identificar' })
                }
            })
        } else {
            return res.status(500).send({ mensaje: 'Error al obtener usuario' });
        }
    })
    
}

module.exports = {
    registrarUsuario,
    login
}