import { Competence } from "./competence";

export class Formateur {
    constructor(){}
    id?:string;
    poste?:string;
    specialite?:string;
    entreprise?:string;
    user?:string;
    competences?:Competence[];
    cv?:File;
}
