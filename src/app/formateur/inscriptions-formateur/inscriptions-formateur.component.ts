import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { DemandeFormateur } from 'src/app/models/demande-formateur';
import { DemandeFormateurService } from 'src/app/services/demande-formateur.service';
import { FormateurService } from 'src/app/services/formateur.service';
import { ProgrammeService } from 'src/app/services/programme.service';
import { UserService } from 'src/app/services/user.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-inscriptions-formateur',
  templateUrl: './inscriptions-formateur.component.html',
  styleUrls: ['./inscriptions-formateur.component.scss'],
  providers: [DatePipe]

})
export class InscriptionsFormateurComponent implements OnInit {
  title = 'angular-bootstrap-datepicker-tutorial';
cv:any;
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  @ViewChild('closebutton') closebutton:any;
  @ViewChild('closebtn') closebtn:any;

  formationId:any;
  demandeModel:any=new DemandeFormateur();
  inscriptions:any;
  date_debut:any;
  date_fin:any;
  token:any;
  id:any;
  demandesA:any;
  demandesEA:any;
  demandesR:any;
  formateur:any;
  date=new Date();
  myDate:any;
  demandesenatt$:Observable<any>;
  programme:any;
  successMessage:string;
  value_route:any;
  path:any;
  demandes:any;
  submitted:boolean;
  demandesA$:Observable<any>;
  demandesEA$:Observable<any>;
  demandesR$:Observable<any>;

  success:Boolean;
  errorMessage:string;
  statut:string;
 constructor(private userService:UserService,private location:Location,private datePipe:DatePipe,private programmeService:ProgrammeService,private formateurService:FormateurService,private route: ActivatedRoute,private router:Router,private calendar: NgbCalendar, public formatter: NgbDateParserFormatter,private demande_formateurService:DemandeFormateurService) { 
   this.formationId= this.route.snapshot.paramMap.get('programmeID');
   console.log(this.route);
  this.value_route=this.route.url['_value'];
  this.myDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
  console.log(this.myDate);

  console.log(this.value_route[0].path);
  this.path=this.value_route[0].path;
   this.fromDate = calendar.getToday();
   this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);

 }

 ngOnInit(): void {
   this.programmeService.getProgrammeByID(this.formationId).subscribe(data=>{
     this.programme=data;
   })
  this.token=localStorage.getItem('auth-token');

  console.log(this.userService.updateData(this.token).user_id);
 this.id=this.userService.updateData(this.token).user_id
 console.log(this.id);
 this.formateurService.getFormateur(this.id).subscribe(data=>{
   console.log(data);
   this.formateur=data;
 });
this.demandesA$=this.demande_formateurService.getDemandesByProgrammeIDStatutFormateur(this.formationId,"A",this.id);
this.demandesEA$=this.demande_formateurService.getDemandesByProgrammeIDStatutFormateur(this.formationId,"EA",this.id); 
this.demandesR$=this.demande_formateurService.getDemandesByProgrammeIDStatutFormateur(this.formationId,"R",this.id);
   
this.demande_formateurService.getDemandesByProgrammeIDFormateurDate(this.formationId,this.id,this.myDate).subscribe(data=>{
  this.demandes=data;
  console.log(data);
  //console.log(this.demandes[this.demandes.length-1].statut);
  console.log(this.demandes.length);
  if(this.demandes.length>0){
  if(this.demandes[this.demandes.length-1].statut=="EA"){
    this.statut="En Attente";
  }else if(this.demandes[this.demandes.length-1].statut=="R"){
    this.statut="Réfusé";
  }
  }else{
    this.statut="Non inscrit";
  }
});
this.demandesenatt$=this.demande_formateurService.getDemandesByStatutFormateurDate("EA",this.id,this.myDate);

        this.inscriptions=[
         {'id':1, 'Date_debut':'20/4/2021','Date_fin':'20/5/2020'},
         {'id':2,'Date_debut':'20/4/2020','Date_fin':'20/5/2021'},
         {'id':3, 'Date_debut':'22/2/2021','Date_fin':'20/3/2021'},
         {'id':4, 'Date_debut':'24/1/2021','Date_fin':'20/9/2021'},
       ]
console.log(this.inscriptions);
 }
 demande(){
   console.log(this.demandeModel);
   if(this.demandeModel.date_debut < this.myDate  ){
     this.submitted=true;
     this.success=false;
     this.errorMessage="Date début déjà passée";
   }else if(this.demandeModel.date_fin < this.myDate){
    this.submitted=true;
    this.success=false;
    this.errorMessage="Date de fin déjà passée";
   }else if(this.demandeModel.date_fin < this.demandeModel.date_debut){
    this.submitted=true;
    this.success=false;
    this.errorMessage="Date début supérieur a celui de la Date fin";
   }else{
    this.demandeModel.formateur=this.formateur.user;
    this.demandeModel.statut="EA";
    this.demandeModel.programme=this.formationId;
    this.demande_formateurService.AjouterDemande(this.demandeModel).subscribe(data=>{
      console.log(data); 
      this.submitted=true;
      this.success=true;
      this.successMessage="Demande crée avec succés";
      this.demandesEA$=this.demande_formateurService.getDemandesByProgrammeIDStatutFormateur(this.formationId,"EA",this.id);
      this.closebutton.nativeElement.click();

       
    }); 
   }
  
  
  //this.router.navigate(['/formateur/programmes/'+this.formationId+'/demande_inscription']);

}
currentdemande:any;
 goBack(){
  this.location.back();
 }
showCancelModel(i,demande){
    this.currentdemande=demande;
    console.log(this.currentdemande);
}
Annuler(demande:any){
  demande.statut="An";
  console.log(demande);
  this.demande_formateurService.updateDemande(demande.id,demande).subscribe(data=>{
    console.log(data);
    this.demande_formateurService.getDemandesByProgrammeIDStatutFormateur(this.formationId,"EA",this.id).subscribe(data=>{
      this.demandesEA=data;
      this.closebtn.nativeElement.click();

    });
  });

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
ConsulterProg(){
  this.router.navigate(["/formateur/mesprogrammes/"+this.formationId]);
}
}