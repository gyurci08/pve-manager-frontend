import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  private apiUrl = 'http://localhost:8888/api/pve/nodes';

  constructor(private http: HttpClient) {}

  getNodes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
