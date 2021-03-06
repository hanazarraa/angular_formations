import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { Observable } from 'rxjs';
import { DemandeFormateurService } from 'src/app/services/demande-formateur.service';
import { FormateurService } from 'src/app/services/formateur.service';
import { ProgrammeService } from 'src/app/services/programme.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.scss']
})
export class InscriptionsComponent implements OnInit {
  @ViewChild('closebutton') closebutton:any;
  @ViewChild('closebtn') closebtn:any;
  formationId:any;
  d={id:"",date_debut:"",date_fin:"",statut:"",formateur:""};
  inscriptions:any;
  programme:any;
  demandesFA:any;
  demandesFEnAttente:any;
  demandesFRefuse:any;
  demandesA:any=[];
  formateurs:any=[];
  demandesEnAttente:any=[];
  demandesEA$:Observable<any>;    
  demandesA$:Observable<any>;
  demandesRefuse:any=[];
  demandesR$:Observable<any>;
 constructor(private formateurService:FormateurService,private userService:UserService,private route: ActivatedRoute,private router:Router,private programmeService:ProgrammeService,private demande_formateurService:DemandeFormateurService) { 
   this.formationId= this.route.snapshot.paramMap.get('programmeID');
   console.log(this.formationId);
 }

 ngOnInit(): void {
  this.programmeService.getProgrammeByID(this.formationId)
  .subscribe(data => {
    this.programme = data;
    
     console.log(this.programme);
  
    
   // console.log(this.customer);
  }, error => console.log(error));
  
      
     
 
  /* this.demande_formateurService.getDemandesByProgrammeIDStatut(this.formationId,"EA")
   .subscribe(data=>{
     this.demandesFEnAttente=data;
       console.log(this.demandesFEnAttente); 
    });*/
    this.getDemandesEAAsyncPipe();
   this.getDemandesAAsyncPipe();

    this.getDemandesRAsyncPipe();
      
 }
  
 public getDemandesEAAsyncPipe() {    
  
   
      this.demandesEA$ =this.demande_formateurService.getDemandesByProgrammeIDStatut(this.formationId,"EA");   
      console.log(this.demandesEA$);
  
    }    

    public getDemandesAAsyncPipe() {    
  
   
      this.demandesA$ =this.demande_formateurService.getDemandesByProgrammeIDStatut(this.formationId,"A");   
      console.log(this.demandesA$);
  
    }    
    public getDemandesRAsyncPipe() {    
  
   
      this.demandesR$ =this.demande_formateurService.getDemandesByProgrammeIDStatut(this.formationId,"R");   
      console.log(this.demandesR$);
  
    }    
 accept(){
  $("#acceptes-tab").removeClass("text-dark").addClass("text-light") 
  $("#enattente-tab").removeClass("text-light").addClass("text-dark") ;
  $("#refuses-tab").removeClass("text-light").addClass("text-dark");
}
enattente(){
  $("#acceptes-tab").removeClass("text-light").addClass("text-dark");
  $("#enattente-tab").removeClass("text-dark").addClass("text-light");
  $("#refuses-tab").removeClass("text-light").addClass("text-dark");

}
refuses(){
  $("#acceptes-tab").removeClass("text-light").addClass("text-dark");
  $("#enattente-tab").removeClass("text-light").addClass("text-dark");
  $("#refuses-tab").removeClass("text-dark").addClass("text-light");

}
ConsulterProg(demande:any){
  this.router.navigate(["/responsable/programmes/"+this.formationId], { queryParams: { demande: demande.id ,formateur:demande.formateur}});
}
ConsulterInscriptions_participants(){
  this.router.navigate(["/responsable/programmes/"+this.formationId+"/inscriptions"])
}
Accepter(inscription:any){
  console.log(inscription);
  console.log(inscription.statut);
   
 inscription.statut="A";
 console.log(inscription.statut);
 console.log(inscription);
 this.demande_formateurService.updateDemande(inscription.id,inscription).subscribe(data=>{
   console.log(data);
   this.getDemandesEAAsyncPipe();
   this.closebutton.nativeElement.click();
    this.getDemandesAAsyncPipe();

   /*this.demande_formateurService.getDemandesByProgrammeIDStatut(this.formationId,"EA").subscribe(data=>{
     console.log(data);
      this.demandesFEnAttente=data;
    this.demande_formateurService.getDemandesByProgrammeIDStatut(this.formationId,"A").subscribe(data=>{
      this.demandesFA=data;
      console.log(data);
    });

   });*/
  // window.location.reload();

 });
  //this.statutParent="Accept??";
}
Refuser(inscription:any){
  console.log(inscription);
  console.log(inscription.statut);
 
  inscription.statut="R";
 console.log(inscription.statut);
 console.log(inscription);
 this.demande_formateurService.updateDemande(inscription.id,inscription).subscribe(data=>{
   console.log(data);
   this.getDemandesEAAsyncPipe();

   this.closebtn.nativeElement.click();
   this.getDemandesRAsyncPipe();
   //window.location.reload()


  });
  //this.statutParent="Accept??";consu
}
modal:any={};
demande:any;

showAcceptModel(i:any,demande:any){
  this.modal.index=i;
  this.demande=demande;
console.log(i);
console.log(demande);
}
}
