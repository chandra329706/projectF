import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolFeeComponent } from './school-fee.component';

describe('SchoolFeeComponent', () => {
  let component: SchoolFeeComponent;
  let fixture: ComponentFixture<SchoolFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
