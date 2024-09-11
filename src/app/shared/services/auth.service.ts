import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { SignUpInfo } from './signup-info';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://127.0.0.1:8080/api/auth/signin';
  private signupUrl = 'http://localhost:8080/api/auth/signup';
  private forget = 'http://localhost:8080/api/forgot-password?email=';
  private reset = 'http://localhost:8080/api/reset-password?token=';
  private password = '&password='
  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

  forgetpassword(info: string): Observable<string> {
    return this.http.post<string>(`${this.forget}${info}`, httpOptions);
  }

  resetpassword(token: string,password: string): Observable<string> {
    return this.http.put<string>(`${this.reset}${token}${this.password}${password}`, httpOptions);
  }
}
