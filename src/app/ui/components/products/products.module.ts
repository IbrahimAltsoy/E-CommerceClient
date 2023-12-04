import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { ReadComponent } from './read/read.component';



@NgModule({
  declarations: [
    ProductsComponent,
    ReadComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"", component: ProductsComponent}
    ])
  ]
})
export class ProductsModule { }
