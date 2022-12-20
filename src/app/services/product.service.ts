import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './../modules/product';
import { AddCart } from './../modules/add-cart';
import { ResponseAddCart } from './../modules/response-add-cart';
import { ResponseProducts } from './../modules/response-products';
import { Cart } from './../modules/cart';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private urlProductos:string = 'https://dummyjson.com/auth/products';
  private listaProductos = new BehaviorSubject<Array<Product>>([]);
  public listaProductos$ = this.listaProductos.asObservable();
  public pageActual: number = 0;

  constructor(
    private http: HttpClient
  ) { }

  public obtenerPrimerosProductos(){
    this.http.get<ResponseProducts>(`${this.urlProductos}?skip=0`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      delay(2000)
    ).subscribe(resultadoPeticion => {
      this.pageActual = this.pageActual + 30;
      this.listaProductos.next(resultadoPeticion.products);
    })
  }

  public obtenerMasProductos(){
    this.http.get<ResponseProducts>(`${this.urlProductos}?skip=${this.pageActual}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      delay(2000)
    ).subscribe(resultadoPeticion => {
      this.pageActual = this.pageActual + 30;
      this.listaProductos.next(this.listaProductos.getValue().concat(resultadoPeticion.products));
    })
  }

  public obtenerProducto(id: string):Observable<Product>{
    return this.http.get<Product>(`${this.urlProductos}/${id}`);
  }

  public agregarCarrito(producto: AddCart):Observable<ResponseAddCart>{
    return this.http.post<ResponseAddCart>(`https://dummyjson.com/auth/carts/add`, producto, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  public obtenerCarrito(idUser: string):Observable<Cart>{
    return this.http.get<Cart>(`https://dummyjson.com/auth/carts/user/${idUser}`);
  }
}
