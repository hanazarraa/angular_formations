import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  headers: Headers = new Headers();
  coursesUrl:string='http://localhost:8000/api/cours/';
 constructor(private httpclient:HttpClient,private userService:UserService) { }

 getCourses():Observable<any>{
   //console.log(this.userService.token)

   const headers = new HttpHeaders({
     'Content-Type': 'application/json',
      });
      console.log(localStorage);
       this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
       const options = {
     headers
   };
   return this.httpclient.get('http://localhost:8000/api/cours/',options);
 
 }
 AjouterCours(cours:any):Observable<any>{
   //console.log(this.userService.token)

   const headers = new HttpHeaders({
     'Content-Type': 'application/json',
      });
      
       this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
       const options = {
     headers
   };
   return this.httpclient.post('http://localhost:8000/api/cours/',cours,options);
 
 }
 getCoursByProgrammeID(id:any):Observable<any>{
   //console.log(this.userService.token)

   const headers = new HttpHeaders({
     'Content-Type': 'application/json',
      });
      console.log(localStorage);
       this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
       const options = {
     headers
   };
   return this.httpclient.get(`${this.coursesUrl}?programme=${id}`,options );
 
 }
 getCoursByProgrammeIDFormateur(id:any,formateur_id:any):Observable<any>{
  //console.log(this.userService.token)

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
     });
     console.log(localStorage);
      this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
      const options = {
    headers
  };
  return this.httpclient.get(`${this.coursesUrl}?programme=${id}&formateur=${formateur_id}`,options );

}
 updateCours(id:any,cours:any):Observable<any>{
   //console.log(this.userService.token)

   const headers = new HttpHeaders({
     'Content-Type': 'application/json',
      });
      console.log(localStorage);
       this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
       const options = {
     headers
   };
   return this.httpclient.put(`${this.coursesUrl}${id}/`,cours,options );
 
 }
 getCoursById(id:any):Observable<any>{
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
     });
     console.log(localStorage);
      this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
      const options = {
    headers
  };
  return this.httpclient.get(`${this.coursesUrl}${id}/`,options);

}
resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
  console.log(route.paramMap.get('coursID'));
  return this.getCoursById(route.paramMap.get('coursID'));
}
 deleteCours(id:any):Observable<any>{
   const headers = new HttpHeaders({
     'Content-Type': 'application/json',
      });
      console.log(localStorage);
       this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
       const options = {
     headers
   };
   return this.httpclient.delete(`${this.coursesUrl}${id}/`,options);

 }
}
