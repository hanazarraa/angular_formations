import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   AUTH_API = 'http://localhost:8000/auth/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
 
    constructor(private http: HttpClient) { }
  
    login(username?: string, password?: string): Observable<any> {
      return this.http.post(this.AUTH_API + 'signin/', {
        username,
        password
      }, this.httpOptions);
    }
  
    register(username: string, email: string, password: string): Observable<any> {
      return this.http.post(this.AUTH_API + 'signup', {
        username,
        email,
        password
      }, this.httpOptions);
    }
  }