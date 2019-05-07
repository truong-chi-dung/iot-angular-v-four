import { Component, OnInit, OnDestroy } from '@angular/core';
import { Machine } from '../../@model/machine';
import { MachineService } from '../../@service/machine.service';
import { takeWhile } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { RefreshService } from '../../../@service/refresh.service';

@Component({
  selector: 'ngx-machines-monitor',
  templateUrl: './machines-monitor.component.html',
  styleUrls: ['./machines-monitor.component.scss'],
})
export class MachinesMonitorComponent implements OnInit, OnDestroy {

  private alive = true;
  public machines: Machine[];

  private timeRefreshSubscription: Subscription;
  public selectedItem: string;
  public speedVal: number = 5000;
  
  constructor(
    private machineService: MachineService,
    private refreshService: RefreshService,
  ) { }

  ngOnInit() {
    this.machineService.getMachines()
    .pipe(
      takeWhile(() => this.alive),
    )
    .subscribe(
      machines => this.machines = machines,
    );
    this.updateMachineStatus();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  updateMachineStatus() {
    this.timeRefreshSubscription = this.refreshService.withRefresh()
      .subscribe(
        () => {
          this.machineService.getMachines()
            .subscribe((data) => {
              // console.log(this.speedVal);
              this.machines = data;
            });
        }
      );
  }

}
