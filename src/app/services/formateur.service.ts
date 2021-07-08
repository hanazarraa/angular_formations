import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formateur } from '../models/formateur';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FormateurService {
  headers: Headers = new Headers();
  formateursUrl:string='http://localhost:8000/auth/formateurs/';
 constructor(private httpclient:HttpClient,private userService:UserService) { }

  getFormateur (id:any):Observable<any>{
  //console.log(this.userService.token)

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
     });
     console.log(localStorage);
      this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
      const options = {
    headers
  };
  return this.httpclient.get(`${this.formateursUrl}${id}/`,options );

} 
updateFormateur(id:any,formateur: Formateur){
 
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
     });
     
      this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
      const options = {
    headers
  };
  return this.httpclient.put<any>(`http://localhost:8000/auth/formateurs/${id}/`,JSON.stringify(formateur),options);
}
updateFormateur1(id:any,formateur: any,selectedFile:any ): Observable<HttpEvent<any>> {
  const uploadData: FormData = new FormData();
  if(selectedFile){
  uploadData.append('cv', selectedFile, selectedFile.name);
  }
  uploadData.append('user',formateur.user);
  uploadData.append('poste',formateur.poste);
  uploadData.append('first_name',formateur.specialite);
  uploadData.append('last_name',formateur.entreprise);
 
  const req = new HttpRequest('PUT', `http://localhost:8000/auth/update_formateur/${id}/`, uploadData, {
    reportProgress: true,
    responseType: 'json'
  });

  return this.httpclient.request(req);
  //return this.http.put<any>(`http://localhost:8000/auth/update_profile/${id}/`,JSON.stringify(user),this.httpOptions);
}
}
