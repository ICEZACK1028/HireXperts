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
  public headers = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url
  }

  solicitudInicio(contrato: contrato, trabajador, token): Observable<any> {
    let params = JSON.stringify(contrato)
    let headersToken = this.headers.set('Authorization', token)
    return this._http.post(this.url + '/solicitudInicio/' + trabajador, params, { headers: headersToken })
  }
  trabajoCancelado(token, idContrato, contrato): Observable<any> {
    let params = JSON.stringify(contrato)
    let headersToken = this.headers.set('Authorization', token)
    return this._http.put(this.url + '/trabajoCancelado/' + idContrato,params, { headers: headersToken })
  }
  trabajoProceso(token, idContrato, contrato): Observable<any> {
    let params = JSON.stringify(contrato)
    let headersToken = this.headers.set('Authorization', token)
    return this._http.put(this.url + '/trabajoProceso/' + idContrato,params, { headers: headersToken })
  }
  solicitudCancelada(token, idContrato, contrato): Observable<any> {
    let params = JSON.stringify(contrato)
    let headersToken = this.headers.set('Authorization', token)
    return this._http.put(this.url + '/solicitudCancelada/' + idContrato,params, { headers: headersToken })
  }
  trabajoFinalizado(token, idContrato,contrato): Observable<any> {
    let params = JSON.stringify(contrato)
    let headersToken = this.headers.set('Authorization', token)
    return this._http.put(this.url + '/trabajoFinalizado/' + idContrato, params, { headers: headersToken })
  }
  solicitudRespuesta(token, contrato, idContrato): Observable<any> {
    let params = JSON.stringify(contrato)
    let headersToken = this.headers.set('Authorization', token)
    return this._http.put(this.url + '/solicitudRespuesta/' + idContrato, params, { headers: headersToken })
  }
  obtenerContratanteSolicitudInicio(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/obtenerContratanteSolicitudInicio', { headers: headersToken })
  }
  obtenerContratanteSolicitudRespuesta(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/obtenerContratanteSolicitudRespuesta', { headers: headersToken })
  }
  obtenerContratanteSolicitudCancelada(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/obtenerContratanteSolicitudCancelada', { headers: headersToken })
  }
  obtenerContratanteTrabajoProceso(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/obtenerContratanteTrabajoProceso', { headers: headersToken })
  }
  obtenerContratanteTrabajoFinalizado(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/obtenerContratanteTrabajoFinalizado', { headers: headersToken })
  }
  obtenerContratanteTrabajoCancelado(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/obtenerContratanteTrabajoCancelado', { headers: headersToken })
  }
  obtenerTrabajadorSolicitudInicio(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/obtenerTrabajadorSolicitudInicio', { headers: headersToken })
  }
  obtenerTrabajadorSolicitudRespuesta(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/obtenerTrabajadorSolicitudRespuesta', { headers: headersToken })
  }
  obtenerTrabajadorSolicitudCancelada(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/obtenerTrabajadorSolicitudCancelada', { headers: headersToken })
  }
  obtenerTrabajadorTrabajoProceso(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/obtenerTrabajadorTrabajoProceso', { headers: headersToken })
  }
  obtenerTrabajadorTrabajoCancelado(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/obtenerTrabajadorTrabajoCancelado', { headers: headersToken })
  }
  obtenerTrabajadorTrabajoFinalizado(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/obtenerTrabajadorTrabajoFinalizado', { headers: headersToken })
  }
  obtenerContratosContratanteTrabajoFinalizado(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/obtenerContratosContratanteTrabajoFinalizado', { headers: headersToken })
  }
  obtenerContratosTrabajadorTrabajoFinalizado(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/obtenerContratosTrabajadorTrabajoFinalizado', { headers: headersToken })
  }
  obtenerNoContratosRecibidos(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/obtenerNoContratosRecibidos', { headers: headersToken })
  }
  obtenerNoContratosEnviados(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/obtenerNoContratosEnviados', { headers: headersToken })
  }


}
