import { Component, OnInit } from '@angular/core';
import { Profesion } from 'app/models/profesion.model';
import { Usuario } from 'app/models/usuario.model';
import { ProfesionService } from 'app/services/profesion.service';
import { UsuarioService } from 'app/services/usuario.service';
import * as Rellax from 'rellax';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [ProfesionService, UsuarioService]
})
export class CategoriesComponent implements OnInit {

  data : Date = new Date();
  focus;
  focus1;
  public identidad
  public profesionModelGet: Profesion
  public profesionalModelGet: Usuario

  constructor(private _profesionService: ProfesionService, private _usuarioService: UsuarioService) { 

  }

  ngOnInit() {
    var rellaxHeader = new Rellax('.rellax-header');

      var body = document.getElementsByTagName('body')[0];
      body.classList.add('profile-page');
      var navbar = document.getElementsByTagName('nav')[0];
      navbar.classList.remove('navbar-transparent');

      this.obtenerProfesiones()
      this.obtenerProfesionales()
  }
  ngOnDestroy(){
      var body = document.getElementsByTagName('body')[0];
      body.classList.remove('profile-page');
      var navbar = document.getElementsByTagName('nav')[0];
      navbar.classList.remove('navbar-transparent');
  }

  obtenerProfesiones(){
    this._profesionService.obtenerProfesiones().subscribe(

      (response:any) => {
        console.log(response);
        this.profesionModelGet = response.profesionesEcontradas
      }
    )
    
  }

  obtenerProfesionales(){
    this._usuarioService.obtenerProfesionales().subscribe(
      (response:any) => {
        console.log(response);
        this.profesionalModelGet = response.usuariosEncontrados
        console.log(this.profesionalModelGet);
      }
    )
  }

}
