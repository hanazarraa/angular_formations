import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProgrammeCompetenceNiveauService {
  headers: Headers = new Headers();
  compniveauUrl:string='http://localhost:8000/api/programmes_competences_niveaux/';
  constructor(private httpclient:HttpClient,private userService:UserService) { }

  getProgrammes_Competences_Niveaux():Observable<any>{
    //console.log(this.userService.token)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       console.log(localStorage);
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.get('http://localhost:8000/api/programmes_competences_niveaux/',options);
  
  }
  AjouterProgramme_Competence_Niveau(programme_comp_niveau:any):Observable<any>{
    //console.log(this.userService.token)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.post('http://localhost:8000/api/programmes_competences_niveaux/',programme_comp_niveau,options);
  
  }
  getCompNiveauByProgrammeID(id:any):Observable<any>{
    //console.log(this.userService.token)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       console.log(localStorage);
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.get(`${this.compniveauUrl}?programme=${id}`,options );
  
  }
  updateCompNiveau(id:any,compniv:any):Observable<any>{
    //console.log(this.userService.token)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       console.log(localStorage);
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.put(`${this.compniveauUrl}${id}/`,compniv,options );
  
  }
  deleteCompetence(id:any):Observable<any>{
    //console.log(this.userService.token)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       console.log(localStorage);
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.delete(`${this.compniveauUrl}${id}/`,options );
  
  }
}