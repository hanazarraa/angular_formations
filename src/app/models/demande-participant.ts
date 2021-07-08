import { DemandeFormateur } from "./demande-formateur";
import { Participant } from "./participant";

export class DemandeParticipant {
    constructor(statut,demande_formateur,participant,date_demande){}
    public id?:string;
    public statut?:string;
   public  demande_formateur?:DemandeFormateur;
    public participant?:Participant;
   public date_demande?:Date;
}
