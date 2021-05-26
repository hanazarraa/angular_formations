import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class NiveauService {
  headers: Headers = new Headers();

  constructor(private httpclient:HttpClient,private userService:UserService) { }

  getNiveaux():Observable<any>{
    //console.log(this.userService.token)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       console.log(localStorage);
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.get('http://localhost:8000/api/niveaux/',options);
  
  }
}