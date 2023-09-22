import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent extends BaseComponent implements OnInit {
  constructor(spinner:NgxSpinnerService){super(spinner)}
  ngOnInit(): void {
    this.showSpinner(SpinnerType.LineSpinClockwiseFade);
  }

}
