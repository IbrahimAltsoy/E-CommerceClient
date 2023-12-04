import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { HttpClientService } from '../http-client.service';
import { NgxToastrService, ToastrMessageType, ToastrPosition } from '../../ui/ngx-toastr.service';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  authService: any;
  activatedRoute: any;
  router: any;

  constructor(private httpClientService:HttpClientService, private toastrService: NgxToastrService ) { }
  async login(userNameOrEmail: string,password: string, callBack?:()=>void):Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller: "auth",
      action:"login"
    },{
      userNameOrEmail, password
    })

    const tokenResponse: TokenResponse =await firstValueFrom(observable) as TokenResponse;

    if(tokenResponse){

      localStorage.setItem("accessToken", tokenResponse.token.accessToken)
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken)
      this.toastrService.message("Başarılı bir şekilde giriş yapılmıştır.", "Hoşgeldiniz",{
      toastrPosition:ToastrPosition.TopRight,
      messageType: ToastrMessageType.Success
    })
    }
    // if(!tokenResponse){
    //   this.toastrService.message("Kullanıcı bilgileri eşleşmiyor.", "Başarısız",{
    //     toastrPosition:ToastrPosition.TopRight,
    //     messageType: ToastrMessageType.Success
    //   })
    // }
    callBack();
      }
      async googleLogin(user: SocialUser, succesBack?:()=>void, callBack?:()=>void):Promise<any>{
        const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
          action: "google-login",
          controller: "auth"
        }, user);


        const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
        if(tokenResponse){
          localStorage.setItem("accessToken", tokenResponse.token.accessToken);
          localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);

          // this.authService.identityCheck();
          // this.activatedRoute.queryParams.subscribe(params=>{

          //   const returnUrl: string = params["returnurl"]
          //   if(returnUrl){
          //     this.router.navigate([returnUrl])

          //   }
          // })
  //
          this.toastrService.message("Google ile giriş başarıyla gerçekleşti.", "Başarılı",{
            messageType: ToastrMessageType.Success,
            toastrPosition: ToastrPosition.TopRight
          })
        }
        // callBack();

      }
      async refreshTokenLogin(refreshToken:string, callBack?:(state)=>void):Promise<any>{
const observable :Observable<any | TokenResponse> = await this.httpClientService.post({
  controller:"auth",
  action: "refreshtokenlogin"
}, {refreshToken: refreshToken})

try {
  const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse
if(tokenResponse){
  localStorage.setItem("accessToken", tokenResponse.token.accessToken);
          localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
          callBack(refreshToken?true:false);
}

} catch  {
  callBack(false);
}



      }

}
