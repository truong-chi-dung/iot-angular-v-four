import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EchartsComponent } from './echarts.component';
import { ProductionComponent } from './production/production.component';
import { MeasuringComponent } from './measuring/measuring.component';
import { ThemeModule } from '../../@theme/theme.module';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [
    EchartsComponent,
    ProductionComponent,
    MeasuringComponent,
  ],
  imports: [
    CommonModule,
    ThemeModule,
    NgxEchartsModule,
  ]
})
export class EchartsModule { }
