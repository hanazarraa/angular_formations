import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DemandeParticipantService {
  headers: Headers = new Headers();
  demandesUrl:string='http://localhost:8000/api/demandes_participant/';
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
   return this.httpclient.get('http://localhost:8000/api/demandes_participant/',options);
 
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
   return this.httpclient.post('http://localhost:8000/api/demandes_participant/',demande,options);
 
 }
 getDemandesByDemandeFormateurIDStatut(id:any,statut:any):Observable<any>{
   //console.log(this.userService.token)

   const headers = new HttpHeaders({
     'Content-Type': 'application/json',
      });
      console.log(localStorage);
       this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
       const options = {
     headers
   };
   return this.httpclient.get(`${this.demandesUrl}?demande_formateur=${id}&statut=${statut}`,options );
 
 }
 getDemandesByDemandeFormateurParticipantNonAcc(demandef:any,participant:any):Observable<any>{
  //console.log(this.userService.token)

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
     });
       this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
      const options = {
    headers
  };
  return this.httpclient.get(`${this.demandesUrl}getdemades_participant_non_A/?demande_formateur=${demandef}&participant=${participant}`,options );

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
deleteDemande(id:any ):Observable<any>{
  //console.log(this.userService.token)

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
     });
     console.log(localStorage);
      this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
      const options = {
    headers
  };
  return this.httpclient.delete(`${this.demandesUrl}${id}/`, options );

}
}