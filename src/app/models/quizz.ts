import { Programme } from "./programme";
import { Question } from "./question";
import { User } from "./user";

export class Quizz {
    constructor(){}    
    titre?:string;  
    
    ponderation?:string; 
    cree_par?:User;
    programme?:Programme; 
    questions?:Question[];
    //consignes?:Consigne[];
}
