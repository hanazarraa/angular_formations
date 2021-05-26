import { Consigne } from "./consigne.model";
import { Programme } from "./programme";
import { User } from "./user";

export class Travail  {
    constructor(){}  
    id?:string;  
     titre?:string;  
     date_debut?:string;  
     date_limite?:string;  
     test?:string;  

     ponderation?:string; 
     partage_par?:User;
     programme?:Programme; 
     consignes?:Consigne[];
  //  resultat?:string;  


}
