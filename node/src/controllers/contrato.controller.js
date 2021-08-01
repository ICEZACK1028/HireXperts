'use strict'

const contratoModel = require('../models/contrato.model');
const usuarioModel = require('../models/usuario.model');

function solicitudInicio(req, res) {
    var contratoConstructor = new contratoModel();
    var idContratante = req.user.sub;
    var idTrabajador = req.params.trabajador;
    var rolProfesional = "ROL_PROFESIONAL";

    var params = req.body;

    usuarioModel.findById(idTrabajador, (err, trabajadorEncontrado) => {
        if (err) return res.status(500).send({ mensaje: "Error al buscar usuario" });
        if (!trabajadorEncontrado || trabajadorEncontrado == 0) return res.status(500).send({ mensaje: "Trabajador no encontrado" });
        if (trabajadorEncontrado.rol == rolProfesional) {
            contratoConstructor.titulo = params.titulo;
            contratoConstructor.descripcion = params.descripcion;
            contratoConstructor.fechaInicial = params.fechaInicial;
            contratoConstructor.trabajador = idTrabajador;
            contratoConstructor.contratante = idContratante;
            contratoConstructor.status = "solicitudInicio";
            contratoConstructor.descripcionR = null;
            contratoConstructor.precio = null;
            contratoConstructor.fechaFinal = null;

            contratoConstructor.save((err, contratoGuardado) => {
                if (err) return res.status(500).send({ mensaje: "Error al guardar contrato" });
                return res.status(200).send({ contratoGuardado })
            })
        } else {
            return res.status(500).send({ mensaje: "Error al asignar trabajador" });
        }
    })


}

function solicitudRespuesta(req, res) {
    var idContrato = req.params.contrato;
    var params = req.body;

    if (params.precio == null || params.descripcionR == null) return res.status(500).send({ mensaje: "Por favor, ingrese la información deseada" });

    contratoModel.findByIdAndUpdate(idContrato, { descripcionR: params.descripcionR, precio: params.precio, status: "solicitudRespuesta" }, { new: true, useFindAndModify: false }, (err, contratoActualizado) => {
        if (err) return res.status(500).send({ mensaje: "Error al buscar contrato" });
        return res.status(200).send({ contratoActualizado })
    }
    )
}

function trabajoProceso(req, res) {
    var idContrato = req.params.contrato;
    var params = req.body;

    if (params.respuesta == "aceptada") {
        contratoModel.findByIdAndUpdate(idContrato, { status: "trabajoProceso" }, { new: true, useFindAndModify: false }, (err, contratoActualizado) => {
            if (err) return res.status(500).send({ mensaje: "Error al buscar contrato" });
            return res.status(200).send({ contratoActualizado })
        }
        )
    } else {
        contratoModel.findByIdAndUpdate(idContrato, { status: "solicitudCancelada" }, { new: true, useFindAndModify: false }, (err, contratoActualizado) => {
            if (err) return res.status(500).send({ mensaje: "Error al buscar contrato" });
            return res.status(200).send({ contratoActualizado })
        }
        )
    }

}

function trabajoCancelado(req, res) {
    var idContrato = req.params.contrato;

    contratoModel.findByIdAndUpdate(idContrato, { status: "trabajoCancelado" }, { new: true, useFindAndModify: false }, (err, contratoActualizado) => {
        if (err) return res.status(500).send({ mensaje: "Error al cancelar contrato" });
        return res.status(200).send({ contratoActualizado })
    }
    )
}

function trabajoFinalizado(req, res) {
    var fechaFinalizacion = new Date();
    var idContrato = req.params.contrato;

    contratoModel.findByIdAndUpdate(idContrato, { status: "trabajoFinalizado", fechaFinal: fechaFinalizacion }, { new: true, useFindAndModify: false }, (err, contratoActualizado) => {
        if (err) return res.status(500).send({ mensaje: "Error al finalizar contrato" });
        return res.status(200).send({ contratoActualizado })
    }
    )
}

function obtenerNoContratosRecibidos(req, res) {
    var usuarioId = req.user.sub;
    contratoModel.find({ trabajador: usuarioId }, (err, contratosEncontrados) => {
        if (err) return res.status(500).send({ mensaje: 'Error al hacer la busqueda' })
        if (!contratosEncontrados) return res.status(500).send({ mensaje: 'No existen contrados Disponibles' })
        return res.status(200).send({ NoContratos: contratosEncontrados.length })
    })
}

function obtenerNoContratosEnviados(req, res) {
    var usuarioId = req.user.sub;
    contratoModel.find({ contratante: usuarioId }, (err, contratosEncontrados) => {
        if (err) return res.status(500).send({ mensaje: 'Error al hacer la busqueda' })
        if (!contratosEncontrados) return res.status(500).send({ mensaje: 'No existen contrados Disponibles' })
        return res.status(200).send({ NoContratos: contratosEncontrados.length })
    })
}

function obtenerContratanteSolicitudInicio(req, res) {
    var idContratante = req.user.sub;
    contratoModel.find({ contratante: idContratante, status: "solicitudInicio" }).populate('trabajador').sort({ fechaInicial: -1 }).exec((err, contratosEncontrados) => {
        if (err) return res.status(500).send({ mensaje: "Error al buscar contratos" });
        if (!contratosEncontrados) return res.status(500).send({ mensaje: "Error en la petición" });
        return res.status(200).send({ contratosEncontrados });
    })
}

function obtenerContratanteSolicitudRespuesta(req, res) {
    var idContratante = req.user.sub;
    contratoModel.find({ contratante: idContratante, status: "solicitudRespuesta" }).populate('trabajador').sort({ fechaInicial: -1 }).exec((err, contratosEncontrados) => {
        if (err) return res.status(500).send({ mensaje: "Error al buscar contratos" });
        if (!contratosEncontrados) return res.status(500).send({ mensaje: "Error en la petición" });
        return res.status(200).send({ contratosEncontrados });
    })
}

function obtenerContratanteSolicitudCancelada(req, res) {
    var idContratante = req.user.sub;
    contratoModel.find({ contratante: idContratante, status: "solicitudCancelada" }).populate('trabajador').sort({ fechaInicial: -1 }).exec((err, contratosEncontrados) => {
        if (err) return res.status(500).send({ mensaje: "Error al buscar contratos" });
        if (!contratosEncontrados) return res.status(500).send({ mensaje: "Error en la petición" });
        return res.status(200).send({ contratosEncontrados });
    })
}

function obtenerContratanteTrabajoProceso(req, res) {
    var idContratante = req.user.sub;

    contratoModel.find({ contratante: idContratante, status: "trabajoProceso" }).populate('trabajador').sort({ fechaInicial: -1 }).exec((err, contratosEncontrados) => {
        if (err) return res.status(500).send({ mensaje: "Error al buscar contratos" });
        if (!contratosEncontrados) return res.status(500).send({ mensaje: "Error en la petición" });
        return res.status(200).send({ contratosEncontrados });
    })
}

function obtenerContratanteTrabajoCancelado(req, res) {
    var idContratante = req.user.sub;

    contratoModel.find({ contratante: idContratante, status: "trabajoCancelado" }).populate('trabajador').sort({ fechaInicial: -1 }).exec((err, contratosEncontrados) => {
        if (err) return res.status(500).send({ mensaje: "Error al buscar contratos" });
        if (!contratosEncontrados) return res.status(500).send({ mensaje: "Error en la petición" });
        return res.status(200).send({ contratosEncontrados });
    })
}

function obtenerContratanteTrabajoFinalizado(req, res) {
    var idContratante = req.user.sub;

    contratoModel.find({ contratante: idContratante, status: "trabajoFinalizado" }).populate('trabajador').sort({ fechaInicial: -1 }).exec((err, contratosEncontrados) => {
        if (err) return res.status(500).send({ mensaje: "Error al buscar contratos" });
        if (!contratosEncontrados) return res.status(500).send({ mensaje: "Error en la petición" });
        return res.status(200).send({ contratosEncontrados });
    })
}

function obtenerTrabajadorSolicitudInicio(req, res) {
    var idTrabajador = req.user.sub;

    contratoModel.find({ trabajador: idTrabajador, status: "solicitudInicio" }).populate('contratante').sort({ fechaInicial: -1 }).exec((err, contratosEncontrados) => {
        if (err) return res.status(500).send({ mensaje: "Error al buscar contratos" });
        if (!contratosEncontrados) return res.status(500).send({ mensaje: "Error en la petición" });
        return res.status(200).send({ contratosEncontrados });
    })
}

function obtenerTrabajadorSolicitudRespuesta(req, res) {
    var idTrabajador = req.user.sub;

    contratoModel.find({ trabajador: idTrabajador, status: "solicitudRespuesta" }).populate('contratante').sort({ fechaInicial: -1 }).exec((err, contratosEncontrados) => {
        if (err) return res.status(500).send({ mensaje: "Error al buscar contratos" });
        if (!contratosEncontrados) return res.status(500).send({ mensaje: "Error en la petición" });
        return res.status(200).send({ contratosEncontrados });
    })
}

function obtenerTrabajadorSolicitudCancelada(req, res) {
    var idTrabajador = req.user.sub;

    contratoModel.find({ trabajador: idTrabajador, status: "solicitudCancelada" }).populate('contratante').sort({ fechaInicial: -1 }).exec((err, contratosEncontrados) => {
        if (err) return res.status(500).send({ mensaje: "Error al buscar contratos" });
        if (!contratosEncontrados) return res.status(500).send({ mensaje: "Error en la petición" });
        return res.status(200).send({ contratosEncontrados });
    })
}

function obtenerTrabajadorTrabajoProceso(req, res) {
    var idTrabajador = req.user.sub;

    contratoModel.find({ trabajador: idTrabajador, status: "trabajoProceso" }).populate('contratante').sort({ fechaInicial: -1 }).exec((err, contratosEncontrados) => {
        if (err) return res.status(500).send({ mensaje: "Error al buscar contratos" });
        if (!contratosEncontrados) return res.status(500).send({ mensaje: "Error en la petición" });
        return res.status(200).send({ contratosEncontrados });
    })
}

function obtenerTrabajadorTrabajoCancelado(req, res) {
    var idTrabajador = req.user.sub;

    contratoModel.find({ trabajador: idTrabajador, status: "trabajoCancelado" }).populate('contratante').sort({ fechaInicial: -1 }).exec((err, contratosEncontrados) => {
        if (err) return res.status(500).send({ mensaje: "Error al buscar contratos" });
        if (!contratosEncontrados) return res.status(500).send({ mensaje: "Error en la petición" });
        return res.status(200).send({ contratosEncontrados });
    })
}

function obtenerTrabajadorTrabajoFinalizado(req, res) {
    var idTrabajador = req.user.sub;

    contratoModel.find({ trabajador: idTrabajador, status: "trabajoFinalizado" }).populate('contratante').sort({ fechaInicial: -1 }).exec((err, contratosEncontrados) => {
        if (err) return res.status(500).send({ mensaje: "Error al buscar contratos" });
        if (!contratosEncontrados) return res.status(500).send({ mensaje: "Error en la petición" });
        return res.status(200).send({ contratosEncontrados });
    })
}

function obtenerContratosContratanteTrabajoFinalizado(req, res) {
    var idContratante = req.user.sub;

    contratoModel.find({ contratante: idContratante, status: "trabajoFinalizado" }).populate('contratante').sort({ fechaInicial: -1 }).limit(5).exec((err, contratosEncontrados) => {
        if (err) return res.status(500).send({ mensaje: "Error al buscar contratos" });
        if (!contratosEncontrados || contratosEncontrados.length == 0) return res.status(500).send({ mensaje: "No se han encontrado contratos" });
        return res.status(200).send({ contratosEncontrados });
    });
}

function obtenerContratosTrabajadorTrabajoFinalizado(req, res) {
    var idTrabajador = req.user.sub;

    contratoModel.find({ trabajador: idTrabajador, status: "trabajoFinalizado" }).populate('contratante').sort({ fechaInicial: -1 }).limit(5).exec((err, contratosEncontrados) => {
        if (err) return res.status(500).send({ mensaje: "Error al buscar contratos" });
        if (!contratosEncontrados || contratosEncontrados.length == 0) return res.status(500).send({ mensaje: "No se han encontrado contratos" });
        return res.status(200).send({ contratosEncontrados });
    });
}

module.exports = {
    solicitudInicio,
    solicitudRespuesta,
    trabajoProceso,
    trabajoCancelado,
    trabajoFinalizado,
    obtenerNoContratosRecibidos,
    obtenerNoContratosEnviados,
    obtenerContratanteSolicitudInicio,
    obtenerContratanteSolicitudCancelada,
    obtenerContratanteSolicitudRespuesta,
    obtenerContratanteTrabajoCancelado,
    obtenerContratanteTrabajoFinalizado,
    obtenerContratanteTrabajoProceso,
    obtenerTrabajadorSolicitudCancelada,
    obtenerTrabajadorSolicitudInicio,
    obtenerTrabajadorSolicitudRespuesta,
    obtenerTrabajadorTrabajoCancelado,
    obtenerTrabajadorTrabajoFinalizado,
    obtenerTrabajadorTrabajoProceso,
    obtenerContratosContratanteTrabajoFinalizado,
    obtenerContratosTrabajadorTrabajoFinalizado,
}