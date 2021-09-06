import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DemandeFormateurService } from 'src/app/services/demande-formateur.service';

@Component({
  selector: 'app-demandes-formateur',
  templateUrl: './demandes-formateur.component.html',
  styleUrls: ['./demandes-formateur.component.scss'],
  providers:[DatePipe]
})
export class DemandesFormateurComponent implements OnInit {
query:any;
demandesF:any;

date=new Date();
myDate:any;
@ViewChild('closebutton') closebutton:any;
@ViewChild('closebtn') closebtn:any;

  constructor(private demandeFService:DemandeFormateurService,private datePipe:DatePipe) {
    this.myDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    console.log(this.myDate);

   }

  ngOnInit(): void {
    this.demandeFService.getDemandesByStatut("EA").subscribe(data=>{
      this.demandesF=data;
        console.log(data)
    });

  }
  //modal:any={};
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
 this.demandeFService.updateDemande(inscription.id,inscription).subscribe(data=>{
   console.log(data);
  // this.getDemandesEAAsyncPipe();

   this.demandeFService.getDemandesByStatut("EA").subscribe(data=>{
     this.demandesF=data;
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
 this.demandeFService.updateDemande(inscription.id,inscription).subscribe(data=>{
   console.log(data);
   this.demandeFService.getDemandesByStatut("EA").subscribe(data=>{
    this.demandesF=data;
    console.log(data);
    this.closebtn.nativeElement.click();
  });
 //  this.closebtn.nativeElement.click();
    
   //window.location.reload()


  });

  //this.statutParent="Accepté";consu
}
}
