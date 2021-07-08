import { HttpClient, HttpHeaders } from '@angular/common/http';
import { compileComponentFromMetadata } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { combineAll } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {
  headers: Headers = new Headers();

  constructor(private httpclient:HttpClient,private userService:UserService) { }

  getCompetences():Observable<any>{
    //console.log(this.userService.token)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       console.log(localStorage);
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.get('http://localhost:8000/api/compétences/',options);
  
  }
  AjouterCompetence(comp:any):Observable<any>{
    //console.log(this.userService.token)
 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.post('http://localhost:8000/api/compétences/',comp,options);
  

  }
  updateCompetence(id:any,comp:any):Observable<any>{
    //console.log(this.userService.token)
 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       console.log(localStorage);
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.put(`http://localhost:8000/api/compétences/${id}/`,comp,options );
  
  }
  getCompetenceByTitre(comp:any):Observable<any>{
    //console.log(this.userService.token)
    console.log(comp);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       console.log(localStorage);
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    if(comp.id){
      return this.httpclient.get(`http://localhost:8000/api/compétences/getcompetencesByTitre/?titre=${comp.titre}`,options);
    }else{
      return this.httpclient.get(`http://localhost:8000/api/compétences/getcompetencesByTitre/?titre=${comp}`,options);
    }
  
  
  }
  getCompetenceByFormateur(formateur:any):Observable<any>{
    //console.log(this.userService.token)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       console.log(localStorage);
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.get(`http://localhost:8000/api/compétences/?formateur=${formateur}`,options);
  
  }
  getCompetenceByProgramme(programme:any):Observable<any>{
    //console.log(this.userService.token)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       console.log(localStorage);
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.get(`http://localhost:8000/api/compétences/?programme=${programme}`,options);
  
  }
}