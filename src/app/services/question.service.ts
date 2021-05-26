import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  headers: Headers = new Headers();
  questionsUrl:string='http://localhost:8000/api/questions/';
  constructor(private httpclient:HttpClient,private userService:UserService) { }

  getQuestions():Observable<any>{
    //console.log(this.userService.token)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       console.log(localStorage);
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.get('http://localhost:8000/api/questions/',options);
  
  }
  AjouterQuestion(question:any):Observable<any>{
    //console.log(this.userService.token)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.post('http://localhost:8000/api/questions/',question,options);
  
  }
  getQuestionByProgrammeID(id:any):Observable<any>{
    //console.log(this.userService.token)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       console.log(localStorage);
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.get(`${this.questionsUrl}?programme=${id}`,options );
  
  }
 updateQuestion(id:any,question:any):Observable<any>{
    //console.log(this.userService.token)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       console.log(localStorage);
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.put(`${this.questionsUrl}${id}/`,question,options );
  
  }
  deleteQuestion(id:any):Observable<any>{
    //console.log(this.userService.token)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       console.log(localStorage);
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.delete(`${this.questionsUrl}${id}/`,options );
  
  }
}