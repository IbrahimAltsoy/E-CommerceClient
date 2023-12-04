import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor(@Inject("baseSignalRUrl")private baseSignalRUrl:string) { }
//   private _connection:HubConnection;
//   get connection():HubConnection{
// return this._connection
//   }

  start(hubUrl:string){
    hubUrl =this.baseSignalRUrl+hubUrl;
    // if(!this._connection || this._connection.state==HubConnectionState.Disconnected){
      const builder:HubConnectionBuilder = new HubConnectionBuilder();
      const hubconnection = builder.withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();
      hubconnection.start()
      .then(()=>
        console.log("connected"))
      .catch(()=>setTimeout(()=>this.start(hubUrl),2000))
      // this._connection = hubconnection;
  // }

    hubconnection.onreconnected(connectionId=> console.log("Reconnected"))
  hubconnection.onreconnecting(error=>console.log("Reconnecting"))
  hubconnection.onclose(error=>console.log("Close connection"))
    return hubconnection;
  }
  invoke(hubUrl:string, procedureName:string,message:any, successCallBack?:(value)=>void, errorCallack?:(error)=>void){
this.start(hubUrl).invoke(procedureName, message)
.then(successCallBack)
.catch(errorCallack)
  }
  on(hubUrl:string,procedureName:string, callBack:(...message:any)=>void){
    this.start(hubUrl).on(procedureName, callBack)

  }
}
