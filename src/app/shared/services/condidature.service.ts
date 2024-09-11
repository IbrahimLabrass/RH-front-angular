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

  export class CondidatureService {

    private baseUrl = 'http://localhost:8080/api/condidatures';
    private createUrl = 'http://localhost:8080/api/condidature';
  
    constructor(private http: HttpClient) { }
  
    
  
    getcondidature(id: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/${id}`);
    }

    
  
    createcondidature(condidature: Object): Observable<Object> {
      return this.http.post(`${this.createUrl}`, condidature);
    }
  
    updatecondidature(id: number, value: any): Observable<Object> {
      return this.http.put(`${this.baseUrl}/${id}`, value);
    }
  
    deletecondidature(id: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
    }
  
    
    getcondidatureList(): Observable<any> {
      return this.http.get(`${this.baseUrl}`);
    }
}
