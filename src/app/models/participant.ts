import { Scorequizz } from "./scorequizz";

export class Participant {
    constructor(){}
    id?:string;
    poste?:string;
    specialite?:string;
    entreprise?:string;
    user?:string;
    scores_quizz?:Scorequizz[];
}
