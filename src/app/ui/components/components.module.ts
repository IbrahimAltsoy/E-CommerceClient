import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { BasketsModule } from './baskets/baskets.module';
import { AboutModule } from './about/about.module';
import { ContactModule } from './contact/contact.module';
import { RouterModule } from '@angular/router';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { UpdatePasswordModule } from './update-password/update-password.module';








@NgModule({
  declarations: [


  ],
  imports: [
    CommonModule,
    ProductsModule,
    HomeModule,
    BasketsModule,
    AboutModule,
    ContactModule,RouterModule,
    RegisterModule,
    PasswordResetModule,
    UpdatePasswordModule
    // LoginModule

  ],
  exports:[BasketsModule]
})
export class ComponentsModule { }
