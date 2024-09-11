import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http :HttpClient) { }

  private baseUrl = 'http://localhost:8080/api/getemail';

  enviarEmail(email): Observable<any> {
    return this.http.post(`${this.baseUrl}`, email);
  }

}