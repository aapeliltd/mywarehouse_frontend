import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseWarehouseComponent } from './choose-warehouse.component';

describe('ChooseWarehouseComponent', () => {
  let component: ChooseWarehouseComponent;
  let fixture: ComponentFixture<ChooseWarehouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseWarehouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
