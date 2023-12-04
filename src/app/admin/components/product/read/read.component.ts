import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list-product.service';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { AlertifyService, MessagePosition, MessageType,  } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ProductService } from 'src/app/services/common/models/product.service';
declare var $:any;
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],


})

export class ReadComponent  extends BaseComponent implements OnInit {
  constructor(
    private productService:ProductService,
    spinner: NgxSpinnerService,
    private alertify:AlertifyService,
    private dialogService:DialogService
    ){super(spinner)}

  displayedColumns: string[] = ['name', 'description', 'stock', 'price','photo', 'delete', 'update'];
  dataSource: MatTableDataSource<List_Product>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
async getProducts(){
  this.showSpinner(SpinnerType.BallscaleMultiple);
  const listProduct:{totalProductCount: number, products:List_Product[]} = await this.productService.read(this.paginator? this.paginator.pageIndex:0,this.paginator? this.paginator.pageSize:5,()=>this.hideSpinner(SpinnerType.BallscaleMultiple), ()=>{
      this.alertify.messageAlertfy("Listemele Basarisiz oldu",{
        dismisOthers:true,
        delay:1,
        messageType:MessageType.Error,
        position:MessagePosition.TopRight
      })
    });
    // console.log(listProduct)
    // this.dataSource = new MatTableDataSource<List_Product>(listProduct.products);
    this.dataSource = new MatTableDataSource(listProduct.products);
    this.paginator.length = listProduct.totalProductCount;
}
async delete(id:string){
  // var product =
  this.showSpinner(SpinnerType.BallscaleMultiple);
  this.productService.delete(id,()=>this.hideSpinner(SpinnerType.BallscaleMultiple), ()=>{
    this.alertify.messageAlertfy("Silme başarılı oldu",{
      dismisOthers:true,
      delay:1,
      messageType:MessageType.Success,
      position:MessagePosition.TopRight
    })
  });


}

async pageChange(){
  await this.getProducts();
}
  async ngOnInit() {

await this.getProducts();

  }

  addProductImage(id:string){
    this.dialogService.openDialog({
      componentType:SelectProductImageDialogComponent,
      data:id,
      options:{
        width:"1250px",
        height:"300px",


      }

    })
  }

}
