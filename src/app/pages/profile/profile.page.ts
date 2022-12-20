import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserGet } from './../../modules/user-get';
import { UserGettingService } from './../../services/user-getting.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public usuario: UserGet | any;
  public idUsuario: string = '';

  constructor(
    private activate: ActivatedRoute,
    private userGet: UserGettingService
  ) {
    this.activate.params.subscribe(parametros => {
      this.idUsuario = parametros['id'];
    }, error => {
      console.log(error);
    });
  }

  ngOnInit():void {
    this.userGet.obtenerUsuario(this.idUsuario).subscribe(resultado => {
      this.usuario = resultado;
      console.log(this.usuario);
    }, error => {
      console.log(error);
    });
  }

}
