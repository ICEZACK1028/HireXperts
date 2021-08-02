import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons }from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'app/components/login/login.component';
import { Profesion } from 'app/models/profesion.model';
import { ProfesionService } from 'app/services/profesion.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profesiones',
  templateUrl: './profesiones.component.html',
  styleUrls: ['./profesiones.component.css'],
  providers: [ProfesionService]
})
export class ProfesionesComponent implements OnInit {
  public closeResult: String;
  public profesionModal;
  public profesionModalAdd;
  public profesiones;

  constructor(private modalService: NgbModal, private _profesionService: ProfesionService, private toastr: ToastrService) {
    this.profesionModal = new Profesion("","","");
    this.profesionModalAdd = new Profesion("","","");

   }

  ngOnInit() {
    this.obtenerProfesiones();
  }

  showNotification(from, align, color){
    switch(color){
      case 1:
      this.toastr.info('<span class="now-ui-icons ui-1_bell-53"></span> Profesión eliminada con éxito.', '', {
         timeOut: 8000,
         closeButton: true,
         enableHtml: true,
         toastClass: "alert alert-warning alert-with-icon",
         positionClass: 'toast-' + from + '-' +  align
       });
      break;
      case 2:
      this.toastr.success(`<span class="now-ui-icons ui-1_bell-53"></span> Profesión agregada con éxito`, '', {
         timeOut: 8000,
         closeButton: true,
         enableHtml: true,
         toastClass: "alert alert-success alert-with-icon",
         positionClass: 'toast-' + from + '-' +  align
       });
      break;
      case 3:
      this.toastr.info('<span class="now-ui-icons ui-1_bell-53"></span> Profesión actualizada con éxito.', '', {
         timeOut: 8000,
         closeButton: true,
         enableHtml: true,
         toastClass: "alert alert-info alert-with-icon",
         positionClass: 'toast-' + from + '-' +  align
       });
      break;
      case 4:
      this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> La profesión ingresada ya existe, intenta con otro nombre', '', {
         timeOut: 8000,
         enableHtml: true,
         closeButton: true,
         toastClass: "alert alert-danger alert-with-icon",
         positionClass: 'toast-' + from + '-' +  align
       });
       break;
      default:
      break;
    }
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

obtenerProfesiones(){
  this._profesionService.obtenerProfesiones().subscribe(
    res=>{
      this.profesiones = res.profesionesEcontradas;
    },err=>{
      console.log(<any>err);
    }
  )
}

verProfesion(idProfesion){
  this._profesionService.verProfesion(idProfesion).subscribe(
    res=>{
      this.profesionModal = res.profesionEncontrada;
      console.log(res);
      
    },err=>{
      console.log(<any>err); 
    }
  )
}

agregarProfesion(){
  this._profesionService.agregarProfesion(this.profesionModalAdd).subscribe(
    res=>{
      this.profesionModalAdd = res.profesionGuardada;
      this.showNotification('bottom', 'right', 2);
      this.obtenerProfesiones();
    },err=>{
      this.showNotification('bottom', 'right', 4);
      console.log(<any>err);
    }
  )
}

editarProfesion(){
  this._profesionService.editarProfesion(this.profesionModal).subscribe(
    res=>{
      this.showNotification('bottom', 'right', 3);
      this.obtenerProfesiones();
    },err=>{
      console.log(<any>err);
    }
  )
}

eliminarProfesion(idProfesion){
  this._profesionService.eliminarProfesion(idProfesion).subscribe(
    res=>{
      this.showNotification('bottom', 'right', 1);
      this.obtenerProfesiones();
    },err=>{
      console.log(<any>err);
    }
  )
}

}
