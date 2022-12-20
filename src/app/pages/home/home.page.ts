import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Response } from './../../modules/response';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public formularioContacto: FormGroup | any;
  public activo: boolean = false;
  public colorConfig: string = 'light';
  public colorButton: string = 'dark';
  public idUsuario: number = 0;
  public usuario!: Response;

  constructor(
    private ruta: Router,
    private alerta: AlertController,
    private builder: FormBuilder
  ) { }

  public construirFormulario():void{
    this.formularioContacto = this.builder.group({
      correo: new FormControl("", [Validators.required, Validators.email]),
      mensaje: new FormControl("", [Validators.required, Validators.maxLength(200)])
    });
  }

  ngOnInit():void {
    this.usuario = JSON.parse(sessionStorage.getItem('user')!);
    this.construirFormulario();
    this.idUsuario = this.usuario.id as any;
  }

  public async alertaSesionTerminada(){
    const alert = await this.alerta.create({
      header: 'Sesion Terminada',
      message: 'Su sesion a finalizado',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  public cerrarSesion():void{
    this.alertaSesionTerminada();
    sessionStorage.clear();
    this.ruta.navigate(['login']);
  }

  public evento():void{
    if(this.colorConfig == 'light'){
      this.colorButton = 'light';
      this.colorConfig = 'dark';
    } else {
      this.colorConfig = 'light';
      this.colorButton = 'dark';
    }
  }
}
