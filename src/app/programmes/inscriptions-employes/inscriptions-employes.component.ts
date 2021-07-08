import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { Observable } from 'rxjs';
import { DemandeFormateurService } from 'src/app/services/demande-formateur.service';
import { DemandeParticipantService } from 'src/app/services/demande-participant.service';
import { FormateurService } from 'src/app/services/formateur.service';
import { ProgrammeService } from 'src/app/services/programme.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-inscriptions-employes',
  templateUrl: './inscriptions-employes.component.html',
  styleUrls: ['./inscriptions-employes.component.scss']
})
export class InscriptionsEmployesComponent implements OnInit {

  @ViewChild('closebutton') closebutton:any;
  @ViewChild('closebtn') closebtn:any;
  demandesFA:any;
  demandesFEnAttente:any;
  demandesFRefuse:any;
  formationId:any;
 inscriptions:any;
 demande_formateur_id:any;
 demandeF:any;
 programme:any;
 demandesEA$:Observable<any>;    
 demandesA$:Observable<any>;
  demandesR$:Observable<any>;

 statutParent="Conditionnel";
 constructor(private demande_participantService:DemandeParticipantService,private userService:UserService,private route: ActivatedRoute,private router:Router,private programmeService:ProgrammeService,private demande_formateurService:DemandeFormateurService) { 
  this.formationId= this.route.snapshot.paramMap.get('programmeID');
  this.demande_formateur_id=this.route.snapshot.paramMap.get('inscriptionID');
  console.log("inscription",this.demande_formateur_id);
  console.log(this.formationId);
}

  ngOnInit(): void {
    this.demande_formateurService.getDemandeFormateurByID(this.demande_formateur_id).subscribe(data=>{
      console.log(data);
      this.demandeF=data;
    });
    this.programmeService.getProgrammeByID(this.formationId).subscribe(data=>{
      console.log(data);
      this.programme=data;
    });
    this.getDemandesEAAsyncPipe();
    this.getDemandesRAsyncPipe();
    this.getDemandesAAsyncPipe();
    // this.dA=this.demandesFA;

  }
  /*private closeModal(): void {
    this.closebutton.nativeElement.click();
  }*/
  previous(){
    this.router.navigate(['formations/:formationId/inscriptions']);
  }
  Accepter(inscription:any){
    console.log(inscription);
    console.log(inscription.statut);
     
   inscription.statut="A";
   console.log(inscription.statut);
   console.log(inscription);
   this.demande_participantService.updateDemande(inscription.id,inscription).subscribe(data=>{
     this.getDemandesEAAsyncPipe();
     this.closebutton.nativeElement.click();

     console.log(data);
      this.getDemandesAAsyncPipe();
  
  
 
   //  window.location.reload();
  
   }); 
  }
  Refuser(inscription:any){
    console.log("hh");
    console.log(inscription);
    console.log(inscription.statut);
   
    inscription.statut="R";
   console.log(inscription.statut);
   console.log(inscription);
   this.demande_participantService.updateDemande(inscription.id,inscription).subscribe(data=>{
     console.log(data);
     this.getDemandesEAAsyncPipe();
     this.closebtn.nativeElement.click();
     this.getDemandesRAsyncPipe();
     
 
  //   window.location.reload()
  
  
    });
    //this.statutParent="Accepté";
  }
  public getDemandesEAAsyncPipe() {    
  
   
    this.demandesEA$ =this.demande_participantService.getDemandesByDemandeFormateurIDStatut(this.demande_formateur_id,"EA");  
    console.log(this.demandesEA$);

  }    

  public getDemandesAAsyncPipe() {    

 
    this.demandesA$ =this.demande_participantService.getDemandesByDemandeFormateurIDStatut(this.demande_formateur_id,"A"); 
    console.log(this.demandesA$);

  }    
  public getDemandesRAsyncPipe() {    

 
    this.demandesR$ =this.demande_participantService.getDemandesByDemandeFormateurIDStatut(this.demande_formateur_id,"R");    
    console.log(this.demandesR$);

  }   
  enattente(statut:any){
    if(statut=="En Attente"){
      return true;
    }else{
      return false;
    }
 
  }
  accept(){
    $("#acceptes-tab").removeClass("text-dark").addClass("text-light") 
    $("#enattente-tab").removeClass("text-light").addClass("text-dark") ;
    $("#refuses-tab").removeClass("text-light").addClass("text-dark");
  }
  en_attente(){
    $("#acceptes-tab").removeClass("text-light").addClass("text-dark");
    $("#enattente-tab").removeClass("text-dark").addClass("text-light");
    $("#refuses-tab").removeClass("text-light").addClass("text-dark");
  
  }
  refuses(){
    $("#acceptes-tab").removeClass("text-light").addClass("text-dark");
    $("#enattente-tab").removeClass("text-light").addClass("text-dark");
    $("#refuses-tab").removeClass("text-dark").addClass("text-light");
  
  }
  
 modal:any={};
 demande:any;
  showModal(i:any,demande:any){
    this.modal.index=i;
    this.demande=demande;
  console.log(i);
  console.log(demande);
  }
}
