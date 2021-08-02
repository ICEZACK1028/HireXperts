import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'app/services/usuario.service';
import { Usuario } from 'app/models/usuario.model';
import {NgbModal, ModalDismissReasons }from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-admin',
  templateUrl: './usuarios-admin.component.html',
  styleUrls: ['./usuarios-admin.component.css'],
  providers: [UsuarioService]
})
export class UsuariosAdminComponent implements OnInit {
  public usuarios;
  public usuarioModal;
  public usuarioModalAdd;
  readonly = null;
  public closeResult: String;

  constructor(private _usuarioService: UsuarioService, private modalService: NgbModal) { 
    this.usuarioModal = new Usuario("","","","","","","","",new Date(),"","","","",0,"","","","",false,0,false);
    this.usuarioModalAdd = new Usuario("","","","","","","","",new Date(),"","","","",0,"","","","",false,0,false);
    
  }

  ngOnInit() { 
    this.obtenerUsuarios();
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


  obtenerUsuarios(){
    this._usuarioService.obtenerUsuarios().subscribe(
      response=>{
        this.usuarios = response.usuariosEncontrados
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  registrarUsuario(){
    this._usuarioService.registro(this.usuarioModalAdd).subscribe(
      Response =>{
        this.usuarioModalAdd = Response.usuarioGuardado;
        console.log(this.usuarioModalAdd);
        this.obtenerUsuarios();
      },error=>{
        console.log(<any>error);
      }
    )
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
        
        this.obtenerUsuarios();
      },
      err=>{
        console.log(<any>err);
      }
    )
  }

  eliminarUsuarios(idUsuario){
    this._usuarioService.eliminarUsuario(idUsuario).subscribe(
      res =>{
        this.obtenerUsuarios();
      },
      err=>{
        console.log(<any>err);
      }
    )
  }

  mostrar(){
    console.log(this.usuarioModal);
  }

}
