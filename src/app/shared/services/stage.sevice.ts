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
export class StageService {

  private baseUrl = 'http://localhost:8080/api/stages';
  private createUrl = 'http://localhost:8080/api/stage';

  constructor(private http: HttpClient) { }

  

  getstage(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createstage(stage: Object): Observable<Object> {
    return this.http.post(`${this.createUrl}`, stage);
  }

  updatestage(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deletestage(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  
  getstageList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
