import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Basket_Item } from 'src/app/contracts/basket/list_basket_item';
import { Update_Basket_Item } from 'src/app/contracts/basket/update_basket_item';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { BasketItemDeleteState, BasketItemRemoveDialogComponent } from 'src/app/dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import { ShoppingCompletedDeleteState, ShoppingCompletedDialogComponent } from 'src/app/dialogs/shopping-completed-dialog/shopping-completed-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { NgxToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/ngx-toastr.service';
declare var $:any;
@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit {
  constructor(private basketService:BasketService, spinner:NgxSpinnerService, private orderService:OrderService, private router:Router,private toastrService:NgxToastrService, private dialogService: DialogService){super(spinner)}
basketItems: List_Basket_Item[];
  async ngOnInit() {
   this.showSpinner(SpinnerType.LineSpinClockwiseFade)
  this.basketItems =await  this.basketService.get()

  this.hideSpinner(SpinnerType.LineSpinClockwiseFade)
  }
  async changeQuantity(object:any){
    this.showSpinner(SpinnerType.BallscaleMultiple)
const basketItemId:string = object.target.attributes["id"].value;
const quantity:number = object.target.value;
const basketItem: Update_Basket_Item =new Update_Basket_Item();
basketItem.basketItemId = basketItemId;
basketItem.quantity = quantity;
await this.basketService.updateQuantity(basketItem)
this.hideSpinner(SpinnerType.BallscaleMultiple)
  }
 async removeBasketItem(basketItemId:string){
  $("#basketModal").modal("hide");
  this.dialogService.openDialog({
    componentType:BasketItemRemoveDialogComponent,
    data: BasketItemDeleteState.Yes,
    afterClosed:async ()=>{
      this.showSpinner(SpinnerType.BallFall)
     await this.basketService.delete(basketItemId)
      $("."+basketItemId).fadeOut(800, ()=>{
        this.hideSpinner(SpinnerType.BallFall);
        $("#basketModal").modal("show");
      })

    }
  })



  }
async  shoppingCompleted(){
  $("#basketModal").modal("hide");
  this.dialogService.openDialog({

    componentType:ShoppingCompletedDialogComponent,
    data: ShoppingCompletedDeleteState.Yes,
    afterClosed:async()=>{
        this.showSpinner(SpinnerType.LineSpinClockwiseFade)
    const order:Create_Order = new Create_Order();
    order.description ="Süpürge ";
    order.address="Çankaya";


   await this.orderService.post(order)
   this.hideSpinner(SpinnerType.LineSpinClockwiseFade)
   this.toastrService.message("Sipariş Oluşturuldu", "Başarılı",{
    messageType:ToastrMessageType.Success,
    toastrPosition:ToastrPosition.TopRight
   })
  //  $("#basketModal").modal("show");
this.router.navigate(["/"])

    }

  })

  }








}
