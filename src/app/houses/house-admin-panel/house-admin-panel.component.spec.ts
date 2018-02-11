import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseAdminPanelComponent } from './house-admin-panel.component';

describe('HouseAdminPanelComponent', () => {
  let component: HouseAdminPanelComponent;
  let fixture: ComponentFixture<HouseAdminPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseAdminPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseAdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
