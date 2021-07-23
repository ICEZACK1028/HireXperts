import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Usuario } from 'app/models/usuario.model';
import { UsuarioService } from 'app/services/usuario.service';
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

    constructor(private _usuarioService: UsuarioService, private _router: Router) { 
        this.usuarioModel = new Usuario("","","","","","","","","","","","","",0,"",{nombreProfesion:""},"","",false,0,false)
        this.usuarioLogin = new Usuario("","","","","","","","","","","","","",0,"",{nombreProfesion:""},"","",false,0,false)
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
            if(this.identidad.rol == "ROL_ADMIN")this._router.navigate(['/index'])
            if(this.identidad.rol == "ROL_USUARIO")this._router.navigate(['/index'])
            this._router.navigate(['/index'])
          },
          error => {
            console.log(<any>error);
            // Swal.fire({
            //     position: 'center',
            //     icon: 'error',
            //     title: `Usuario o contraseña
            //               incorrecta`,
            //     showConfirmButton: false,
            //     timer: 1500
            //   })
          }
        )
      }


}
