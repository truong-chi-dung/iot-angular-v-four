import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryMapComponent } from './factory-map.component';

describe('FactoryMapComponent', () => {
  let component: FactoryMapComponent;
  let fixture: ComponentFixture<FactoryMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoryMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
