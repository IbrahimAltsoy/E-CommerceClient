import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { BaseUrl } from 'src/app/contracts/base_url';
import { Create_Basket_Item } from 'src/app/contracts/basket/create_basket_item';
import { List_Product } from 'src/app/contracts/list-product.service';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { NgxToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/ngx-toastr.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent extends BaseComponent implements OnInit {
 constructor(private productService:ProductService,
  private activatedRoute: ActivatedRoute, private fileService:FileService, private basketService:BasketService, spinner: NgxSpinnerService,private toastrService: NgxToastrService){super(spinner)

}
products:List_Product[];
currentPageNo: number;
totalProductCount:number;
totalPageCount:number;
pageSize:number=8;
pageList:number[]=[];
baseUrl:BaseUrl;


   async ngOnInit() {

    this.baseUrl=await this.fileService.getBaseStorageUrl();


this.activatedRoute.params.subscribe(async params=>{
  this.currentPageNo = parseInt(params["pageNo"]?? 1);

  const datas:{totalProductCount: number, products:List_Product[]} =await this.productService.read(this.currentPageNo-1,this.pageSize, ()=>{

        },()=>{


        });
        this.products = datas.products;
        this.products = this.products.map<List_Product>( p => {
          const listProduct: List_Product = {
            id: p.id,
            imagePath: p.productImageFiles.length ? p.productImageFiles.find(p => p.showcase).path : "",
            name: p.name,
            description:p.description,
            price: p.price,
            stock: p.stock,
            productImageFiles: p.productImageFiles
          };

          return listProduct;
        });
        this.totalProductCount =datas.totalProductCount;
        this.totalPageCount = Math.ceil(this.totalProductCount/this.pageSize);

        this.pageList =[];
        if(this.currentPageNo-3<=0){
          for(let i=1; i<=7;i++){
this.pageList.push(i);
          }

        }
        else if(this.currentPageNo+3>=this.totalPageCount){
          for(let i=this.totalPageCount-6; i<=this.totalPageCount; i++){
            this.pageList.push(i);

        }
      }
      else{
        for(let i=this.currentPageNo-3; i<=this.currentPageNo+3;i++){
          this.pageList.push(i);

      }
      }
})



  }
 async addToBasket(product:List_Product){
  this.showSpinner(SpinnerType.LineSpinClockwiseFade);
    let _basketItem: Create_Basket_Item = new Create_Basket_Item();
    _basketItem.productId = product.id;
    _basketItem.quantity = 1;
   await this.basketService.post(_basketItem)
   this.hideSpinner(SpinnerType.LineSpinClockwiseFade);
   this.toastrService.message("Ürün sepete eklendi", "Başarılı",{
    toastrPosition: ToastrPosition.TopRight,
    messageType: ToastrMessageType.Success
  })




  }

// async getProduct(){
//   this.productService.read();
//   const listProduct:{totalCount: number, products:List_Product[]} = await this.productService.read(this.paginator? this.paginator.pageIndex:0,this.paginator? this.paginator.pageSize:5)
//   this.dataSource = new MatTableDataSource(listProduct.products);
//     this.paginator.length = listProduct.totalCount;
// }
}
