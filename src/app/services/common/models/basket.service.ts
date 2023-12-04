import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Basket_Item } from 'src/app/contracts/basket/list_basket_item';
import { Update_Basket_Item } from 'src/app/contracts/basket/update_basket_item';
import { Create_Basket_Item } from 'src/app/contracts/basket/create_basket_item';


@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httClientService:HttpClientService) { }
  async get(successCallBack?:()=>void,errorCallBack?:()=>void):Promise<List_Basket_Item[]>{
  const observable:Observable<List_Basket_Item[]> =  this.httClientService.get({
      controller:"baskets"
    })

   return await firstValueFrom(observable)
   successCallBack();
   errorCallBack

  }
   async post(basketItem: Create_Basket_Item): Promise<void> {
    const observable: Observable<any> = this.httClientService.post({
      controller: "baskets"
    }, basketItem);

    await firstValueFrom(observable);

  }
  async updateQuantity(basketItem: Update_Basket_Item,successCallBack?:()=>void,errorCallBack?:()=>void):Promise<Update_Basket_Item>{
const observable:Observable<Update_Basket_Item>= this.httClientService.put({
  controller:"baskets"
},basketItem)
return await firstValueFrom(observable)
successCallBack();
errorCallBack();
  }

 async delete(basketItemId:string){
   const observable:Observable<any> = this.httClientService.delete({
      controller:"baskets"
    },basketItemId)
    await firstValueFrom(observable)

  }
}
