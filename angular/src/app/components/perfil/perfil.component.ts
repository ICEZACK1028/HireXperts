import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'app/models/usuario.model';
import { UsuarioService } from 'app/services/usuario.service';
import * as Rellax from 'rellax';
import {NgbModal, ModalDismissReasons }from '@ng-bootstrap/ng-bootstrap';
import { contrato } from 'app/models/contrato.model';
import { ContratoService } from 'app/services/contrato.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  providers: [UsuarioService]
})
export class PerfilComponent implements OnInit {
  zoom: number = 14;
  lat: number = 44.445248;
  lng: number = 26.099672;
  styles: any[] = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}];
  data : Date = new Date();
  focus;
  focus1;
  closeResult: string;


  public idUsuario
  public usuarioIdModel
  public identidad
  public token
  public contratoModelAdd
  public statusSolicitud = 'solicitudProgreso'
  public statusTrabajo = 'trabajoProgreso'
  

  constructor(private _usuarioService: UsuarioService, private _activatedRoute: ActivatedRoute, private modalService: NgbModal,
    private _contratoService: ContratoService) { 
    this.identidad = this._usuarioService.getIdentidad();
    this.token = this._usuarioService.getToken()
    console.log(this.token);

    this.usuarioIdModel = new Usuario("","","","","","","","",Date(),"","","","",0,"","","","",false,0,false)
    this.contratoModelAdd = new contrato("","",new Date(),"","","","","",new Date(),0)
  }

  ngOnInit() {
    var rellaxHeader = new Rellax('.rellax-header');

      var body = document.getElementsByTagName('body')[0];
      body.classList.add('profile-page');
      var navbar = document.getElementsByTagName('nav')[0];
      navbar.classList.add('navbar-transparent');
      
      this._activatedRoute.paramMap.subscribe(dataRuta =>{
        this.idUsuario = dataRuta.get('idUsuario');
        console.log(this.idUsuario);
      })
      this.obtenerUsuarioId()

  }
  ngOnDestroy(){
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
        return  `with: ${reason}`;
    }
}

  // INICIO DE FUNCIONES

  obtenerUsuarioId(){
    this._usuarioService.obtenerUsuarioId(this.idUsuario,this.token).subscribe(
      (response:any) => {
        console.log(response);
        this.usuarioIdModel = response.usuarioEncontrado
      }
    )
  }

  solicitudInicio(){
    this._contratoService.solicitudInicio(this.contratoModelAdd,this.idUsuario,this.token).subscribe(
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

  statusSolicitudInicio(){
    this.statusSolicitud = 'solicitudInicio'
  }
  statusSolicitudProgreso(){
    this.statusSolicitud = 'solicitudProgreso'
  }
  statusSolicitudCancelada(){
    this.statusSolicitud = 'solicitudCancelada'
  }
  

  statusTrabajoProgreso(){
    this.statusTrabajo = 'trabajoProgreso'
  }
  statusTrabajoCancelado(){
    this.statusTrabajo = 'trabajoCancelado'
  }
  statusTrabajoFinalizado(){
    this.statusTrabajo = 'trabajoFinalizado'
  }


  
}
