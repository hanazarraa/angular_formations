import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DemandeFormateur } from '../models/demande-formateur';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DemandeFormateurService {
  headers: Headers = new Headers();
  demandesUrl:string='http://localhost:8000/api/demandes_formateur/';
 constructor(private httpclient:HttpClient,private userService:UserService) {
   
  }

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
 getDemandesByProgrammeIDStatutFormateur(id:any,statut:any,formateur:any):Observable<any>{
  //console.log(this.userService.token)

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
     });
     console.log(localStorage);
      this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
      const options = {
    headers
  };
  return this.httpclient.get(`${this.demandesUrl}?programme=${id}&statut=${statut}&formateur=${formateur}`,options );

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
getDemandeFormateurByID(id:any):Observable<any>{
  //console.log(this.userService.token)

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
     });
     console.log(localStorage);
      this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
      const options = {
    headers
  };
  return this.httpclient.get(`${this.demandesUrl}${id}/`,options );

}
getDemandesByStatutFormateurDate(statut:any,formateur:any,date:any):Observable<any>{
  //console.log(this.userService.token)
    console.log(date);
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
     });
     console.log(localStorage);
      this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
      const options = {
    headers
  };
  return this.httpclient.get(`${this.demandesUrl}?statut=${statut}&formateur=${formateur}&date_fin__gte=${date}`,options );

}
getDemandesByStatutDate(statut:any, date:any):Observable<any>{
  //console.log(this.userService.token)
    console.log(date);
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
     });
     console.log(localStorage);
      this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
      const options = {
    headers
  };
  return this.httpclient.get(`${this.demandesUrl}?statut=${statut}&date_fin__gte=${date}`,options );

}
getDemandesParticipants(date,participant){
  console.log(date);
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
     });
     console.log(localStorage);
      this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
      const options = {
    headers
  };
  return this.httpclient.get(`${this.demandesUrl}getdemandes_participant/?date_debut__gte=${date}&participant=${participant}`,options );

}
getDemandesByProgrammeIDFormateurDate(programme,formateur,date):Observable<any>{
  console.log(date);
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
     });
     console.log(localStorage);
      this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
      const options = {
    headers
  };
  return this.httpclient.get(`${this.demandesUrl}?&formateur=${formateur}&date_fin__gte=${date}`,options );

}
getDemandesByStatutFormateurDateNon(formateur:any,date:any ):Observable<DemandeFormateur>{
  //console.log(this.userService.token)
    console.log(date);
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
     });
     console.log(localStorage);
      this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
      const options = {
    headers
  };
  return this.httpclient.get(`${this.demandesUrl}?&formateur=${formateur}&date_fin__lte=${date}`,options );

}
getDemandesById(id:any){
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
     });
     console.log(localStorage);
      this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
      const options = {
    headers
  };
  return this.httpclient.get(`${this.demandesUrl}${id}/`,options );

}
getMesDemandesParticipant(date:any,participant:any):Observable<any>{
  console.log(date);
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
     });
     console.log(localStorage);
      this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
      const options = {
    headers
  };
  return this.httpclient.get(`${this.demandesUrl}getmesdemades_participant/?participant=${participant}&date_fin__gte=${date}`,options );

}
/*getDemandesParticipant(date:any ):Observable<any>{
  console.log(date);
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
     });
     console.log(localStorage);
      this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
      const options = {
    headers
  };
  return this.httpclient.get(`${this.demandesUrl}getdemades_participant/?date_fin__gte=${date}`,options );

}*/

getDemandesByStatutFormateur(statut:any,formateur:any ):Observable<any>{
  //console.log(this.userService.token)
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
     });
     console.log(localStorage);
      this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
      const options = {
    headers
  };
  return this.httpclient.get(`${this.demandesUrl}?statut=${statut}&formateur=${formateur}`,options );

}
}
