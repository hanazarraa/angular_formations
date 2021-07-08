import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
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
  getConsignesByTravail(travail:any):Observable<any>{
    //console.log(this.userService.token)
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       console.log(localStorage);
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.get(`http://localhost:8000/api/consignes/?travail=${travail}`,options );
  
  }
  upload(file: File,travail:any,remis_par:any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('piece_jointe', file);
     formData.append('travail',travail);
       formData.append('remis_par',remis_par);
    const req = new HttpRequest('POST', `http://localhost:8000/api/consigneUpload/`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpclient.request(req);
  }
  supprimerConsigne(id:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       console.log(localStorage);
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.delete(`http://localhost:8000/api/consignes/${id}/`,options);
  
  }
}
