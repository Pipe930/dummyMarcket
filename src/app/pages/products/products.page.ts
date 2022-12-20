import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  @ViewChild(IonInfiniteScroll)
  public scroll: IonInfiniteScroll | any;
  public activarSearhBar: boolean = false;

  constructor(
    private servicioProduct: ProductService
  ) { }

  ngOnInit():void {
    this.servicioProduct.obtenerPrimerosProductos();
    this.servicioProduct.listaProductos$.subscribe(resultado => {
      console.log(resultado);
      if(this.scroll){
        this.scroll.complete();
      }
    }, error => {
      console.log(error);
    })
  }

  public cargarMasElementos(){
    this.servicioProduct.obtenerMasProductos();
  }

  get servicio(){
    return this.servicioProduct;
  }

  public desplegarSearchBar(){
    if(this.activarSearhBar){
      this.activarSearhBar = false;
    } else {
      this.activarSearhBar = true;
    }
  }

}
