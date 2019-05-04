import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuringComponent } from './measuring.component';

describe('MeasuringComponent', () => {
  let component: MeasuringComponent;
  let fixture: ComponentFixture<MeasuringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasuringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasuringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
