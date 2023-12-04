import { Component, Inject, OnInit } from '@angular/core';
import { Basedialog } from '../base/basedialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/common/models/order.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxToastrService } from 'src/app/services/ui/ngx-toastr.service';
import { SingleOrder } from 'src/app/contracts/order/single_order';


@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.scss']
})
export class OrderDetailDialogComponent extends Basedialog<OrderDetailDialogComponent> implements OnInit{
  constructor(
    dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState | string,
    private orderService: OrderService,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService,
    private toastrService: NgxToastrService) {
    super(dialogRef)
  }

  singleOrder: SingleOrder;

  displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];
  dataSource = [];
  clickedRows = new Set<any>();
  totalPrice: number;

  async ngOnInit(): Promise<void> {
    this.singleOrder = await this.orderService.getOrderById(this.data as string)

    this.dataSource = this.singleOrder.basketItems;

    this.totalPrice = this.singleOrder.basketItems.map((basketItem, index) => basketItem.price * basketItem.quantity).reduce((price, current) => price + current);
  }

  // completeOrder() {
  //   this.dialogService.openDialog({
  //     componentType: CompleteOrderDialogComponent,
  //     data: CompleteOrderState.Yes,
  //     afterClosed: async () => {
  //       this.spinner.show(SpinnerType.BallAtom)
  //       await this.orderService.completeOrder(this.data as string);
  //       this.spinner.hide(SpinnerType.BallAtom)
  //       this.toastrService.message("Sipariş başarıyla tamamlanmıştır! Müşteriye bilgi verilmiştir.", "Sipariş Tamamlandı!", {
  //         messageType: ToastrMessageType.Success,
  //         position: ToastrPosition.TopRight
  //       });
  //     }
  //   });
  // }

}


export enum OrderDetailDialogState {
  Close, OrderComplete
}
