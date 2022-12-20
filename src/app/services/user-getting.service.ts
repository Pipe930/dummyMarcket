import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserGet } from './../modules/user-get';

@Injectable({
  providedIn: 'root'
})
export class UserGettingService {
  public urlUsuario: string = 'https://dummyjson.com/users'

  constructor(
    private http: HttpClient
  ) { }

  public obtenerUsuario(idUsuario: string):Observable<UserGet>{
    return this.http.get<UserGet>(`${this.urlUsuario}/${idUsuario}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
