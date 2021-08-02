import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'app/models/usuario.model';
import { UsuarioService } from 'app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public identidad;
  public usuarioModal;
  public color;
  public idUsuario;
  public token;
  public status = false;
  public isEnable: boolean;

  constructor(private _router: Router, public _usuarioService: UsuarioService, private toastr: ToastrService) { 
    this.usuarioModal = new Usuario("","","","","","","","",new Date(),"","","","",0,"","","","",false,0,false);
    this.token = this._usuarioService.getToken();
    this.identidad = this._usuarioService.getIdentidad();
  }

  ngOnInit() {
    this.verUsuario(this.identidad._id);
  }

  showNotification(from, align){

    switch(this.color){
      case 1:
      this.toastr.info('<span class="now-ui-icons ui-1_bell-53"></span> Perfil actualizado con éxito.', '', {
         timeOut: 8000,
         closeButton: true,
         enableHtml: true,
         toastClass: "alert alert-info alert-with-icon",
         positionClass: 'toast-' + from + '-' +  align
       });
      break;
      case 2:
      this.toastr.success(`<span class="now-ui-icons ui-1_bell-53"></span> Perfil actualizado con éxito.`, '', {
         timeOut: 8000,
         closeButton: true,
         enableHtml: true,
         toastClass: "alert alert-success alert-with-icon",
         positionClass: 'toast-' + from + '-' +  align
       });
      break;
      case 3:
      this.toastr.warning('<span class="now-ui-icons ui-1_bell-53"></span> Welcome to <b>Now Ui Dashboard</b> - a beautiful freebie for every web developer.', '', {
         timeOut: 8000,
         closeButton: true,
         enableHtml: true,
         toastClass: "alert alert-warning alert-with-icon",
         positionClass: 'toast-' + from + '-' +  align
       });
      break;
      case 4:
      this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Welcome to <b>Now Ui Dashboard</b> - a beautiful freebie for every web developer.', '', {
         timeOut: 8000,
         enableHtml: true,
         closeButton: true,
         toastClass: "alert alert-danger alert-with-icon",
         positionClass: 'toast-' + from + '-' +  align
       });
       break;
       case 5:
       this.toastr.show('<span class="now-ui-icons ui-1_bell-53"></span> Welcome to <b>Now Ui Dashboard</b> - a beautiful freebie for every web developer.', '', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-primary alert-with-icon",
          positionClass: 'toast-' + from + '-' +  align
        });
      break;
      default:
      break;
    }
}

notification(number){
  this.color = number;
}

  verUsuario(idUsuario) {
    this._usuarioService.verUsuario(idUsuario).subscribe(
      res => {
        this.usuarioModal = res.usuarioEncontrado;
      },
      err => {
        console.log(<any>err);
      }
    )
  };

editarUsuarios(){
    this._usuarioService.editarUsuario(this.usuarioModal).subscribe(
      res =>{
        console.log(res);
        this.verUsuario(this.usuarioModal._id);
      },
      err=>{
        console.log(<any>err);
      }
    )
  };

  Habilitar(){
    this.status = true;
  }

  Deshabilitar(){
    this.status = false;
  }
}
