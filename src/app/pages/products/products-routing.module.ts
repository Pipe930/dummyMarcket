import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsPage } from './products.page';
import { SeeProductComponent } from './see-product/see-product.component';
import { SessionRequiredGuard } from './../../guards/session-required.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductsPage
  },
  {
    path: 'product/:id',
    component: SeeProductComponent,
    canActivate: [SessionRequiredGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsPageRoutingModule {}
