import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 import { DemandeParticipant } from 'src/app/models/demande-participant';
import { Programme } from 'src/app/models/programme';
import { DemandeFormateurService } from 'src/app/services/demande-formateur.service';
import { DemandeParticipantService } from 'src/app/services/demande-participant.service';
import { ProgrammeService } from 'src/app/services/programme.service';
import { UserService } from 'src/app/services/user.service';
import { map, startWith, delayWhen, delay, concatMap, timeInterval,tap } from 'rxjs/operators';
import { Observable, timer, combineLatest, of, asyncScheduler } from 'rxjs';
import 'rxjs/add/operator/map';
import { DemandeFormateur } from 'src/app/models/demande-formateur';

@Component({
  selector: 'app-formations-employes',
  templateUrl: './formations-employes.component.html',
  styleUrls: ['./formations-employes.component.scss'],
  providers: [DatePipe]

})
export class FormationsEmployesComponent implements OnInit {
  @ViewChild('closebutton') closebutton:any;
  @ViewChild('closebtn') closebtn:any;

   programmes : Programme[]=new Array<Programme>();
   demandep:any ;
   demandes:any=[];
  formations:any;
  formationId:any;
  demandes$:Observable<DemandeFormateur>;
  date=new Date();
  myDate:any;
  token:any;
  demandesRecomm:any;
  id:any;
  constructor(private demande_participantService:DemandeParticipantService, private datePipe:DatePipe,private userService:UserService,private demande_formateurService:DemandeFormateurService, private router:Router,private programmeService:ProgrammeService,private route: ActivatedRoute) {
    //this.formationId= this.route.snapshot.paramMap.get('programmeID');
    this.token=localStorage.getItem('auth-token');

   console.log(this.userService.updateData(this.token).user_id);
    this.id=this.userService.updateData(this.token).user_id
        console.log(this.id);
         this.myDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
        console.log(this.myDate);
  }
  monprog:Boolean=true;

  ngOnInit(): void {
    this.demandes$=this.demande_formateurService.getDemandesParticipants(this.myDate,this.id);
    this.getDemandes();
    this.demande_formateurService.getRecommenderSession(this.id).subscribe(data=>{
      console.log(data);
      this.demandesRecomm=data;
    });
    
  /* this.demandes$.pipe(
    map((res) => {res.statut ,console.log(res)}), // extract data attribut
    map((res) => {
     console.log(res)
    })).subscribe((productList) => {
      console.log(productList);
    });*/
    /*this.programmeService.getProgrammes()
    .subscribe(
      (programmes:Programme[])=> 
       { console.log(programmes);
         this.programmes=programmes}
       );*/

      /*this.demande_formateurService.getDemandesByStatutDate("A",this.myDate).subscribe(demandesf=>{
        this.demandes$=demandesf;
        console.log(this.demandes$);
        demandesf.forEach(demandef=>{
          console.log(demandef.demandes_participants);
        });
      });*/
      /*  console.log(demande);
       this.monprog=true;
       console.log(demande.statut);
       if(demande.demandes_participants.length>0){
         demande.demandes_participants.forEach(demande_par=>{
           console.log(demande_par);
         });
       }*/
     // });
    
      
      /*this.demande_formateurService.getDemandesByStatutDate("A",this.myDate).subscribe(data=>{
         console.log(data);
        for (var demande of data){
          this.monprog=true;
          if(demande.demandes_participants.length>0){
            for (var demandep of demande.demandes_participants){
              if(demandep.statut=="A" && demandep.participant ==this.id){
                this.monprog=false;
                

               }else{
                 demande.demande_participant_id=demandep.id;
                 demande.indice_participant=demande.demandes_participants.indexOf(demandep);
                demande.statut_participant=demandep.statut;
                console.log(demande.statut_participant);
               }
            }
            
          }else{
            this.monprog=true;
            demande.statut_participant="Non Inscrit";
            console.log(demande.statut_participant);
          }
          console.log(this.monprog," ",demande);
          if(this.monprog){
             
            this.demandes.push(demande);
          }
          
        }
        console.log(this.demandes);
      });
      console.log(this.demandes$); */


  }
  getDemandes(){
    this.demande_formateurService.getDemandesParticipants(this.myDate,this.id).subscribe(data=>{
      this.demandes=data;
      for(var df of this.demandes){
         if(df.demandes_participants.length>0){
            for(var dp of df.demandes_participants){
              if(dp.participant == this.id){
                df.statut_participant=dp.statut;
                df.dp_id=dp.id;
              }
            }
         }else{
           df.statut_participant="Non Inscrit";
         }
         console.log(df);

       }
     });
  }
  get(i:any){
    console.log(i);
  }
  dp_id:any;
 demande:any;
  showModal(id:any,demande:any){
   this.dp_id=id;
    this.demande=demande;
  console.log(id);
  console.log(demande);

  }
  demande1:any;
  showModalInscrire(demande:any){
    console.log(demande);
    this.demande1=demande;
  }
  inscrire(demande){
    console.log(demande);
      this.demandep=new DemandeParticipant("EA",demande.id,this.id,this.myDate);
     this.demandep.statut="EA";
     this.demandep.demande_formateur=demande.id;
     this.demandep.participant=this.id;
     this.demandep.date_demande=this.myDate;
     console.log(this.demandep);
     
    this.demande_participantService.AjouterDemande(this.demandep).subscribe(data=>{
      console.log(data);
      this.getDemandes();
      this.closebtn.nativeElement.click();

      //demande.statut_participant="EA";
     
      
    });
   }
   desinscrire(demande,id){
     console.log(demande);
     console.log(id);
     this.demande_participantService.deleteDemande(id).subscribe(data=>{
       this.getDemandes();
       this.closebutton.nativeElement.click();

       //demande.statut_participant="Non Inscrit";
      });
   }
}
