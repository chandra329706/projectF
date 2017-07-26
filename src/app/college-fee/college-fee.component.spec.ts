import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeFeeComponent } from './college-fee.component';

describe('CollegeFeeComponent', () => {
  let component: CollegeFeeComponent;
  let fixture: ComponentFixture<CollegeFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegeFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
