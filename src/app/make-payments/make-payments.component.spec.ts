import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakePaymentsComponent } from './make-payments.component';

describe('MakePaymentsComponent', () => {
  let component: MakePaymentsComponent;
  let fixture: ComponentFixture<MakePaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakePaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
