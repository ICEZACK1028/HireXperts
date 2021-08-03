import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'app/models/usuario.model';
import { UsuarioService } from 'app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private _usuarioService: UsuarioService, private toastr: ToastrService, private _router: Router) { 
    this.usuarioModel = new Usuario("","","","","","","","",new Date(),"","","","",0,"","","","",false,0,false)
  }

  ngOnInit() {
  } 

  showNotification(from, align, color){
    switch(color){
      case 1:
      this.toastr.success(`<span class="now-ui-icons ui-1_check"></span> Cuenta registrada con éxito, puede iniciar sesión`, '', {
         timeOut: 8000,
         closeButton: true,
         enableHtml: true,
         toastClass: "alert alert-success alert-with-icon",
         positionClass: 'toast-' + from + '-' +  align
       });
      break;
      case 2:
      this.toastr.error(`<span class="now-ui-icons travel_info"></span> El usuario <b>${this.usuarioModel.usuario}</b> ya existe, pruebe con otro`, '', {
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

  registrarUsuario(){
    this._usuarioService.registro(this.usuarioModel).subscribe(
      Response =>{
        this.showNotification('top', 'right', 1);
        this.usuarioModel = Response.usuarioGuardado;
        this._router.navigate(['/login']);
      },error=>{
        this.showNotification('top', 'right', 2);
        console.log(<any>error);
      }
    )
  }

  regresar(){
    this._router.navigate(['/login']);
  }

  refreshPage(){
    window.location.reload();
  }

}
