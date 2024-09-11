import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
    private createUrl = 'http://localhost:8080/api/messages';
    private baseUrl = 'http://localhost:8080/api/message';

    private reps = 'http://localhost:8080/api/reponses';
    private rep = 'http://localhost:8080/api/reponse';
  constructor(private http: HttpClient) {
    
  }

 
  
  getmessages(): Observable<any> {
    return this.http.get(`${this.createUrl}`);
  }

  addmessage(condidature: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, condidature);
  }

  getreponses(): Observable<any> {
    return this.http.get(`${this.reps}`);
  }

  addreponse(condidature: Object): Observable<Object> {
    return this.http.post(`${this.rep}`, condidature);
  }
}
