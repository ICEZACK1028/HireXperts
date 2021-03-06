import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service'
import { Profesion } from 'app/models/profesion.model';



@Injectable({
  providedIn: 'root'
})
export class ProfesionService {

  public url: String;
  public headers = new HttpHeaders().set('Content-Type','application/json')

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url
  }

  agregarProfesion(profesion: Profesion):Observable<any>{
    let params = JSON.stringify(profesion)
    return this._http.post(this.url + '/crearProfesion',params, {headers: this.headers})
  }

  obtenerProfesiones():Observable<any>{
    return this._http.get(this.url+'/obtenerProfesiones',{headers:this.headers})
  }

  verProfesion(id: string): Observable<any>{
    return this._http.get(`${this.url}/verProfesion/${id}`, {headers: this.headers})
  }

  editarProfesion(profesion: Profesion): Observable<any>{
    let params = JSON.stringify(profesion)
    return this._http.put(`${this.url}/editarProfesion/${profesion._id}`, params, {headers: this.headers});
  }

  eliminarProfesion(id: string): Observable<any>{
    return this._http.delete(`${this.url}/eliminarProfesion/${id}`, {headers: this.headers});
  }
}
