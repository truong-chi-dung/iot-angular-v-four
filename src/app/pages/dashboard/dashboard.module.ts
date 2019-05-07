import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { MachinesMonitorComponent } from './machines-monitor/machines-monitor.component';
import { FactoryMapComponent } from './factory-map/factory-map.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    DashboardComponent,
    MachinesMonitorComponent,
    FactoryMapComponent,
  ],
})
export class DashboardModule { }
