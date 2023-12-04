import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { HubUrls } from 'src/app/constants/hubs.Url';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { AlertifyOptions, AlertifyService, MessagePosition, MessageType } from 'src/app/services/admin/alertify.service';
import { SignalRService } from 'src/app/services/common/signal-r.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {
  constructor(spinner:NgxSpinnerService,private signalRService: SignalRService, private alertfiy:AlertifyService){
    super(spinner)
    // signalRService.start(HubUrls.OrderHubUrl)
    // signalRService.start(HubUrls.ProductHubUrl)

  }
  ngOnInit(): void {
    this.signalRService.on(HubUrls.ProductHubUrl,ReceiveFunctions.ProductAddedMessageReceiveFunction, message=>{
this.alertfiy.messageAlertfy(message, {
  dismisOthers:true,
delay:3,
messageType:MessageType.Warning,
position: MessagePosition.TopLeft,

})
    });
    this.signalRService.on(HubUrls.OrderHubUrl,ReceiveFunctions.OrderAddedMessageReceiveFunction, message=>{
      this.alertfiy.messageAlertfy(message, {
        dismisOthers:true,
      delay:3,
      messageType:MessageType.Warning,
      position: MessagePosition.TopLeft,

      })
          })
  }

}
