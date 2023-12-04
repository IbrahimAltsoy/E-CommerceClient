import { Component, Input } from '@angular/core';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessagePosition, MessageType } from '../../admin/alertify.service';
import { NgxToastrService, ToastrMessageType, ToastrPosition } from '../../ui/ngx-toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent, FileUploudDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  constructor(
    private httpClient:HttpClientService,
    private alertiftService: AlertifyService,
    private toastrService: NgxToastrService,private dialog: MatDialog,
    private dialogService : DialogService,
    private spinner : NgxSpinnerService

    ){}
  public files: NgxFileDropEntry[];
  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }
    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploudDialogState.Yes,
      afterClosed: () => {
        this.spinner.show(SpinnerType.BallFall)
        this.httpClient.post({
          controller: this.options.controller,
          action: this.options.action,
          querystring: this.options.queryString,
          headers: new HttpHeaders({ "responseType": "blob" })
        }, fileData).subscribe(data => {

          const message: string = "Dosyalar başarıyla yüklenmiştir.";

          this.spinner.hide(SpinnerType.BallFall);
          if (this.options.isAdminPage) {
            this.alertiftService.messageAlertfy(message,
              {
                dismisOthers: true,
                delay:3,
                messageType: MessageType.Success,
                position: MessagePosition.TopRight
              })
          } else {
            this.toastrService.message(message, "Başarılı.", {
              messageType: ToastrMessageType.Success,
              toastrPosition: ToastrPosition.TopRight
            })
          }


        }, (errorResponse: HttpErrorResponse) => {

          const message: string = "Dosyalar yüklenirken beklenmeyen bir hatayla karşılaşılmıştır.";

          this.spinner.hide(SpinnerType.BallFall)
          if (this.options.isAdminPage) {
            this.alertiftService.messageAlertfy(message,
              {
                dismisOthers: true,
                delay:3,
                messageType: MessageType.Error,
                position: MessagePosition.TopRight
              })
          } else {
            this.toastrService.message(message, "Başarsız.", {
              messageType: ToastrMessageType.Error,
              toastrPosition: ToastrPosition.TopRight
            })
          }

        });
      }
    });
  }

  //openDialog(afterClosed: any): void {
  //  const dialogRef = this.dialog.open(FileUploadDialogComponent, {
  //    width: '250px',
  //    data: FileUploadDialogState.Yes,
  //  });

  //  dialogRef.afterClosed().subscribe(result => {
  //    if (result == FileUploadDialogState.Yes)
  //      afterClosed();
  //  });
  //}

}

// export class FileUploapOptions{
//   controller?:string;
//   action?:string;
//   queryStrng?:string;
//   explanation?:string;
//   accept?:string;
//   isAdminPage?: boolean=false;
// }

export class FileUploadOptions{
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;

}
