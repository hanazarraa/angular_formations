import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ReunionService {
  headers: Headers = new Headers();
  reunionsUrl:string='http://localhost:8000/api/reunions/';
 constructor(private httpclient:HttpClient,private userService:UserService) { }

 getReunions():Observable<any>{
   //console.log(this.userService.token)

   const headers = new HttpHeaders({
     'Content-Type': 'application/json',
      });
      console.log(localStorage);
       this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
       const options = {
     headers
   };
   return this.httpclient.get('http://localhost:8000/api/reunions/',options);
 
 }
 AjouterReunion(reunion:any):Observable<any>{
   //console.log(this.userService.token)

   const headers = new HttpHeaders({
     'Content-Type': 'application/json',
      });
      
       this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
       const options = {
     headers
   };
   return this.httpclient.post('http://localhost:8000/api/reunions/',reunion,options);
 
 }
 getReunionsByCours(cours:any):Observable<any>{
   //console.log(this.userService.token)

   const headers = new HttpHeaders({
     'Content-Type': 'application/json',
      });
      console.log(localStorage);
       this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
       const options = {
     headers
   };
   return this.httpclient.get(`${this.reunionsUrl}${cours}/`,options );
 
 }
  updateReunion(id:any,reunion:any):Observable<any>{
  //console.log(this.userService.token)

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
     });
     console.log(localStorage);
      this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
      const options = {
    headers
  };
  return this.httpclient.put(`${this.reunionsUrl}${id}/`,reunion,options );

}
}