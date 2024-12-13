import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import {Vm} from '../entities/Vm';

@Injectable({
  providedIn: 'root'
})
export class VmService {
  private apiUrl = environment.apiUrl + "/customer";

  constructor(private http: HttpClient) {}

  getVms(customerId: number): Observable<Vm[]> {
    return this.http.get<Vm[]>(`${this.apiUrl}/${customerId}/vm`);
  }

  getVm(customerId:number, vmId:number): Observable<Vm> {
    return this.http.get<Vm>(`${this.apiUrl}/${customerId}/vm/${vmId}`);
  }

}
