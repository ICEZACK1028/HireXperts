import { Component, OnInit } from '@angular/core';
import { Usuario } from 'app/models/usuario.model';
import { UsuarioService } from 'app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  data : Date = new Date();
  focus;
  focus1;
  usuarioModel: Usuario;

  constructor(private _usuarioService: UsuarioService) { 
    this.usuarioModel = new Usuario("","","","","","","","","","","","","",0,"","","","",false,0,false)
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

  registrarUsuario(){
    this._usuarioService.registro(this.usuarioModel).subscribe(
      Response =>{
        this.usuarioModel = Response.usuarioGuardado;
        console.log(this.usuarioModel);
      },error=>{
        console.log(<any>error);
      }
    )
  }

  refreshPage(){
    window.location.reload();
  }

}
