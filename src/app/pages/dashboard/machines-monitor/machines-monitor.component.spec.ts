import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachinesMonitorComponent } from './machines-monitor.component';

describe('MachinesMonitorComponent', () => {
  let component: MachinesMonitorComponent;
  let fixture: ComponentFixture<MachinesMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachinesMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachinesMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
