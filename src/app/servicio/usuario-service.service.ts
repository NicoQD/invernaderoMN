import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Usuario} from '../modelos/Usuario';
import {global} from '../modelos/global';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {
  public url: string;
  public identity;
  public token;
  public sub;
  
  constructor(public _http:HttpClient) {
    this.url = global.url;
   }
   
  public test(){
     return "hola esto es un servicio";
  }
  register(usuario):Observable<any>{
    let json =JSON.stringify(usuario);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.post(this.url+'usuario/crear', params,{headers: headers});
  }
  signup(usuario, gettoken = null):Observable<any>{
    if(gettoken!=null){
      usuario.gettoken='true';
    }
    let json =JSON.stringify(usuario);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.post(this.url+'usuario/login', params,{headers: headers});
  }
  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));
    if(identity && identity != "undefined"){
      this.identity = identity;
      
    }
    else{
      this.identity=null;
    }
    return this.identity;
  }
  getToken(){
    let token = JSON.parse(localStorage.getItem('token'));
    if(token && token != "undefined"){
      this.token=token;
    }else{
      this.token=null;
    }
    return this.token;
  }

  getSub():number{
    let identity = JSON.parse(localStorage.getItem('identity'));
    if(identity && identity != "undefined"){
      this.sub = identity.sub;
      return this.sub;
      
    }
    else{
      this.identity=null;
    }
    return this.identity;
  }
}
