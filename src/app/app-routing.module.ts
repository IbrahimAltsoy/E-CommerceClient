import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { HomeComponent } from './ui/components/home/home.component';

const routes: Routes = [
  {
    path: "admin", component:LayoutComponent, children:[
      {path:"",component:DashboardComponent},
      {path:"customer", loadChildren:()=>import("./admin/components/customer/customer.module").then(module=> module.CustomerModule) },
      {path:"product", loadChildren:()=>import("./admin/components/product/product.module").then(module=>module.ProductModule)},
      {path:"order", loadChildren:()=>import("./admin/components/order/order.module").then(module=>module.OrderModule)},
      {path:"user", loadChildren:()=>import("./admin/components/user/user.module").then(module=>module.UserModule)}
    ]

  },
  {path:"", component:HomeComponent},
  {path:"about", loadChildren:()=>import("./ui/components/about/about.module").then(module=>module.AboutModule)},
  {path:"baskets", loadChildren:()=>import("./ui/components/baskets/baskets.module").then(module=>module.BasketsModule)},
  {path:"contact", loadChildren:()=>import("./ui/components/contact/contact.module").then(module=>module.ContactModule)},
  {path:"products", loadChildren:()=>import("./ui/components/products/products.module").then(module=>module.ProductsModule)},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
