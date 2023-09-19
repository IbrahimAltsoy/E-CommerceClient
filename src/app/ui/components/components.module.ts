import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { BasketsModule } from './baskets/baskets.module';
import { AboutModule } from './about/about.module';
import { ContactModule } from './contact/contact.module';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductsModule,
    HomeModule,
    BasketsModule,
    AboutModule,
    ContactModule,RouterModule

  ]
})
export class ComponentsModule { }
