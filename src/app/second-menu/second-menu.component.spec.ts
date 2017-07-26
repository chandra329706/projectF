import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondMenuComponent } from './second-menu.component';

describe('SecondMenuComponent', () => {
  let component: SecondMenuComponent;
  let fixture: ComponentFixture<SecondMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
