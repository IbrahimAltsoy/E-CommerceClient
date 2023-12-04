import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCompletedDialogComponent } from './shopping-completed-dialog.component';

describe('ShoppingCompletedDialogComponent', () => {
  let component: ShoppingCompletedDialogComponent;
  let fixture: ComponentFixture<ShoppingCompletedDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingCompletedDialogComponent]
    });
    fixture = TestBed.createComponent(ShoppingCompletedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
