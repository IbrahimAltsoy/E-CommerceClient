import { Component, Inject, OnDestroy } from '@angular/core';
import { Basedialog } from '../base/basedialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
declare var $:any
@Component({
  selector: 'app-shopping-completed-dialog',
  templateUrl: './shopping-completed-dialog.component.html',
  styleUrls: ['./shopping-completed-dialog.component.scss']
})
export class ShoppingCompletedDialogComponent extends Basedialog<ShoppingCompletedDialogComponent> implements OnDestroy {
  constructor(dialogRef: MatDialogRef<ShoppingCompletedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ShoppingCompletedDeleteState,){super(dialogRef)}
    show:boolean=false;
    complete(){
this.show=true;
    }

    ngOnDestroy(): void {
      if(!this.show){$("#basketModal").modal("show");}


    }

}


export enum ShoppingCompletedDeleteState{
  Yes,No
}
