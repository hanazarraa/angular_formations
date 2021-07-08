import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ScoreQuizzService {
  headers: Headers = new Headers();
  scoresquizUrl:string='http://localhost:8000/api/scoresquizz/';
  constructor(private httpclient:HttpClient,private userService:UserService) { }

  getscoresquiz():Observable<any>{
    //console.log(this.userService.token)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       console.log(localStorage);
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.get(`${this.scoresquizUrl}`,options);
  
  }
  AjouterScoreQuiz(score:any):Observable<any>{
    //console.log(this.userService.token)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.post(`${this.scoresquizUrl}`,score,options);
  
  }
  getScoreQuizByDemandeFormateur(df:any):Observable<any>{
    //console.log(this.userService.token)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       console.log(localStorage);
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.get(`${this.scoresquizUrl}?demande_formateur=${df}`,options );
  
  }
  getScoresquizByParticipant(p:any):Observable<any>{
    //console.log(this.userService.token)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       console.log(localStorage);
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.get(`${this.scoresquizUrl}?participant=${p}`,options );
  
  }
  getScoreQuizzByDemandeFormateurAndParticipant(df:any,p:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       console.log(localStorage);
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.get(`${this.scoresquizUrl}?demande_formateur=${df}&participant=${p}`,options );
  
  }
 updateScoreQuiz(id:any,score:any):Observable<any>{
    //console.log(this.userService.token)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       console.log(localStorage);
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.put(`${this.scoresquizUrl}${id}/`,score,options );
  
  }
  deleteScoreQuiz(id:any):Observable<any>{
    //console.log(this.userService.token)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       console.log(localStorage);
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.delete(`${this.scoresquizUrl}${id}/`,options );
  
  }
}