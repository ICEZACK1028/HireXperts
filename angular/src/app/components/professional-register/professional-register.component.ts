import { Component, OnInit } from '@angular/core';
import { Usuario } from 'app/models/usuario.model';
import { UsuarioService } from 'app/services/usuario.service';

@Component({
  selector: 'app-professional-register',
  templateUrl: './professional-register.component.html',
  styleUrls: ['./professional-register.component.scss'],
  providers: [UsuarioService]
})
export class ProfessionalRegisterComponent implements OnInit {
  data : Date = new Date();
  focus;
  focus1;

  public usuarioModelAdd


  constructor(private _usuarioService:UsuarioService) { 
    this.usuarioModelAdd = new Usuario("","","","","","","","","","","","","",0,"",{nombreProfesion:""},"","",false,0,false)
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

  

}
