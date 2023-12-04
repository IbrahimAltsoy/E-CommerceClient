import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { NgxToastrService, ToastrMessageType, ToastrPosition } from '../ui/ngx-toastr.service';
import { AuthUserService } from './models/auth-user.service';
import { Router } from '@angular/router';
import { SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: NgxToastrService, private authUserService: AuthUserService, private router:Router, private spinner: NgxSpinnerService ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:

          this.authUserService.refreshTokenLogin(localStorage.getItem("refreshToken"), (state) => {
            if (!state) {
              const url = this.router.url;
              if (url == "/products")
                this.toastrService.message("Sepete ürün eklemek için oturum açmanız gerekiyor.", "Oturum açınız!", {
                  messageType: ToastrMessageType.Warning,
                  toastrPosition: ToastrPosition.TopRight
                });
              else
                this.toastrService.message("Bu işlemi yapmaya yetkiniz bulunmamaktadır!", "Yetkisiz işlem!", {
                  messageType: ToastrMessageType.Warning,
                  toastrPosition: ToastrPosition.TopRight
                });
            }
          }).then(data => {
            this.toastrService.message("Bu işlemi yapmaya yetkiniz bulunmamaktadır!", "Yetkisiz işlem!", {
              messageType: ToastrMessageType.Warning,
              toastrPosition: ToastrPosition.TopRight
            });
          });
          break;
        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Sunucuya erişilmiyor!", "Sunucu hatası!", {
            messageType: ToastrMessageType.Warning,
            toastrPosition: ToastrPosition.TopRight
          });
          break;
        case HttpStatusCode.BadRequest:
          this.toastrService.message("Geçersiz istek yapıldı!", "Geçersiz istek!", {
            messageType: ToastrMessageType.Warning,
            toastrPosition: ToastrPosition.TopRight
          });
          break;
        case HttpStatusCode.NotFound:
          this.toastrService.message("Sayfa bulunamadı!", "Sayfa bulunamadı!", {
            messageType: ToastrMessageType.Warning,
            toastrPosition: ToastrPosition.TopRight
          });
          break;
        default:
          this.toastrService.message("Beklenmeyen bir hata meydana gelmiştir!", "Hata!", {
            messageType: ToastrMessageType.Warning,
            toastrPosition: ToastrPosition.TopRight
          });
          break;
      }

      this.spinner.hide(SpinnerType.BallscaleMultiple)
      return of(error);}));
    }
  }
