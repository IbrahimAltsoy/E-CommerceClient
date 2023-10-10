import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from 'src/app/contracts/create-product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from 'src/app/contracts/list-product.service';
import { Observable, firstValueFrom, throwError } from 'rxjs';
import { catchError, lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClientService) { }
  create(product: Create_Product, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void){

    this.httpClient.post({
      controller: "products"
    }, product)
      .subscribe(result => {
        successCallBack();
      },(errorResponse:HttpErrorResponse)=>{
        const _error:Array<{key: string, value:Array<string>} >= errorResponse.error;
        let message = "";

        _error.forEach((v,index)=>{
          v.value.forEach((_v, _index)=>{
            console.log(_v)
            message+= `${_v}<br>`;

          });
        });

       errorCallBack(message);
      });

    }





    async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage:string) => void): Promise<{ totalCount: number, products: List_Product[] }> {
      try {
        const result$: Observable<{ totalCount: number, products: List_Product[] }> = this.httpClient.get<{ totalCount: number, products: List_Product[] }>({
          controller: "products",
          querystring: `page=${page}&size=${size}`
        });

        const result = await lastValueFrom(result$); // Son değeri al

        if (successCallBack) {
          successCallBack();
        }

        return result;
      } catch (err) {
        if (errorCallBack) {
          errorCallBack;
        }

        throw err; // Hata yeniden fırlatılabilir veya uygun bir şekilde işlenebilir.
      }

    }

// delete fonksiyonuna successCallBack ve errorCallBackler eklendi, çıkartabilirsin
    async delete(id:string,successCallBack?: () => void, errorCallBack?: (errorMessage:string) => void){
      const deleteObservable: Observable<any>= this.httpClient.delete<any>({
         controller: "products",
       },id);
       await firstValueFrom(deleteObservable);
  }




  }


