import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service'
import { contrato } from 'app/models/contrato.model';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  public url: String;
  public headers = new HttpHeaders().set('Content-Type','application/json')

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url
  }

  solicitudInicio(contrato: contrato, trabajador, token):Observable<any>{
    let params = JSON.stringify(contrato)
    let headersToken = this.headers.set('Authorization', token)
    return this._http.post(this.url+'/solicitudInicio/'+trabajador,params, {headers: headersToken})
  }

}
