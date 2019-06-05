import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Machine } from '../@model/machine';

@Injectable({
  providedIn: 'root',
})
export class MachineService {

  constructor(private http: HttpClient) { }

  getMachinesUrl = '/api/machines';
  getMachineByIdUrl = '/api/machine/pinionshaft';

  getMachines(): Observable<Machine[]> {
    return this.http.get<Machine[]>(this.getMachinesUrl);
  }

  getMachineById(): Observable<Machine[]> {
    return this.http.get<Machine[]>(this.getMachineByIdUrl);
  }
}
