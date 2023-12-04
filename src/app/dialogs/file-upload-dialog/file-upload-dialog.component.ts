import { Component, Inject } from '@angular/core';
import { Basedialog } from '../base/basedialog';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.scss']
})
export class FileUploadDialogComponent extends Basedialog<FileUploadDialogComponent> {
  constructor(
    dialofRef: MatDialogRef<FileUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FileUploudDialogState)
    {super(dialofRef)}

}
export enum FileUploudDialogState{
  Yes, No
}
