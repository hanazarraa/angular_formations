import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RemiseService {

  headers: Headers = new Headers();

  constructor(private httpclient:HttpClient,private userService:UserService) { }
  AjouterRemise(remise:any):Observable<any>{
    //console.log(this.userService.token)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.post('http://localhost:8000/api/remises/',remise,options);
  
  }
  /*public upload(formData) {
    return this.http.post<any>(`${this.DJANGO_SERVER}/upload/`, formData);
  }*/
  getRemisesByConsigneRemispar(consigne:any,remise_par:any):Observable<any>{
    //console.log(this.userService.token)
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       console.log(localStorage);
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.get(`http://localhost:8000/api/remises/?consigne=${consigne}&remise_par=${remise_par}`,options );
  
  }
  upload(file: File,consigne:any,remis_par:any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('piece_jointe', file);
     formData.append('consigne',consigne);
       formData.append('remise_par',remis_par);
    const req = new HttpRequest('POST', `http://localhost:8000/api/remiseUpload/`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpclient.request(req);
  }
  supprimerRemise(id:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       console.log(localStorage);
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.delete(`http://localhost:8000/api/remises/${id}/`,options);
  
  }
}
