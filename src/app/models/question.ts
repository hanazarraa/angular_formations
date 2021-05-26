import { Programme } from "./programme";
import { Reponse } from "./reponse";
import { User } from "./user";

export class Question {
    constructor(){}    
    id ?:string;
    titre?:string;  
    
   reponses?:Reponse[];
    cree_par?:User;
    programme?:Programme; 
 }
