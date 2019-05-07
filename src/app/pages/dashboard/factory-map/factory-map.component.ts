import { Component, OnInit, OnDestroy } from '@angular/core';
import { Machine } from '../../@model/machine';
import { MachineService } from '../../@service/machine.service';
import { takeWhile } from 'rxjs/operators';
import { RefreshService } from '../../../@service/refresh.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-factory-map',
  templateUrl: './factory-map.component.html',
  styleUrls: ['./factory-map.component.scss']
})
export class FactoryMapComponent implements OnInit, OnDestroy {

  private alive = true;
  public machines: Machine[];
  
  // viewBox = '-20 -20 618.88 407.99';
  viewBox = '-20 -20 950 450';
  mapFloor = 'M5,5 V395 H895 V5 Z';

  roomSvg = {
    borders: [{
      d: 'M186.21,130.05H216.37V160H186.21Z',
    }],
  };

  private timeRefreshSubscription: Subscription;
  public selectedItem: string;
  public speedVal: number = 5000;
  
  constructor(
    private machineService: MachineService,
    private refreshService: RefreshService
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
