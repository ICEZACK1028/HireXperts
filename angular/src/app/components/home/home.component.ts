import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'app/services/usuario.service';
import * as Rellax from 'rellax';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data : Date = new Date();
  focus;
  focus1;
  public identidad

  constructor(private _usuarioService: UsuarioService) { 
    this.identidad = this._usuarioService.getIdentidad()
  }

  ngOnInit() {
    var rellaxHeader = new Rellax('.rellax-header');

      var body = document.getElementsByTagName('body')[0];
      body.classList.add('profile-page');
  }
  ngOnDestroy(){
      var body = document.getElementsByTagName('body')[0];
      body.classList.remove('profile-page');
  }

  

}
