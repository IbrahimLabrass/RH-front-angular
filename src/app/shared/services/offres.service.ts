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
export class OffresService {

  private baseUrl = 'http://localhost:8080/api/offres';
  private createUrl = 'http://localhost:8080/api/offre';

  constructor(private http: HttpClient) { }

  

  getOffre(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createOffre(Offre: Object): Observable<Object> {
    return this.http.post(`${this.createUrl}`, Offre);
  }

  updateOffre(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteOffre(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  
  getOffreList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getOffreListByUser(id): Observable<any> {
    return this.http.get('http://localhost:8080/api/offre/'+id);
  }
  
}
