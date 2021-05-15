import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Responsable } from '../models/responsable';

@Injectable({
  providedIn: 'root'
})
export class ResponsableService {
  private responsablesUrl: string;
  constructor( private http: HttpClient
    ) {
    this.responsablesUrl="localhost:8000/auth";
   }
 /* getJobs(){
    return this.webService.get('jobs');
  }*/
  registerResponsable(responsable: Responsable){
    
    return this.http.post<any>(this.responsablesUrl+"/register_resp", responsable);
  }
  
}