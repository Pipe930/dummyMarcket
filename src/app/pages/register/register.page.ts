import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { AutenthicationService } from './../../services/autenthication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public formularioRegistrarse: FormGroup | any;
  public d = new Date();
  public fechaActual: string = this.d.getFullYear()  + "-" +
  ("0"+ (this.d.getMonth()+1)).slice(-2) + "-" +
  ("0" + (this.d.getDate()-1)).slice(-2);
  public bithDay: string = '';
  public dateValue = format(new Date(), 'yyyy-MM-dd');

  constructor(
    private builder: FormBuilder,
    private ruta: Router,
    private servicioUser: AutenthicationService,
    private alerta: AlertController,
    private toast: ToastController
  ) { }

  public construirFormulario():void{
    this.formularioRegistrarse = this.builder.group({
      nombre: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      apellido: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      nombre_usuario: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
      edad: new FormControl(null, [Validators.required, Validators.min(18), Validators.max(98)]),
      correo: new FormControl("", [Validators.required, Validators.email]),
      contrasenia: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      fecha_nacimiento: new FormControl("", Validators.required),
      genero: new FormControl("male", Validators.required)
    });
  }

  ngOnInit():void {
    this.construirFormulario();
  }

  public async alertaExito(){
    const alert = await this.alerta.create({
      header: 'Exito',
      subHeader: 'Mensaje de Exito',
      message: 'Se a registrado correctamente',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  public async alertaError(){
    const alert = await this.alerta.create({
      header: 'Error',
      subHeader: 'Mensaje de Error',
      message: 'Faltan datos a completar',
      buttons: ['Ok'],
    });

    await alert.present();
  }

  public registrarse():void{
    const form = this.formularioRegistrarse.value;

    const user = {
      firstName: form.nombre,
      lastName: form.apellido,
      username: form.nombre_usuario,
      age: form.edad,
      email: form.correo,
      password: form.contrasenia,
      birthDate: this.bithDay,
      gender: form.genero
    }

    if(this.formularioRegistrarse.invalid){
      this.formularioRegistrarse.markAllAsTouched();
      this.alertaError();
    } else {
      this.servicioUser.register(user).subscribe(resultado => {
        this.alertaExito();
        this.formularioRegistrarse.reset();
        this.ruta.navigate(['login']);
      }, error => {
        console.log(error);
        window.alert("Error al enviar el formulario");
      })
    }
  }

  public agregarFecha(fecha: any): void{
    if(fecha != null){
      this.bithDay = format(parseISO(fecha), 'yyyy-MM-dd');
      console.log(this.bithDay);
    }
  }

  get nombre(){
    return this.formularioRegistrarse.get('nombre');
  }

  get apellido(){
    return this.formularioRegistrarse.get('apellido');
  }

  get nombre_usuario(){
    return this.formularioRegistrarse.get('nombre_usuario');
  }

  get edad(){
    return this.formularioRegistrarse.get('edad');
  }

  get correo(){
    return this.formularioRegistrarse.get('correo');
  }

  get contrasenia(){
    return this.formularioRegistrarse.get('contrasenia');
  }

  get fecha_nacimiento(){
    return this.formularioRegistrarse.get('fecha_nacimiento');
  }

}
