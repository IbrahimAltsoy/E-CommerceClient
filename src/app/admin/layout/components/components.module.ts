import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { HeadbarComponent } from './headbar/headbar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    HeadbarComponent
  ],
  imports: [
    CommonModule,RouterModule
  ],
  exports:[
    FooterComponent,
    SidebarComponent,
    HeadbarComponent
  ]
})
export class ComponentsModule { }
