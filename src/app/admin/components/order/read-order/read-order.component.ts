import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Read_Order } from 'src/app/contracts/order/read_order';
import { OrderDetailDialogComponent } from 'src/app/dialogs/order-detail-dialog/order-detail-dialog.component';
import { AlertifyOptions, AlertifyService, MessagePosition, MessageType } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { OrderService } from 'src/app/services/common/models/order.service';


@Component({
  selector: 'app-read-order',
  templateUrl: './read-order.component.html',
  styleUrls: ['./read-order.component.scss']
})
export class ReadOrderComponent extends BaseComponent implements OnInit {
  constructor(
    private orderService:OrderService,
    spinner: NgxSpinnerService,
    private alertify:AlertifyService,
    private dialogService:DialogService
    ){super(spinner)}

    displayedColumns: string[] = ['orderCode', 'userName', 'totalPrice', 'createdDate', 'completed', 'viewdetail', 'delete'];
    dataSource: MatTableDataSource<Read_Order> = null;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    async getOrders() {
      this.showSpinner(SpinnerType.BallFall);

      const allOrders: { totalOrderCount: number; orders: Read_Order[] } = await this.orderService.getAllOrders(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerType.BallFall), (errorMessage: any) => {
        this.alertify.messageAlertfy(errorMessage.message, {
          dismisOthers: true,
          messageType: MessageType.Error,
          position: MessagePosition.TopRight
        });
      })
      this.dataSource = new MatTableDataSource<Read_Order>(allOrders.orders);
      this.paginator.length = allOrders.totalOrderCount;


    }

    async pageChanged() {
      await this.getOrders();
    }

    async ngOnInit() {
      await this.getOrders();
    }

    showDetail(id: string) {

      this.dialogService.openDialog({
        componentType: OrderDetailDialogComponent,
        data: id,
        options: {
          width: "750px"
        }
      });
    }

  }
