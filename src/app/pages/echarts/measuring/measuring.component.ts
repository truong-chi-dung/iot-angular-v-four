import { Component, OnInit, OnDestroy } from '@angular/core';
import { PinionshaftService } from '../../@service/pinionshaft.service';
import { RefreshService } from '../../../@service/refresh.service';
import { Subscription } from 'rxjs';
import { PinionShaftMeasureValue } from '../../@model/pinionshaft-measure-value';
import { PinionLeftRightMeasureValue } from '../../@model/pinionshaft-left-right-measure-value';

@Component({
  selector: 'ngx-measuring',
  templateUrl: './measuring.component.html',
  styleUrls: ['./measuring.component.scss']
})
export class MeasuringComponent implements OnInit, OnDestroy {

  constructor(
    private pinionShaftService: PinionshaftService,
    private refreshService: RefreshService
  ) { }

  private timeRefreshSubscription: Subscription;
  public selectedItem: string;
  public speedVal: number = 5000;

  public pinionDataLeft: PinionShaftMeasureValue[];
  public pinionDataLeftArr: any = [];
  public pinionDataRight: PinionShaftMeasureValue[];
  public pinionDataRightArr: any = [];
  public pinionLeftRightData: PinionLeftRightMeasureValue;

  options: any = {};
  themeSubscription: any;
  newDataOption: any = {};
  echartsInstance: any;

  ngOnInit() {
    this.updateMeasureValue();
    this.pinionShaftService.getLeftRightData()
      .subscribe((data) => {
        this.pinionLeftRightData = data;
        this.pinionLeftRightData.left.map((eachValue) => {
          this.pinionDataLeftArr.push([eachValue.time, eachValue.measureValue])
        });
        this.pinionLeftRightData.right.map((eachValue) => {
          this.pinionDataRightArr.push([eachValue.time, eachValue.measureValue])
        });
        this.options = {
          tooltip: {
            trigger: 'axis',
            formatter: '{a} : {c}',
          },
          legend: {
            left: 'left',
            data: ['OK Diameter', 'Line Left', 'Line Right'],
          },
          xAxis: [
            {
              type: 'time',
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
              min: 9.994,
              max: 10.002,
            },
          ],
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          series: [
            {
              name: 'OK Diameter',
              type: 'line',
              markArea: {
                data: [
                  [
                    {
                      yAxis: 9.996
                    },
                    {
                      yAxis: 10
                    }
                  ]
                ],
                itemStyle: {
                  color: 'rgb(51, 204, 51)',
                  opacity: 0.1
                }
              }
            },
            {
              name: 'Line Left',
              type: 'line',
              data: this.pinionDataLeftArr,
            },
            {
              name: 'Line Right',
              type: 'line',
              data: this.pinionDataRightArr,
            }
          ],
        };
      });
  }

  onChartInit(e: any) {
    this.echartsInstance = e;
  }

  onChange() {
    switch (this.selectedItem) {
      case '1':
        this.speedVal = 50000;
        this.refreshService.setInterval(this.speedVal);
        break;
      case '2':
        this.speedVal = 10000;
        this.refreshService.setInterval(this.speedVal);
        break;
      case '3':
        this.speedVal = 5000;
        this.refreshService.setInterval(this.speedVal);
        break;
    }
  }

  updateMeasureValue() {

    this.timeRefreshSubscription = this.refreshService.withRefresh()
      .subscribe(
        () => {
          this.pinionShaftService.getLeftRightData()
            .subscribe((data) => {

              console.log(this.speedVal);

              this.pinionDataLeftArr = [];
              this.pinionDataRightArr = [];
              this.pinionLeftRightData = data;
              this.pinionLeftRightData.left.map((eachValue) => {
                this.pinionDataLeftArr.push([eachValue.time, eachValue.measureValue])
              });
              this.pinionLeftRightData.right.map((eachValue) => {
                this.pinionDataRightArr.push([eachValue.time, eachValue.measureValue])
              });
              this.newDataOption = {
                series: [
                  {
                    name: 'Line Left',
                    type: 'line',
                    data: this.pinionDataLeftArr,
                  },
                  {
                    name: 'Line Right',
                    type: 'line',
                    data: this.pinionDataRightArr,
                  }
                ]
              };
              if (this.echartsInstance) {
                this.echartsInstance.setOption(this.newDataOption);
              }
            });
        }
      );
  }

  ngOnDestroy() {
    this.timeRefreshSubscription.unsubscribe();
  }

}
