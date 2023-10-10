import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ReadComponent } from './read/read.component';
import { Create_Product } from 'src/app/contracts/create-product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent extends BaseComponent implements OnInit {
  constructor(private httpClent: HttpClientService, spinner: NgxSpinnerService){super(spinner)}
  ngOnInit(): void {

  }
  @ViewChild(ReadComponent) readComponent:ReadComponent;
  createdProduct(createdProuct: Create_Product){
this.readComponent.getProducts();
  }

}





