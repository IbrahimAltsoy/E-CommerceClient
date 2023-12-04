import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessagePosition, MessageType } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';

import { ProductService } from 'src/app/services/common/models/product.service';
declare var $:any;
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element:ElementRef,
     private _renderer:Renderer2,
     private httpClient: HttpClientService,
     public dialog: MatDialog,
     private alertfy: AlertifyService,
     private dialogService:DialogService)
   {
    const img = _renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/delete.png");
    img.setAttribute("style", "cursor: pointer;");
    img.height=25;
    img.width=25;
    // img.setAttribute("style","color: red;")
    _renderer.appendChild(element.nativeElement, img);
   }
   @Input() id:string;
   @Input() controller:string;
   @Output() callback: EventEmitter<any> = new EventEmitter();
@HostListener("click")
 async onclick(){

this.dialogService.openDialog({
  componentType:DeleteDialogComponent,
  data: DeleteState.Yes,
  afterClosed:()=>{
    const td = HTMLTableCellElement = this.element.nativeElement;
//await this.productService.delete(this.id);
this.httpClient.delete({
  controller: this.controller
},this.id).subscribe(data=>{

  $(td.parentElement).fadeOut(1800, ()=>{
    this.callback.emit();
    this.alertfy.messageAlertfy("Başarılı bir şekilde silinmiştir.", {
delay:1,
      dismisOthers:true,
      messageType:MessageType.Success,
      position:MessagePosition.TopRight
    });

  });
  }, (errorMessage:HttpErrorResponse)=>{
    this.alertfy.messageAlertfy("Silmeye çalışırken bir hata ile karşılaştı",{
      delay:5,
      dismisOthers:true,
      position: MessagePosition.TopRight,
      messageType:MessageType.Error
    })
  });

  }
})





}
}
// openDialog(afterClosed:any): void {
//   const dialogRef = this.dialog.open(DeleteDialogComponent, {
//     data: DeleteState.Yes,
//   });

//   dialogRef.afterClosed().subscribe(result => {
//     if(result==DeleteState.Yes){
//       afterClosed();
//     }
//   });
// }
