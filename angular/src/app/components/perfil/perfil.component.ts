import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'app/models/usuario.model';
import { UsuarioService } from 'app/services/usuario.service';
import * as Rellax from 'rellax';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { contrato } from 'app/models/contrato.model';
import { ContratoService } from 'app/services/contrato.service';
import { resena } from 'app/models/resena.model';
import { ResenaService } from 'app/services/resena.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  providers: [UsuarioService, ContratoService, ResenaService]
})
export class PerfilComponent implements OnInit {
  zoom: number = 14;
  lat: number = 44.445248;
  lng: number = 26.099672;
  styles: any[] = [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }];
  data: Date = new Date();
  focus;
  focus1;
  closeResult: string;


  public idUsuario
  public usuarioIdModel
  public identidad
  public token
  public statusSolicitud = 'solicitudProgreso'
  public statusTrabajo = 'trabajoFinalizado'
  public statusEnvio = 'enviado'
  public idContrato

  //CRUD
  public contratoModelAdd
  public contratoPut
  public contratoModelGet: contrato
  public usuarioEditModel

  //SOLICITUDES
  public contratoSolicitud: contrato
  public contratoSolicitudCancelada: contrato
  public contratoSolicitudRespuesta: contrato

  public contratoSolicitudAdd: contrato
  //TRABAJOS
  public contratoTrabajoProceso: contrato
  public contratoTrabajoFinalizado: contrato
  public contratoTrabajoCancelado: contrato
  public contratoTrabajoUltimos: contrato

  //SOLICITUDES TRABAJADOR
  public contratoTabajadorSolicitud: contrato
  public contratoTrabajadorProceso: contrato
  public contratoTrabajadorFinalizado: contrato
  public contratoTrabajadorCancelado: contrato

  //RESPUESTA TRABAJADOR A USUARIO
  public contratoRespuesta: contrato

  //ULTIMOS TRABAJOS
  public ulitmosContratosContratante: contrato
  public ulitmosContratosTrabajador: contrato

  //RESEÑA
  public resenaModel: resena
  public resenaModelGet: resena

  constructor(private _usuarioService: UsuarioService, private _resenaService: ResenaService, private _activatedRoute: ActivatedRoute, private modalService: NgbModal,
    private _contratoService: ContratoService) {
    this.identidad = this._usuarioService.getIdentidad();
    this.token = this._usuarioService.getToken()
    console.log(this.token);

    this.usuarioIdModel = new Usuario("", "", "", "", "", "", "", "", Date(), "", "", "", "", 0, "", "", "", "", false, 0, false)
    this.usuarioEditModel = new  Usuario("", "", "", "", "", "", "", "", Date(), "", "", "", "", 0, "", "", "", "", false, 0, false)
    this.contratoModelAdd = new contrato("", "", new Date(), "", "", "", "", "", new Date(), 0)
    this.contratoPut = new contrato("", "", new Date(), "", "", "", "", "", new Date(), 0)
    this.contratoRespuesta = new contrato("", "", new Date(), "", "", "", "", "", new Date(), 0)
    this.contratoSolicitudAdd = new contrato("", "", new Date(), "", "", "", "", "", new Date(), 0)
    this.resenaModel = new resena("", "", "", "", "", 0)

  }

  ngOnInit() {
    var rellaxHeader = new Rellax('.rellax-header');

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');

    this._activatedRoute.paramMap.subscribe(dataRuta => {
      this.idUsuario = dataRuta.get('idUsuario');
      console.log(this.idUsuario);
    })
    this.obtenerUsuarioId()
    this.obtenerContratanteSolicitudInicio()
    this.obtenerContratanteSolicitudCancelada()
    this.obtenerContratanteSolicitudRespuesta()
    this.obtenerContratanteTrabajoProceso()
    this.obtenerContratanteTrabajoFinalizado()
    this.obtenerContratanteTrabajoCancelado()

    this.obtenerTrabajadorSolicitudRespuesta()
    this.obtenerTrabajadorSolicitudInicio()
    this.obtenerTrabajadorTrabajoProceso()
    this.obtenerTrabajadorTrabajoFinalizado()
    this.obtenerTrabajadorTrabajoCancelado()

    this.obtenerContratosContratanteTrabajoFinalizado()
    this.obtenerContratosTrabajadorTrabajoFinalizado()
    this.obtenerResenaTrabajador()

  }
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

  open(content, type) {
    if (type === 'sm') {
      console.log('aici');
      this.modalService.open(content, { size: 'sm' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
      this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // INICIO DE FUNCIONES

  obtenerUsuarioId() {
    this._usuarioService.obtenerUsuarioId(this.idUsuario, this.token).subscribe(
      (response: any) => {
        console.log(response);
        this.usuarioIdModel = response.usuarioEncontrado
      }
    )
  }

  solicitudInicio() {
    this._contratoService.solicitudInicio(this.contratoModelAdd, this.idUsuario, this.token).subscribe(
      response => {
        console.log(response.contratoGuardado);
        Swal.fire(
          'Listo!!!',
          'Se envió la solicitud con exito',
          'success'
        )
      }
    )
  }

  crearResena() {
    this._resenaService.crearResena(this.resenaModel, this.idContrato).subscribe(
      (response:any) => {
        console.log(response);
        this.resenaModel = response.resenaGuardada
      }
    )
  }


  //SOLICITUD
  // CONTRATANTE
  obtenerContratanteSolicitudInicio() {
    this._contratoService.obtenerContratanteSolicitudInicio(this.token).subscribe(
      (response: any) => {
        console.log(response);
        this.contratoSolicitud = response.contratosEncontrados
      }
    )
  }
  obtenerContratanteSolicitudCancelada() {
    this._contratoService.obtenerContratanteSolicitudCancelada(this.token).subscribe(
      (response: any) => {
        console.log(response);
        this.contratoSolicitudCancelada = response.contratosEncontrados
      }
    )
  }
  obtenerContratanteTrabajoProceso() {
    this._contratoService.obtenerContratanteTrabajoProceso(this.token).subscribe(
      (response: any) => {
        console.log(response);
        this.contratoTrabajoProceso = response.contratosEncontrados
      }
    )
  }
  obtenerContratanteTrabajoFinalizado() {
    this._contratoService.obtenerContratanteTrabajoFinalizado(this.token).subscribe(
      (response: any) => {
        console.log(response);
        this.contratoTrabajoFinalizado = response.contratosEncontrados
      }
    )
  }
  obtenerContratanteTrabajoCancelado() {
    this._contratoService.obtenerContratanteTrabajoCancelado(this.token).subscribe(
      (response: any) => {
        console.log(response);
        this.contratoTrabajoCancelado = response.contratosEncontrados
      }
    )
  }
  obtenerContratanteSolicitudRespuesta() {
    this._contratoService.obtenerContratanteSolicitudRespuesta(this.token).subscribe(
      (response: any) => {
        console.log(response);
        this.contratoSolicitudRespuesta = response.contratosEncontrados
      }
    )
  }



  solicitudCancelada(id) {
    this.obtenerIdContrato(id)
    this._contratoService.solicitudCancelada(this.token, this.idContrato, this.contratoSolicitudAdd).subscribe(
      response => {
        console.log(response);
        this.actualizar()
      }
    )
  }
  trabajoProceso(id) {
    this.obtenerIdContrato(id)
    this._contratoService.trabajoProceso(this.token, this.idContrato, this.contratoSolicitudAdd).subscribe(
      response => {
        console.log(response);
        this.actualizar()
      }
    )
  }
  trabajoFinalizado(id) {
    this.obtenerIdContrato(id)
    this.obtenerContratoId(id)
    this._contratoService.trabajoFinalizado(this.token, this.idContrato, this.contratoSolicitudAdd).subscribe(
      response => {
        console.log(response);
        this.actualizar()
      }
    )
  }
  trabajoCancelado(id) {
    this.obtenerIdContrato(id)
    this._contratoService.trabajoCancelado(this.token, this.idContrato, this.contratoPut).subscribe(
      response => {
        console.log(response);
        this.actualizar()

      }
    )
  }

  //FUNCIONES TRABAJADOR
  obtenerTrabajadorSolicitudInicio() {
    this._contratoService.obtenerTrabajadorSolicitudInicio(this.token).subscribe(
      (response: any) => {
        console.log(response);
        this.contratoTabajadorSolicitud = response.contratosEncontrados
      }
    )
  }
  solicitudRespuesta() {
    this._contratoService.solicitudRespuesta(this.token, this.contratoRespuesta, this.idContrato).subscribe(
      response => {
        console.log(response);
        this.obtenerTrabajadorSolicitudInicio()

      }
    )
  }
  obtenerTrabajadorSolicitudRespuesta() {
    this._contratoService.obtenerTrabajadorSolicitudRespuesta(this.token).subscribe(
      (response: any) => {
        console.log(response);
        // this.contratoSolicitudRespuesta = response.contratosEncontrados
      }
    )
  }
  obtenerTrabajadorTrabajoProceso() {
    this._contratoService.obtenerTrabajadorTrabajoProceso(this.token).subscribe(
      (response: any) => {
        console.log(response);
        this.contratoTrabajadorProceso = response.contratosEncontrados
      }
    )
  }
  obtenerTrabajadorTrabajoFinalizado() {
    this._contratoService.obtenerTrabajadorTrabajoFinalizado(this.token).subscribe(
      (response: any) => {
        console.log(response);
        this.contratoTrabajadorFinalizado = response.contratosEncontrados
      }
    )
  }
  obtenerTrabajadorTrabajoCancelado() {
    this._contratoService.obtenerTrabajadorTrabajoCancelado(this.token).subscribe(
      (response: any) => {
        console.log(response);
        this.contratoTrabajadorCancelado = response.contratosEncontrados
      }
    )
  }

  //ULTIMOS TRABAJOS
  obtenerContratosContratanteTrabajoFinalizado() {
    this._contratoService.obtenerContratosContratanteTrabajoFinalizado(this.token).subscribe(
      (response: any) => {
        console.log(response);
        this.ulitmosContratosContratante = response.contratosEncontrados
      }
    )
  }
  obtenerContratosTrabajadorTrabajoFinalizado() {
    this._contratoService.obtenerContratosTrabajadorTrabajoFinalizado(this.token).subscribe(
      (response: any) => {
        console.log(response);
        this.ulitmosContratosTrabajador = response.contratosEncontrados
      }
    )
  }

  obtenerContratoId(id){
    this._contratoService.obtenerContratoId(id).subscribe(
      (response:any)=> {
        console.log(response);
        this.contratoModelGet = response.contratoEncontrado
      }
    )
  }

  actualizar() {
    this.obtenerContratanteSolicitudInicio()
    this.obtenerContratanteSolicitudCancelada()
    this.obtenerContratanteSolicitudRespuesta()
    this.obtenerContratanteTrabajoProceso()
    this.obtenerContratanteTrabajoFinalizado()
    this.obtenerContratanteTrabajoCancelado()

    this.obtenerTrabajadorSolicitudRespuesta()
    this.obtenerTrabajadorSolicitudInicio()
    this.obtenerTrabajadorTrabajoProceso()
    this.obtenerTrabajadorTrabajoFinalizado()
    this.obtenerTrabajadorTrabajoCancelado()

    this.obtenerContratosContratanteTrabajoFinalizado()
    this.obtenerContratosTrabajadorTrabajoFinalizado()
    this.obtenerResenaTrabajador()
  }

  obtenerIdContrato(id) {
    this.idContrato = id
    console.log(this.idContrato);
  }

  statusSolicitudInicio() {
    this.statusSolicitud = 'solicitudInicio'
  }
  statusSolicitudProgreso() {
    this.statusSolicitud = 'solicitudProgreso'
  }
  statusSolicitudCancelada() {
    this.statusSolicitud = 'solicitudCancelada'
  }
  statusSolicitudResponder() {
    this.statusSolicitud = 'solicitudResponder'
  }


  statusTrabajoFinalizado() {
    this.statusTrabajo = 'trabajoFinalizado'
  }
  statusTrabajoProgreso() {
    this.statusTrabajo = 'trabajoProgreso'
  }
  statusTrabajoCancelado() {
    this.statusTrabajo = 'trabajoCancelado'
  }

  statusEnviado() {
    this.statusEnvio = 'enviado'
  }
  statusRecibido() {
    this.statusEnvio = 'recibido'
  }

  //RESEÑASSSS
  obtenerResenaTrabajador(){
    this._resenaService.obtenerResenaTrabajador(this.identidad._id).subscribe(
      (response:any) => {
        console.log(response);
        this.resenaModelGet = response.reseñasEncontradas
      }
    )
  }

  //Editar Perfil

  editarMiPerfil(){
    
    this._usuarioService.editarMiPerfil(this.usuarioIdModel, this.identidad._id, this.token).subscribe(
      (response:any)=>{
        console.log(response);
        this.usuarioIdModel = response.perfilActualizado
        this.obtenerUsuarioId()
      }
    )
  }

}
