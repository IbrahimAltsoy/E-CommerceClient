import { MatDialogRef } from "@angular/material/dialog";
import { DeleteDialogComponent } from "../delete-dialog/delete-dialog.component";

export class Basedialog<DeleteDialogComponent> {
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>){}
  close(){
    this.dialogRef.close();
  }
}
