import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class SessionRequiredGuard implements CanActivate {
  constructor(
    private ruta: Router,
    private servicioUser: UserService
  ) { }

  canActivate() {
    if(this.servicioUser.isLogin()){
      return true;
    } else {
      this.ruta.navigate(['login']);
      return false;
    }
  }

}
