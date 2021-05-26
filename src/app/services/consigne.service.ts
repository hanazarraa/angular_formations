import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ConsigneService {

  headers: Headers = new Headers();

  constructor(private httpclient:HttpClient,private userService:UserService) { }
  AjouterConsigne(consigne:any):Observable<any>{
    //console.log(this.userService.token)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.post('http://localhost:8000/api/consignes/',consigne,options);
  
  }
  /*public upload(formData) {
    return this.http.post<any>(`${this.DJANGO_SERVER}/upload/`, formData);
  }*/
}
