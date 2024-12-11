import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VmService {
  private baseUrl = 'http://localhost:8888/api/pve/nodes';

  constructor(private http: HttpClient) {}

  getVms(nodeId: string): Observable<any> {
    const url = `${this.baseUrl}/${nodeId}/vms`;
    return this.http.get<any>(url);
  }
}
