import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { Response } from './../../modules/response';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  public usuario: Response | any;
  public listaProductos: Array<any> = [];
  public precioTotal: number = 0;

  constructor(
    private servicioProducto: ProductService,
    private alerta: AlertController
  ) { }

  ngOnInit():void {
    this.usuario = JSON.parse(sessionStorage.getItem('user')!);

    this.servicioProducto.obtenerCarrito(
      this.usuario.id
      ).subscribe(resultado => {
        for(let carrito of resultado.carts){
          this.precioTotal = carrito.total;
          this.listaProductos = carrito.products;
        }
    }, error => {
      console.log(error);
    });
  }

  public async mensajeEliminado(){
    const alerta = await this.alerta.create({
      header: 'Producto eliminado',
      message: 'El producto se elimino con exito del carrito',
      buttons: ['Aceptar']
    });

    await alerta.present();
  }

  public buttonEliminar():void{
    this.mensajeEliminado();
  }

}
