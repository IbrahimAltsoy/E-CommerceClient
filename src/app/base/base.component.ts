import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


export class BaseComponent {
  constructor( private spinner: NgxSpinnerService){

  }
  showSpinner(spinnertype:SpinnerType){
    this.spinner.show(spinnertype);
    setTimeout(()=> this.hideSpinner(spinnertype),1000);

  }
  hideSpinner(name:SpinnerType){
    this.spinner.hide(name);
  }

  }
  export enum SpinnerType {
    BallSpin = "s1",
    LineSpinClockwiseFade = "s2",
    BallscaleMultiple = "s3",
    BallFall = "s4"


  }
