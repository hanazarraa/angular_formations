import { Travail } from "./travail.model";
import { User } from "./user";

export class Consigne  {
    public  travail?:Travail;
    public remis_par?:User;
    public piece_jointe:File;
    public p:string;
    constructor(){

    }
}
