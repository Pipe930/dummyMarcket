import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { ProductsPageRoutingModule } from './products-routing.module';

import { ProductsPage } from './products.page';
import { ProductService } from './../../services/product.service';
import { TokenInterceptorService } from './../../services/token-interceptor.service';
import { SeeProductComponent } from './see-product/see-product.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsPageRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  declarations: [ProductsPage, SeeProductComponent],
  providers: [ProductService, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}]
})
export class ProductsPageModule {}
