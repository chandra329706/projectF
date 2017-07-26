import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendToBankComponent } from './send-to-bank.component';

describe('SendToBankComponent', () => {
  let component: SendToBankComponent;
  let fixture: ComponentFixture<SendToBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendToBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendToBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
