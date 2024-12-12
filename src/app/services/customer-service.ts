import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class CustomerService {
  private apiUrl = environment.apiUrl+"/customer";

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
