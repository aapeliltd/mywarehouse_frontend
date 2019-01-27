import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyUsComponent } from './notify-us.component';

describe('NotifyUsComponent', () => {
  let component: NotifyUsComponent;
  let fixture: ComponentFixture<NotifyUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifyUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
