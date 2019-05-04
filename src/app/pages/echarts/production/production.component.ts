import { Component, OnInit } from '@angular/core';
import { PinionshaftService } from '../../@service/pinionshaft.service';
import { Observable } from 'rxjs';
import { PinionShaftProduction } from '../../@model/pinionshaft-production';
import { PinionShaftProductionBarChartData } from '../../@model/pinionshaft-production-bar-chart-data';

@Component({
  selector: 'production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class ProductionComponent implements OnInit {

  constructor(
    private pinionShaftService: PinionshaftService
  ) { }

  public pinionTargetDataObs$: Observable<PinionShaftProduction[]>;
  public pinionTargetData: PinionShaftProduction[];
  public pinionTargetDataArr: any = [];

  public pinionOkDataObs$: Observable<PinionShaftProduction[]>;
  public pinionOkData: PinionShaftProduction[];
  public pinionOkDataArr: any = [];

  public pinionNgDataObs$: Observable<PinionShaftProduction[]>;
  public pinionNgData: PinionShaftProduction[];
  public pinionNgDataArr: any = [];

  public pinionShaftProductionBarChartData: PinionShaftProductionBarChartData;

  options: any = {};
  themeSubscription: any;
  newDataOption: any = {};
  echartsInstance: any;

  ngOnInit() {
    this.pinionShaftService.getProductionBarChartData()
      .subscribe((data) => {
        this.pinionShaftProductionBarChartData = data;
        this.pinionShaftProductionBarChartData.infoProductionData.map((eachValue) => {
          this.pinionTargetDataArr.push([eachValue.time, eachValue.products]);
        });
        this.pinionShaftProductionBarChartData.okProductionData.map((eachValue) => {
          this.pinionOkDataArr.push([eachValue.time, eachValue.products]);
        });
        this.pinionShaftProductionBarChartData.ngProductionData.map((eachValue) => {
          this.pinionNgDataArr.push([eachValue.time, eachValue.products]);
        });
        this.options = {
          tooltip: {
            trigger: 'item',
            formatter: function (params: any) {
              const date = new Date(params.value[0]);
              const dateData = date.getMonth() + '/' + date.getDate() + '-' + date.getHours() + ':' + date.getMinutes();
              return dateData + '<br/>' + params.value[1];
            },
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          legend: {
            left: 'left',
            data: ['Target', 'OK', 'NG'],
          },
          xAxis: [
            {
              type: 'time',
              axisTick: {
                alignWithLabel: true,
              },
              axisLabel: {
                formatter: (
                  function (value: any) {
                    const date = new Date(value);
                    return date.getHours() + ':' + date.getMinutes();
                  }),
              }
            },
          ],
          yAxis: [
            {
              type: 'value',
            },
          ],
          grid: {
            show: true,
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          series: [
            {
              name: 'Target',
              type: 'line',
              data: this.pinionTargetDataArr,
              itemStyle: {
                color: '#000099',
              },
            },
            {
              name: 'OK',
              type: 'bar',
              data: this.pinionOkDataArr,
              itemStyle: {
                color: '#009900',
              },
            },
            {
              name: 'NG',
              type: 'bar',
              data: this.pinionNgDataArr,
              itemStyle: {
                color: '#cc0000',
              },
            }
          ],
        };
      });
  }

  onChartInit(e: any) {
    this.echartsInstance = e;
  }

}
