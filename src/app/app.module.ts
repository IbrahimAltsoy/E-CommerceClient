import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DialogModule } from './dialogs/dialog.module';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './ui/components/login/login.component';
import { FacebookLoginProvider, GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthService, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { HttpErrorHandlerInterceptorService } from './services/common/http-error-handler-interceptor.service';
import { ComponentsModule } from './ui/components/components.module';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';










@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DynamicLoadComponentDirective





  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    AdminModule,
    UiModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter:()=> localStorage.getItem("accessToken"),
        allowedDomains:["localhost:7201"]
      }
    }), SocialLoginModule,GoogleSigninButtonModule

  ],

  providers: [
    {provide: "baseUrl", useValue:"https://localhost:7201/api",multi:true},
    {provide: "baseSignalRUrl", useValue:"https://localhost:7201/",multi:true},

  {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '452756695338-an9ehvm7aotc1dhvrrflpqrmehbeqqj0.apps.googleusercontent.com'
          )
        }
        // ,
        // {
        //   id: FacebookLoginProvider.PROVIDER_ID,
        //   provider: new FacebookLoginProvider('clientId')
        // }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig
  }, {provide:HTTP_INTERCEPTORS, useClass:HttpErrorHandlerInterceptorService, multi:true}],

  bootstrap: [AppComponent]
})
export class AppModule { }
