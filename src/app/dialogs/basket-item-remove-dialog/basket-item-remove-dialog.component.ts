import { Component, Inject, OnDestroy } from '@angular/core';
import { Basedialog } from '../base/basedialog';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
declare var $:any
@Component({
  selector: 'app-basket-item-remove-dialog',
  templateUrl: './basket-item-remove-dialog.component.html',
  styleUrls: ['./basket-item-remove-dialog.component.scss']
})
export class BasketItemRemoveDialogComponent extends Basedialog<BasketItemRemoveDialogComponent> implements OnDestroy{
constructor(dialogRef: MatDialogRef<BasketItemRemoveDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: BasketItemDeleteState,){super(dialogRef)}
  ngOnDestroy(): void {
    $("#basketModal").modal("show");
  }

}
export enum BasketItemDeleteState{
  Yes,No
}
