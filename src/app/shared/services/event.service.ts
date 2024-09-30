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
export class EventService {

  private baseUrl = 'http://localhost:8080/api/events';
  private createUrl = 'http://localhost:8080/api/event';

  constructor(private http: HttpClient) { }

  

  getevent(id: number): Observable<any> {
    return this.http.get(`${this.createUrl}/${id}`);
  }

  createevent(event: Object): Observable<Object> {
    return this.http.post(`${this.createUrl}`, event);
  }

  updateevent(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteevent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  
  geteventList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
