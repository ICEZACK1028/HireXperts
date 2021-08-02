import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'app/models/usuario.model';
import { UsuarioService } from 'app/services/usuario.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public identidad;
  public usuarioModal;
  public idUsuario;
  public token;
  public status = false;
  public isEnable: boolean;

  constructor(private _router: Router, public _usuarioService: UsuarioService) { 
    this.usuarioModal = new Usuario("","","","","","","","",new Date(),"","","","",0,"","","","",false,0,false);
    this.token = this._usuarioService.getToken();
    this.identidad = this._usuarioService.getIdentidad();
  }

  ngOnInit() {
    this.verUsuario(this.identidad._id);
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
