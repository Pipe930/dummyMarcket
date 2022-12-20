import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AutenthicationService } from './../../services/autenthication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public formularioLogin: FormGroup | any;
  public messageAlert: boolean = false;

  constructor(
    private builder: FormBuilder,
    private ruta: Router,
    private servicioUser: AutenthicationService,
    private alerta: AlertController,
    private toast: ToastController
  ) { }

  ngOnInit():void {
    this.construirFormulario();
  }

  public construirFormulario():void{
    this.formularioLogin = this.builder.group({
      usuario: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
      contrasenia: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(16)])
    });
  }

  public async alertaExito(){
    const toast = await this.toast.create({
      message: 'Sesion iniciada con exito',
      duration: 3000,
      position: 'bottom',
      buttons: ['Aceptar'],
      animated: true
    });

    await toast.present();
  }

  public async alertaErrorSesion(){
    const alert = await this.alerta.create({
      header: 'Error',
      message: 'Los datos no son correctos',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  public iniciarSesion():void{
    const form = this.formularioLogin.value;

    const login = {
      username: form.usuario,
      password: form.contrasenia
    }

    if(this.formularioLogin.invalid){
      this.formularioLogin.markAllAsTouched();
    } else {
      this.servicioUser.login(login).subscribe(resultado => {
        const token = resultado.token;

        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(resultado));

        if(this.messageAlert){
          this.messageAlert = false;
        }

        this.alertaExito();
        this.formularioLogin.reset();
        this.ruta.navigate(['home']);
      }, error => {
        console.log(error);
        this.messageAlert = true;
      });
    }
  }

  get usuario(){
    return this.formularioLogin.get('usuario');
  }

  get contrasenia(){
    return this.formularioLogin.get('contrasenia');
  }

}
