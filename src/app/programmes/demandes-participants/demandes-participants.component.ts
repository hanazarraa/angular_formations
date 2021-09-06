import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { data } from 'jquery';
import { DemandeFormateurService } from 'src/app/services/demande-formateur.service';
import { DemandeParticipantService } from 'src/app/services/demande-participant.service';

@Component({
  selector: 'app-demandes-participants',
  templateUrl: './demandes-participants.component.html',
  styleUrls: ['./demandes-participants.component.scss'],
  providers:[DatePipe]
})
export class DemandesParticipantsComponent implements OnInit {
demandesP:any;
query:any;
date=new Date();
myDate:any;
@ViewChild('closebutton') closebutton:any;
@ViewChild('closebtn') closebtn:any;

  constructor(private demandeParticipantService:DemandeParticipantService,private datePipe:DatePipe) { 
    this.myDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    console.log(this.myDate);

  
  }

  ngOnInit(): void {
    this.demandeParticipantService.getDemandesByStatut("EA").subscribe(data=>{
      console.log(data);
      this.demandesP=data;
    });
  }
  demande:any;
  showAcceptModel(i:any,demande:any){
    this.demande=demande;
 console.log(i);
 console.log(demande);
 }
 
Accepter(inscription:any){
 console.log(inscription);
 console.log(inscription.statut);
  
inscription.statut="A";
console.log(inscription.statut);
console.log(inscription);
this.demandeParticipantService.updateDemande(inscription.id,inscription).subscribe(data=>{
  console.log(data);
 // this.getDemandesEAAsyncPipe();

  this.demandeParticipantService.getDemandesByStatut("EA").subscribe(data=>{
    this.demandesP=data;
    console.log(data);
    this.closebutton.nativeElement.click();
  });
  // this.getDemandesAAsyncPipe();

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
 //this.statutParent="Accepté";
}
Refuser(inscription:any){
 console.log(inscription);
 console.log(inscription.statut);

 inscription.statut="R";
console.log(inscription.statut);
console.log(inscription);
this.demandeParticipantService.updateDemande(inscription.id,inscription).subscribe(data=>{
  console.log(data);
  this.demandeParticipantService.getDemandesByStatut("EA").subscribe(data=>{
   this.demandesP=data;
   console.log(data);
   this.closebtn.nativeElement.click();
 });


 });
}
}
