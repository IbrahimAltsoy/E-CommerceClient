import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { SpinnerType } from 'src/app/base/base.component';
import { AuthService, _isAuthencated } from 'src/app/services/common/auth.service';
import { NgxToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/ngx-toastr.service';



@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate{
constructor(private jwtHelperService: JwtHelperService, private router:Router, private toastrService: NgxToastrService,private spinner: NgxSpinnerService, private authService: AuthService){}

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    this.spinner.show(SpinnerType.BallscaleMultiple);
//   const token:string = localStorage.getItem("accessToken");
//   // const decodetoken = this.jwtHelperService.decodeToken(token);
//   const expirationDate:Date = this.jwtHelperService.getTokenExpirationDate(token);
//   let expired: boolean;
//   try{
// expired = this.jwtHelperService.isTokenExpired(token);

//   }
//   catch{
// expired =true;
//   }

if(!_isAuthencated){
  this.router.navigate(["login"],{queryParams:{returnurl: state.url}});
  this.toastrService.message("Giriş yapmanız gerekmektedir.", "Yetkisiz Erişim",{
    toastrPosition:ToastrPosition.TopRight,
    messageType: ToastrMessageType.Warning
  })


}
this.spinner.hide(SpinnerType.BallscaleMultiple);
return true;
}

}






// export const authGuard: CanActivateFn = (route, state) => {


//   const token:string = localStorage.getItem("accessToken");
//   return true;
// };
