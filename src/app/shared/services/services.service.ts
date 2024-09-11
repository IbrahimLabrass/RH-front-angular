import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private baseUrl = 'http://localhost:8080/api/services';
  private createUrl = 'http://localhost:8080/api/services';

  constructor(private http: HttpClient) { }

  

  getservice(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createservice(service: Object): Observable<Object> {
    return this.http.post(`${this.createUrl}`, service);
  }

  updateservice(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteservice(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  
  getserviceList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
