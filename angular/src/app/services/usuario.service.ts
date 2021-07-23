import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public url: String;
  public headersVariable = new HttpHeaders().set('Content-type','application/json')
  public identidad;
  public token;
  public user: Usuario;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url
  }

  JsonConvert(Var){
    let convertVar = JSON.stringify(Var);
    return convertVar;
  }

  login(usuario, obtenerToken=null):Observable<any>{
    if (obtenerToken != null){
      usuario.obtenerToken = obtenerToken;
    }
    return this._http.post(this.url + '/login', this.JsonConvert(usuario),{headers:this.headersVariable})
  }

  getIdentidad(){
    var identidad2 = JSON.parse(sessionStorage.getItem('identidad'))
    if (identidad2 != 'undefined'){
      this.identidad = identidad2
    }else{
      this.identidad =null;
    }
    return this.identidad
  }

  getToken(){
    var token2 = sessionStorage.getItem('token')
    if (token2 != 'undefined'){
      this.token = token2
    }else{
      this.token = null;
    }
    return this.token;
  }

  // obtenerUsuarioId(id){
  //   return this._http.get(this.url + '/ObtenerUsuarioId/' + id, {headers:this.headersVariable})
  // }
  
  obtenerUsuarioId(id, token){
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.get(this.url + '/obtenerUsuarioId/' + id, {headers:headersToken})
  }

  obtenerUsuarioLogueado(token){
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.get(this.url + '/obtenerUsuarioLogueado', {headers:headersToken})
  }

}
