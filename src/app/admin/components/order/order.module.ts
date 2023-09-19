import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';



@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"", component: OrderComponent}
    ])
  ]
})
export class OrderModule { }
