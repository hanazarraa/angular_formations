import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Responsable } from '../models/responsable';

@Injectable({
  providedIn: 'root'
})
export class ResponsableService {
  private authUrl: string;
  headers: Headers = new Headers();

  private responsablesUrl: string;

  constructor( private http: HttpClient
    ) {
      this.responsablesUrl='http://localhost:8000/auth/responsables/'
    this.authUrl="http://localhost:8000/auth";
   }
 /* getJobs(){
    return this.webService.get('jobs');
  }*/
  registerResponsable(responsable: Responsable){
    
    return this.http.post<any>(this.authUrl+"/register_resp", responsable);
  }
  getResponsableByID(id: any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.http.get<any>(`${this.responsablesUrl}${id}/`,options);
  }
  updateResp(id:any,resp: Responsable){
 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.http.put<any>(`http://localhost:8000/auth/responsables/${id}/`,JSON.stringify(resp),options);
  }
}