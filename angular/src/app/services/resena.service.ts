import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';
import { resena } from 'app/models/resena.model';

@Injectable({
    providedIn: 'root'
})

export class ResenaService {

    public url: String;
    public headers = new HttpHeaders().set('Content-Type', 'application/json')
  
    constructor(private _http: HttpClient) {
      this.url = GLOBAL.url
    }

    crearResena(resena: resena, idContrato):Observable<any>{
        let params = JSON.stringify(resena)
        return this._http.post(this.url + `/crearResena/`+ idContrato ,params,{headers: this.headers})
    }

    editarResena(resena: resena, idResena):Observable<any>{
        let params = JSON.stringify(resena)
        return this._http.put(this.url + `/editarResena/`+ idResena ,params,{headers: this.headers})
    }

    eliminarResena(idResena){
        return this._http.delete(this.url + `/eliminarResena/` + idResena,{headers: this.headers})
    }

    obtenerResenaContratante(idTrabajador){
        return this._http.get(this.url + `/obtenerResenaContratante/` + idTrabajador,{headers: this.headers})
    }

    obtenerResenaTrabajador(idTrabajador){
        return this._http.get(this.url + `/obtenerResenaTrabajador/` + idTrabajador,{headers: this.headers})
    }
}