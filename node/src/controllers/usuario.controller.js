'use strict'

//Importaciones
const usuarioModel = require('../models/usuario.model');
const profesionModel = require('../models/profesion.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

//Funciones

//FUNCIÓN PARA REGISTRAR UN USUARIO
function registrarUsuario(req, res) {
    var usuarioConstructor = new usuarioModel();
    var params = req.body;

    usuarioConstructor.usuario = params.usuario;
    usuarioConstructor.rol = 'ROL_USUARIO';
    usuarioConstructor.nombre = params.nombre;
    usuarioConstructor.apellido = params.apellido;
    usuarioConstructor.telefono = params.telefono;
    usuarioConstructor.correo = params.correo;
    usuarioConstructor.nacimiento = params.nacimiento;
    usuarioConstructor.dpi = params.dpi;
    usuarioConstructor.direccion = params.direccion;
    usuarioConstructor.pais = params.pais;
    usuarioConstructor.ciudad = params.ciudad;
    usuarioConstructor.estrellas = 0;
    usuarioConstructor.imagen = params.imagen;

    usuarioModel.find({ usuario: usuarioConstructor.usuario }).exec((err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Ha surgido un error' });

        if (usuarioEncontrado && usuarioEncontrado.length >= 1) {
            return res.status(500).send({
                mensaje: `El usuario '${params.user}' ya está en uso. Prueba con otro`
            });
        } else {
            bcrypt.hash(params.password, null, null, (err, passwordEncriptada) => {
                usuarioConstructor.password = passwordEncriptada;

                usuarioConstructor.save((err, usuarioGuardado) => {
                    if (usuarioGuardado) {
                        return res.status(200).send({ usuarioGuardado });
                    } else {
                        console.log(err)
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

function obtenerUsuarios(req, res) {
    usuarioModel.find((err, usuariosEncontrados) => {
        if (err) return res.status(404).send({ mensaje: 'Error en la peticion para obtener todos los usuarios existentes' });
        if (!usuariosEncontrados) return res.status(404).send({ mensaje: 'No hay usuarios existentes' });
        return res.status(200).send({ usuariosEncontrados });
    })
}

function editarUsuarios(req, res) {
    var params = req.body
    var usuarioId = req.params.usuarioId

        usuarioModel.findOneAndUpdate({_id: usuarioId}, {usuario: params.usuario, 
            nombre: params.nombre, 
            apellido: params.apellido, 
            telefono: params.telefono, 
            correo: params.correo, 
            nacimiento: params.nacimiento, 
            dpi: params.dpi , 
            direccion: params.direccion, 
            ciudad: params.ciudad, 
            pais: params.pais, 
            imagen: params.imagen, 
            rol: params.rol,
            profesion: params.profesion,
            direccionP: params.direccionP,
            descripcionP: params.descripcionP
            }, {new: true, useFindAndModify:false}, (err, usuarioActualizado)=>{
            if(err) return res.status(500).send({mensaje: 'Error al actualizar el usuario'})
            if(!usuarioActualizado) return res.status(500).send({mensaje: 'No se ha encontrado el usuario'})
            return res.status(200).send({usuarioActualizado})
        })
}

function registrarProfesional(req, res) {
    var params = req.body
    var usuarioId = req.user.sub

    if (req.user.rol != 'ROL_USUARIO') return res.status(500).send({ mensaje: 'No tienes permisos para ser profesional' })
    usuarioModel.findByIdAndUpdate(usuarioId, {
        rol: 'ROL_PROFESIONAL', 
        profesion: params.profesion,
        descripcionP: params.descripcionP, 
        direccionP: params.direccionP
    }, { new: true, useFindAndModify: false },

        (err, profesionalRegistrado) => {
            if (err) return res.status(500).send({ mensaje: 'Error al registrar un profesional' });
            if (!profesionalRegistrado) return res.status(500).send({ mensaje: 'Error en la peticion' });
            return res.status(200).send({ profesionalRegistrado });
        })
}



function editarMiPerfil (req, res){
    var idUsuario = req.params.idUsuario;
    var params = req.body

    usuarioModel.findOneAndUpdate({_id: idUsuario}, {usuario:params.usuario, 
        nombre: params.nombre, 
        apellido: params.apellido, 
        telefono: params.telefono, 
        correo: params.correo, 
        nacimiento: params.nacimiento, 
        dpi: params.dpi , 
        direccion: params.direccion, 
        ciudad: params.ciudad, 
        pais: params.pais, 
        imagen: params.imagen, 
        profesion: params.profesion,
        descripcionP: params.descripcionP,
        direccionP: params.direccionP
        },{ new: true, useFindAndModify: false}, (err, perfilActualizado)=>{
        if (err) return res.status(500).send({mensaje: 'Error al editar mi perfil'});
        if(!perfilActualizado) return res.status(500).send({mensaje: 'No se ha podido actualizar mi perfil'});
        return res.status(200).send({perfilActualizado});
    });
}

function eliminarUsuarios(req, res) {
    var usuarioId = req.params.usuarioId
    usuarioModel.findOneAndDelete({ _id: usuarioId }, (err, usuarioEliminado) => {
        if (err) return res.status(500).send({ mensaje: 'El usuario no ha podido eliminarse' })
        return res.status(200).send({ mensaje: 'Usuario eliminado con exito' })
    })

}

function obtenerUsuarioId(req, res) {
    var idUsuario = req.params.idUsuario

    usuarioModel.findOne({ _id: idUsuario }).populate("profesion").exec((err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error al hacer la busqueda' })
        if (!usuarioEncontrado) return res.status(500).send({ mensaje: 'EL usuario no existe' })

        return res.status(200).send({ usuarioEncontrado })
    })
}

function obtenerUsuarioLogueado(req, res) {
    var idUsuario = req.user.sub

    usuarioModel.findById(idUsuario, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error al hacer la busqueda' })
        if (!usuarioEncontrado) return res.status(500).send({ mensaje: 'EL usuario no existe' })

        return res.status(200).send({ usuarioEncontrado })
    })
}

function obtenerProfesionales(req, res) {
    var rolUsuario = 'ROL_PROFESIONAL'
    usuarioModel.find({ rol: rolUsuario }).populate('profesion').exec((err, usuariosEncontrados) => {
        if (err) return res.status(500).send({ mensaje: 'Error al hacer la busqueda' })
        if (!usuariosEncontrados) return res.status(500).send({ mensaje: 'No existen usuarios profesionales' })
        return res.status(200).send({ usuariosEncontrados })
    })
}

function obtenerProfesionalesPorProfesion(req, res) {
    var profesionId = req.params.profesionId;
    usuarioModel.find({ profesion: profesionId }).populate('profesion').exec((err, usuariosEncontrados) => {
        if (err) return res.status(500).send({ mensaje: 'Error al hacer la busqueda' })
        if (!usuariosEncontrados) return res.status(500).send({ mensaje: 'No existen usuarios con esta profesion' })
        return res.status(200).send({ usuariosEncontrados })
    })
}

function obtenerProfesionalesPorEstrellasDescendente(req, res) {
    var rolUsuario = 'ROL_PROFESIONAL'
    usuarioModel.find({ rol: rolUsuario }, (err, usuariosOrdenados) => {
        if (err) return res.status(500).send({ mensaje: 'Error al hacer la busqueda' })
        if (!usuariosOrdenados) return res.status(500).send({ mensaje: 'No existen usuarios como para poder ordenar' })
        return res.status(200).send({ usuariosOrdenados })
    }).sort({ "estrellasP": -1 })

}

function obtenerProfesionalesEstadoTrue(req, res) {
    usuarioModel.find({ disponible: true }, (err, usuariosEncontrados) => {
        if (err) return res.status(500).send({ mensaje: 'Error al hacer la busqueda' })
        if (!usuariosEncontrados) return res.status(500).send({ mensaje: 'No existen usuarios Disponibles' })
        return res.status(200).send({ usuariosEncontrados })
    })
}

function obtenerProfesionalesNombre(req, res) {
    var rolProfesional = 'ROL_PROFESIONAL';
    var nombreProfesional = req.params.nombreProfesional;
    usuarioModel.find({ rol: rolProfesional, nombre: { $regex: nombreProfesional, $options: 'i' } }).populate('profesion').exec((err, usuariosEncontrados) => {
        if (err) return res.status(500).send({ mensaje: 'Error al hacer la busqueda' })
        if (!usuariosEncontrados || usuariosEncontrados.length == 0) return res.status(500).send({ mensaje: 'No se han encontrado profesionales' })
        return res.status(200).send({ usuariosEncontrados })
    })
}

function obtenerProfesionalesNombreProfesion(req, res) {
    var rolProfesional = 'ROL_PROFESIONAL';
    var nombreProfesion = req.params.nombreProfesion;
    profesionModel.findOne({ nombreProfesion: nombreProfesion }).exec((err, profesionEncontrada) => {
        if (err) return res.status(500).send({ mensaje: 'Error al hacer la busqueda' })
        if (!profesionEncontrada || profesionEncontrada.length == 0) return res.status(500).send({ mensaje: 'No se han encontrado profesiones' })
        usuarioModel.find({ profesion: profesionEncontrada._id, rol: rolProfesional }, (err, usuariosEncontrados) => {
            if (err) return res.status(500).send({ mensaje: "Error al hacer la busqueda" });
            if (!usuariosEncontrados || usuariosEncontrados.length == 0) return res.status(500).send({ mensaje: "No se han encontrado profesionales" });
            return res.status(200).send({ usuariosEncontrados });
        }).populate('profesion');
    })
}




module.exports = {
    registrarUsuario,
    login,
    obtenerUsuarioId,
    obtenerUsuarioLogueado,
    eliminarUsuarios,
    editarUsuarios,
    editarMiPerfil,
    obtenerUsuarios,
    obtenerUsuarioLogueado,
    registrarProfesional,
    obtenerProfesionales,
    obtenerProfesionalesPorProfesion,
    obtenerProfesionalesPorEstrellasDescendente,
    obtenerProfesionalesEstadoTrue,
    obtenerProfesionalesNombre,
    obtenerProfesionalesNombreProfesion,
}