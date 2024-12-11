import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  private baseUrl = 'http://localhost:8888/api/pve'; // Your API base URL

  constructor(private http: HttpClient) {}

  fetchNodes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/nodes`);
  }

  fetchNode(nodeId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/nodes/${nodeId}`);
  }
}
