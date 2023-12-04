import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ReadOrderComponent } from './read-order/read-order.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { DeleteDirective } from 'src/app/directives/admin/delete.directive';
import { DeleteDirectiveModule } from 'src/app/directives/admin/delete.directive.module';



@NgModule({
  declarations: [
    OrderComponent,
    ReadOrderComponent

  ],
  imports: [
    CommonModule,MatPaginatorModule,MatTableModule,MatIconModule,DeleteDirectiveModule,
    RouterModule.forChild([
      {path:"", component: OrderComponent}
    ])
  ]
})
export class OrderModule { }
