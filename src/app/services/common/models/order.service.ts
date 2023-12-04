import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { Read_Order } from 'src/app/contracts/order/read_order';
import { SingleOrder } from 'src/app/contracts/order/single_order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpclientService: HttpClientService) { }
  async post(order:Create_Order):Promise<void>{
    const observable: Observable<any> = this.httpclientService.post({
      controller:"orders"
    }, order);

    firstValueFrom(observable)

  }

  async getAllOrders(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalOrderCount: number; orders: Read_Order[] }> {
    const observable: Observable<{ totalOrderCount: number; orders: Read_Order[] }> = this.httpclientService.get({
      controller: "orders",
      querystring: `page=${page}&size=${size}`
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack())
      .catch(error => errorCallBack(error));

    return await promiseData;
  }

  async getOrderById(id: string, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    const observable: Observable<SingleOrder> = this.httpclientService.get<SingleOrder>({
      controller: "orders"
    }, id);

    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack())
      .catch(error => errorCallBack(error))

    return await promiseData;
  }

  // async completeOrder(id: string) {
  //   const observable: Observable<any> = this.httpclientService.get({
  //     controller: "orders",
  //     action: "complete-order"
  //   }, id);

  //   await firstValueFrom(observable);
  // }
}
