import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { User } from 'src/app/entities/user';
import { AuthService } from 'src/app/services/common/auth.service';
import { AuthUserService } from 'src/app/services/common/models/auth-user.service';
import { UserService } from 'src/app/services/common/models/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
  constructor(private userService: UserService,
     spinner:NgxSpinnerService,
     private authService: AuthService,
      private activatedRoute:ActivatedRoute,
       private router:Router,
        private socialAuthService: SocialAuthService,
        private authUserService: AuthUserService
        ){super(spinner)
    this.socialAuthService.authState.subscribe(async(user:SocialUser)=>{
      console.log(user);
      this.showSpinner(SpinnerType.BallscaleMultiple);
       await this.authUserService.googleLogin(user, ()=>{
        this.authService.identityCheck()
        this.hideSpinner(SpinnerType.BallscaleMultiple)
      });

        })

  }
  ngOnInit(): void {


  }
  async login(usernameOrEmail:string, password:string, callback?:()=>void){
   this.showSpinner(SpinnerType.BallFall);
await this.authUserService.login(usernameOrEmail, password, ()=> {

  this.authService.identityCheck();
  this.activatedRoute.queryParams.subscribe(params=>{

    const returnUrl: string = params["returnurl"]
    if(returnUrl){
      this.router.navigate([returnUrl])

    }
  })
  this.hideSpinner(SpinnerType.LineSpinClockwiseFade);
})

  }









}
// , callback?:()=>void
// , ()=> this.hideSpinner(SpinnerType.LineSpinClockwiseFade)
