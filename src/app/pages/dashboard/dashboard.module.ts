import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { MachinesMonitorComponent } from './machines-monitor/machines-monitor.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    DashboardComponent,
    MachinesMonitorComponent,
  ],
})
export class DashboardModule { }
