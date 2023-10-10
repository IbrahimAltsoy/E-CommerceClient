import { Component } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'E-CommerceClient';

 }


// $.get("https://localhost:7201/api/", (datas: any)=>{
//   console.log(datas)
// });
