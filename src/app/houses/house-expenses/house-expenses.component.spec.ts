import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseExpensesComponent } from './house-expenses.component';

describe('HouseExpensesComponent', () => {
  let component: HouseExpensesComponent;
  let fixture: ComponentFixture<HouseExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
