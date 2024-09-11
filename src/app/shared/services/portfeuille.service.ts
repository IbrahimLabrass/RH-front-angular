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
export class PortfeuilleService {

  private baseUrl = 'http://localhost:8080/api/portfeuille';
  private createUrl = 'http://localhost:8080/api/portfeuille';

  constructor(private http: HttpClient) { }

  

  getportfeuille(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createportfeuille(portfeuille: Object): Observable<Object> {
    return this.http.post(`${this.createUrl}`, portfeuille);
  }

  updateportfeuille(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteportfeuille(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  
  getportfeuilleList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
