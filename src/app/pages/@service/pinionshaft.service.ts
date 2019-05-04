import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PinionShaftMeasureValue } from '../@model/pinionshaft-measure-value';
import { PinionLeftRightMeasureValue } from '../@model/pinionshaft-left-right-measure-value';
import { PinionShaftProduction } from '../@model/pinionshaft-production';
import { PinionShaftProductionBarChartData } from '../@model/pinionshaft-production-bar-chart-data';

@Injectable({
  providedIn: 'root',
})
export class PinionshaftService {

  constructor(private http: HttpClient) { }

  getLeftDataUrl                = '/api/pinionshaft-left';
  getRightDataUrl               = '/api/pinionshaft-right';
  getLeftRightDataUrl           = '/api/pinionshaft-left-right';

  getTargetDataUrl              = '/api/pinionshaft-production-info';
  getOkDataUrl                  = '/api/pinionshaft-judg-ok';
  getNgDataUrl                  = '/api/pinionshaft-judg-ng';
  getProductionBarChartDataUrl  = '/api/pinionshaft-judg-ok-ng';

  getLeftData(): Observable<PinionShaftMeasureValue[]> {
    return this.http.get<PinionShaftMeasureValue[]>(this.getLeftDataUrl);
  }

  getRightData(): Observable<PinionShaftMeasureValue[]> {
    return this.http.get<PinionShaftMeasureValue[]>(this.getRightDataUrl);
  }

  getLeftRightData(): Observable<PinionLeftRightMeasureValue> {
    return this.http.get<PinionLeftRightMeasureValue>(this.getLeftRightDataUrl).pipe(
      map(data => new PinionLeftRightMeasureValue().deserialize(data)),
      catchError(() => throwError('Data not found')),
    );
  }

  getTargetData(): Observable<PinionShaftProduction[]> {
    return this.http.get<PinionShaftProduction[]>(this.getTargetDataUrl);
  }

  getOkData(): Observable<PinionShaftProduction[]> {
    return this.http.get<PinionShaftProduction[]>(this.getOkDataUrl);
  }

  getNgData(): Observable<PinionShaftProduction[]> {
    return this.http.get<PinionShaftProduction[]>(this.getNgDataUrl);
  }

  getProductionBarChartData(): Observable<PinionShaftProductionBarChartData> {
    return this.http.get<PinionShaftProductionBarChartData>(this.getProductionBarChartDataUrl);
  }

}
