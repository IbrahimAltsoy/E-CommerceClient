import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';
import { FileUploadModule } from "../services/common/file-upload/file-upload.module";
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { BasketItemRemoveDialogComponent } from './basket-item-remove-dialog/basket-item-remove-dialog.component';
import { ShoppingCompletedDialogComponent } from './shopping-completed-dialog/shopping-completed-dialog.component';
import { OrderDetailDialogComponent } from './order-detail-dialog/order-detail-dialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
@NgModule({
    declarations: [DeleteDialogComponent,

        SelectProductImageDialogComponent,
         BasketItemRemoveDialogComponent,
         ShoppingCompletedDialogComponent,
         OrderDetailDialogComponent],
    imports: [
        CommonModule,
         MatDialogModule,
          MatButtonModule,
        FileUploadModule,
        MatCardModule,
        FormsModule,
        MatToolbarModule,MatTableModule


    ]
})
export class DialogModule { }
