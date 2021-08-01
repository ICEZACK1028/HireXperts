import { Component, OnInit } from '@angular/core';
import { Profesion } from 'app/models/profesion.model';
import { Usuario } from 'app/models/usuario.model';
import { ProfesionService } from 'app/services/profesion.service';
import { UsuarioService } from 'app/services/usuario.service';
import {NgbModal, ModalDismissReasons }from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-professional-register',
  templateUrl: './professional-register.component.html',
  styleUrls: ['./professional-register.component.scss'],
  providers: [UsuarioService, ProfesionService]
})
export class ProfessionalRegisterComponent implements OnInit {
  data : Date = new Date();
  focus;
  focus1;
  closeResult: string;

  public token
  public usuarioModelAdd
  public profesionModelAdd
  public profesionModelGet: Profesion


  constructor(private _usuarioService:UsuarioService, private _profesionService: ProfesionService, private modalService: NgbModal, private _router:Router) { 
    this.usuarioModelAdd = new Usuario("","","","","","","","","","","","","",0,"","","","",false,0,false)
    this.profesionModelAdd = new Profesion('','','')
  }

  obtenerProfesiones(){
    this._profesionService.obtenerProfesiones().subscribe(

      (response:any) => {
        console.log(response);
        this.profesionModelGet = response.profesionesEcontradas
      }
    )
    
  }

  agregarProfesion(){
    this._profesionService.agregarProfesion(this.profesionModelAdd).subscribe(
      response => {
        console.log(response);
        this.obtenerProfesiones()
      }
    )
  }

  registrarProfesional(){
    this._usuarioService.registrarProfesional(this.usuarioModelAdd,this.token).subscribe(
      response => {
        console.log(response);
        Swal.fire(
          'Listo!!!',
          'Se registró como profesional exitosamente',
          'success'
        )
        this._router.navigate(['/home'])
      },error => {
        Swal.fire(
          'Hubo un error!',
          'Intente de nuevo más tarde',
          'error'
        )
      }
    )
  }



  ngOnInit() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    this.obtenerProfesiones()
    this.token = this._usuarioService.getToken()

  }
  ngOnDestroy(){
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');

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

  
  

}
