import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';






@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent extends BaseComponent implements OnInit{
  constructor( spinner:NgxSpinnerService){
super(spinner);
  }

  // uygula(){
  //   this.spinner.show(SpinnerType.BallSpin);

  // }

  // spinnere color eklemeyi dene

  // n(){
  //   this.toastr.clear();
  // }
  ngOnInit(): void {

this.showSpinner(SpinnerType.LineSpinClockwiseFade);
// this.hideSpinner(SpinnerType.BallFall);
  }


}
