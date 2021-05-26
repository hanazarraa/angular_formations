import { Formateur } from "./formateur";
import { Programme } from "./programme";

export class DemandeFormateur {
    constructor(){

    }
    public id?:string;
    public date_debut?:Date;
    public date_fin?:Date;
    public statut?:string;
    public programme?:Programme;
    public formateur?:Formateur;
}
