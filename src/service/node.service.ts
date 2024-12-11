import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  private apiUrl = 'http://localhost:8888/api/pve/nodes';

  constructor(private http: HttpClient) {}

  // Method to get all nodes
  getNodes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Method to get a single node by its ID
  getNode(nodeId: string): Observable<any> {
    const url = `${this.apiUrl}/${nodeId}`; // Construct the URL for the specific node
    return this.http.get<any>(url);
  }
}
