import { Injectable } from '@angular/core';
declare var alertify:any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  messageAlertfy(message: string, options: AlertifyOptions){
    alertify.set('notifier','delay', options.delay);
    alertify.set('notifier','position', options.position);
   const msg= alertify[options.messageType](message);
   if(options.dismisOthers)
      msg.dismissOthers();
  }
  dismiss(){
    alertify.dismissAll();
  }
}
export class AlertifyOptions{
  messageType: MessageType= MessageType.Notify;
  position: MessagePosition = MessagePosition.TopRight;
  delay:number =3;
  dismisOthers: boolean =false;


}
export enum MessagePosition{
  BottomRight ="bottom-right",
  BottomCenter = "bottom-center",
  BottomLeft = "bottom-left",
  TopCenter = "top-center",
  TopLeft = "top-left",
  TopRight = "top-right"


}

export enum MessageType{
  Error ="error",
  Success ="success",
  Warning = "warning",
  Message = "message",
  Notify="notify",
}
