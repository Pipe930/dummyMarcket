import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../modules/login';
import { User } from '../modules/user';
import { Response } from './../modules/response';

@Injectable({
  providedIn: 'root'
})
export class AutenthicationService {

  constructor(
    private http: HttpClient
  ) { }

  public register(usuario: User):Observable<any>{
    return this.http.post<any>('https://dummyjson.com/users/add', usuario, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  public login(formulario: Login):Observable<Response>{
    return this.http.post<Response>('https://dummyjson.com/auth/login', formulario, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }
}
