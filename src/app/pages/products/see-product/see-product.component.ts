import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from './../../../modules/product';
import { ProductService } from './../../../services/product.service';
import { Response } from './../../../modules/response';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-see-product',
  templateUrl: './see-product.component.html',
  styleUrls: ['./see-product.component.scss'],
})
export class SeeProductComponent implements OnInit {
  public producto!: Product;
  public idProducto: string = '';
  public cantidad: number = 1;
  public usuario: Response | any;

  constructor(
    private router: ActivatedRoute,
    private servicioProducto: ProductService,
    private ruta: Router,
    private toast: ToastController
  ) {
    this.router.params.subscribe(parametros => {
      this.idProducto = parametros['id'];
    });
  }

  ngOnInit():void {
    this.servicioProducto.obtenerProducto(this.idProducto).subscribe(resultado => {
      this.producto = resultado;
    }, error => {
      console.log(error);
    })
  }

  public async messageSuccess(){
      const toast = await this.toast.create({
        message: 'Se agrego al carrito con exito',
        duration: 3000,
        position: 'bottom',
        buttons: ['Aceptar'],
        animated: true
      });

      await toast.present();
    }

  public sumarCantidad():void{
    if(this.cantidad < this.producto.stock){
      this.cantidad = this.cantidad + 1;
    }
  }

  public restarCantidad():void{
    if(this.cantidad > 1){
      this.cantidad = this.cantidad - 1;
    }
  }

  public btnAgregarCarrito():void{
    this.usuario = JSON.parse(sessionStorage.getItem('user')!);

    let producto = {
      userId: this.usuario.id,
      products: [
        {
          id: this.producto.id,
          quantity: this.cantidad
        }
      ]
    }

    this.servicioProducto.agregarCarrito(producto).subscribe(resultado => {
      console.log(resultado);
      this.messageSuccess();
      this.ruta.navigate(['products']);
    }, error => {
      console.log(error);
    })
  }

}
