import { List_Product_Image } from "./list-product-image";

export class List_Product{
  id:string;
  name:string;
  description:string;
  stock:number;
  price:number;
  productImageFiles?:List_Product_Image[];
  imagePath:string;

}
