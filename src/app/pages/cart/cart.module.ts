import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';
import { ProductService } from './../../services/product.service';
import { TokenInterceptorService } from './../../services/token-interceptor.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartPageRoutingModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [CartPage],
  providers: [ProductService, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}]
})
export class CartPageModule {}
