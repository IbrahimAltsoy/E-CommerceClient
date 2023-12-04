import {  OnInit, ViewChild,Component } from '@angular/core';
import { AuthService } from './services/common/auth.service';
import { NgxToastrService, ToastrMessageType, ToastrPosition } from './services/ui/ngx-toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from './services/common/http-client.service';
import { DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { ComponentType } from '../app/services/common/dynamic-load-component.service';
declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  // title = 'E-CommerceClient';
  @ViewChild(DynamicLoadComponentDirective,{static:true})
  dynamicLoadComponentDirective: DynamicLoadComponentDirective

  constructor(public authService:AuthService, private toastrService: NgxToastrService, private router:Router, private dynamicLoadComponent:DynamicLoadComponentService){

    authService.identityCheck();


  }
  signOut(){
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();

        this.router.navigate([""])



    this.toastrService.message("Oturumunuz kapatılmıştır.", "Başarılı",{
      toastrPosition:ToastrPosition.TopRight,
      messageType: ToastrMessageType.Warning
    })
  }

  loadComponent(){
    this.dynamicLoadComponent.loadComponent(ComponentType.BasketsComponent, this.dynamicLoadComponentDirective.viewContainerRef)
  }


 }



// $.get("https://localhost:7201/api/", (datas: any)=>{
//   console.log(datas)
// });
