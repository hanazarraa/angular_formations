import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  private authUrl: string;
  headers: Headers = new Headers();

  private participantsUrl: string;
  constructor( private http: HttpClient
    ) {
      this.participantsUrl='http://localhost:8000/auth/participants/'
    }
 /* getJobs(){
    return this.webService.get('jobs');
  }*/
  
  getParticipantByID(id: any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.http.get<any>(`${this.participantsUrl}${id}/`,options);
  }

}
