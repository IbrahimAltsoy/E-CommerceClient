import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create-product.service';
import { AlertifyService, MessagePosition, MessageType } from 'src/app/services/admin/alertify.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
// import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit{
  constructor(private productService:ProductService, spinner: NgxSpinnerService, private alertify: AlertifyService){super(spinner)}
  ngOnInit(): void {

  }
  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();
  // @Output() fileUploadOptions:Partial<FileUploadOptions>={
  //   controller:"products",
  //   action: "upload",
  //   explanation: "Resimleri seçin ya da sürükleyiniz",
  //   isAdminPage:true,
  //   accept:".png, .jpeg, .jpg"

  // };

  create(name:HTMLInputElement, description:HTMLInputElement, stock:HTMLInputElement,price:HTMLInputElement){
    const create_product: Create_Product= new Create_Product();
    this.showSpinner(SpinnerType.BallFall)
    create_product.name = name.value;
    create_product.description =description.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);

    this.productService.create(create_product, () => {
      this.hideSpinner(SpinnerType.BallSpin);
      this.alertify.messageAlertfy("Ürün başarıyla eklenmiştir.", {
        dismisOthers: true,
        delay:1,
        messageType: MessageType.Success,
        position: MessagePosition.TopRight
      });
      this.createdProduct.emit(create_product);
    }, errorMessage => {

      this.alertify.messageAlertfy(errorMessage,{
        dismisOthers:true,
        delay:1,
        position:MessagePosition.TopRight,
        messageType:MessageType.Error
      })

    });
  }
}
