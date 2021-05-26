import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DemandeFormateurService {
  headers: Headers = new Headers();
  demandesUrl:string='http://localhost:8000/api/demandes_formateur/';
 constructor(private httpclient:HttpClient,private userService:UserService) { }

 getDemandes():Observable<any>{
   //console.log(this.userService.token)

   const headers = new HttpHeaders({
     'Content-Type': 'application/json',
      });
      console.log(localStorage);
       this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
       const options = {
     headers
   };
   return this.httpclient.get('http://localhost:8000/api/demandes_formateur/',options);
 
 }
 AjouterDemande(demande:any):Observable<any>{
   //console.log(this.userService.token)

   const headers = new HttpHeaders({
     'Content-Type': 'application/json',
      });
      
       this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
       const options = {
     headers
   };
   return this.httpclient.post('http://localhost:8000/api/demandes_formateur/',demande,options);
 
 }
 getDemandesByProgrammeIDStatut(id:any,statut:any):Observable<any>{
   //console.log(this.userService.token)

   const headers = new HttpHeaders({
     'Content-Type': 'application/json',
      });
      console.log(localStorage);
       this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
       const options = {
     headers
   };
   return this.httpclient.get(`${this.demandesUrl}?programme=${id}&statut=${statut}`,options );
 
 }
 updateDemande(id:any,demande:any):Observable<any>{
  //console.log(this.userService.token)

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
     });
     console.log(localStorage);
      this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
      const options = {
    headers
  };
  return this.httpclient.put(`${this.demandesUrl}${id}/`,demande,options );

}
}
