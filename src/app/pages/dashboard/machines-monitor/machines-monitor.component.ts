import { Component, OnInit, OnDestroy } from '@angular/core';
import { Machine } from '../../@model/machine';
import { MachineService } from '../../@service/machine.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-machines-monitor',
  templateUrl: './machines-monitor.component.html',
  styleUrls: ['./machines-monitor.component.scss'],
})
export class MachinesMonitorComponent implements OnInit, OnDestroy {

  private alive = true;
  public machines: Machine[];

  constructor(
    private machineService: MachineService,
  ) { }

  ngOnInit() {
    this.machineService.getMachines()
    .pipe(
      takeWhile(() => this.alive),
    )
    .subscribe(
      machines => this.machines = machines,
    );
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
