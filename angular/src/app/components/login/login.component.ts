import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Usuario } from 'app/models/usuario.model';
import { UsuarioService } from 'app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
// import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit {

    public usuarioModel: Usuario
    public usuarioLogin: Usuario
    public token
    public identidad
    data : Date = new Date();
    focus;
    focus1;

    constructor(private _usuarioService: UsuarioService, private _router: Router, private toastr: ToastrService) { 
        this.usuarioModel = new Usuario("","","","","","","","",new Date(),"","","","",0,"","","","",false,0,false)
        this.usuarioLogin = new Usuario("","","","","","","","",new Date(),"","","","",0,"","","","",false,0,false)
    }

    ngOnInit() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
    }
    ngOnDestroy(){
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }

    showNotification(from, align, color){
      switch(color){
        case 1:
        this.toastr.success(`<span class="now-ui-icons ui-1_check"></span> Bienvenido <b>${this.usuarioLogin.usuario}<b>`, '', {
           timeOut: 8000,
           closeButton: true,
           enableHtml: true,
           toastClass: "alert alert-success alert-with-icon",
           positionClass: 'toast-' + from + '-' +  align
         });
        break;
        case 2:
        this.toastr.error(`<span class="now-ui-icons travel_info"></span> Usuario y/o contraseña incorrectos`, '', {
           timeOut: 8000,
           closeButton: true,
           enableHtml: true,
           toastClass: "alert alert-danger alert-with-icon",
           positionClass: 'toast-' + from + '-' +  align
         });
        break;
        default:
        break;
      }
  }


    getToken(){
        this._usuarioService.login(this.usuarioLogin,'true').subscribe(
          response => {
            this.token = response.token;
            sessionStorage.setItem('token',this.token)
          },
          error=> {
            console.log(<any>error);
          }
        )
      }
    
      login(){
        this._usuarioService.login(this.usuarioLogin).subscribe(
          response => {
            this.identidad = response.usuarioEncontrado;
            sessionStorage.setItem('identidad', JSON.stringify(this.identidad))
            this.getToken();
            this.showNotification('bottom', 'right', 1);
            if(this.identidad.rol == "ROL_ADMIN")this._router.navigate(['/usuarios-admin'])
            if(this.identidad.rol == "ROL_PROFESIONAL")this._router.navigate(['/home'])
            if(this.identidad.rol == "ROL_USUARIO")this._router.navigate(['/home'])
            // this._router.navigate(['/home'])
          },
          error => {
            this.showNotification('bottom', 'right', 2);
            console.log(<any>error);
          }
        )
      }


}
