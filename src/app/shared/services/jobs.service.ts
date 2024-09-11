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
export class JobsService {

  private baseUrl = 'http://localhost:8080/api/services';
  private createUrl = 'http://localhost:8080/api/service';

  constructor(private http: HttpClient) { }

  

  getJob(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createJob(Job: Object): Observable<Object> {
    return this.http.post(`${this.createUrl}`, Job);
  }

  updateJob(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteJob(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  
  getJobList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getJobListByUser(id): Observable<any> {
    return this.http.get('http://localhost:8080/api/job/'+id);
  }
  
}
