import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
//import { Observable } from 'rxjs';
import { DemandeFormateur } from 'src/app/models/demande-formateur';
import { Programme } from 'src/app/models/programme';
import { DemandeFormateurService } from 'src/app/services/demande-formateur.service';
import { ProgrammeService } from 'src/app/services/programme.service';
import { UserService } from 'src/app/services/user.service';
import 'rxjs/add/operator/merge';
//import {Observable } from 'rxjs/Rx'
import { map, startWith, delayWhen, delay, concatMap, timeInterval } from 'rxjs/operators';
 import { Observable, timer, combineLatest, of, asyncScheduler } from 'rxjs';
@Component({
  selector: 'app-formation-formateur',
  templateUrl: './formation-formateur.component.html',
  styleUrls: ['./formation-formateur.component.scss'],
providers: [DatePipe]
  
})
export class FormationFormateurComponent implements OnInit {
  programmes : Programme[]=new Array<Programme>();
  formations:any;
  formationId:any;
  token:any;
  id:any;
  date=new Date();
  myDate:any;
  query: string;
  public searchFilter: any = '';
   demandes:any;
  demandesA:any;
  demandesEA:any;
  demandesR$:Observable<DemandeFormateur>;
  demandesEA$:Observable<any>;
  demandesA$:Observable<any>;
  combined$: Observable<any[]>;

   demandes$:Observable<any>;
   programmes$:Observable<any>;
    recommprogs:Observable<any>;
  demandesR:any;
  constructor(private datePipe: DatePipe,private userService:UserService,private demande_formateurService:DemandeFormateurService,  private router:Router,private programmeService:ProgrammeService,private route: ActivatedRoute) {
    this.formationId= this.route.snapshot.paramMap.get('programmeID');
    this.token=localStorage.getItem('auth-token');

    console.log(this.userService.updateData(this.token).user_id);
    this.id=this.userService.updateData(this.token).user_id
        console.log(this.id);
        this.myDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
        console.log(this.myDate);

  }
inscrit(demande,programme){
   if(demande.programme==programme){
     return true;
   }else{
     return false;
   }
}
  ngOnInit(): void {
  /*  this.programmeService.getProgrammes()
    .subscribe(
      (programmes:Programme[])=> 
       { console.log(programmes);
         this.programmes=programmes}
       );*/
       const mergeById = (array1, array2) =>
    array1.map(itm => ({
      ...array2.find((item) => (item.id === itm.id) && item),
      ...itm
    }));
      /* this.demandesA$=this.demande_formateurService.getDemandesByStatutFormateurDateNon( this.id,this.myDate) ;
         
      this.demandesEA$=  this.demande_formateurService.getDemandesByStatutFormateurDate("EA",this.id,this.myDate) ;
      this.demandesR$= this.demande_formateurService.getDemandesByStatutFormateurDate("R",this.id,this.myDate) ;
      console.log(this.demandesA$,this.demandesEA$,this.demandesR$);
      this.combined$ = combineLatest(this.demandesA$, this.demandesEA$,this.demandesR$).pipe(
        map(([firstResult, secondResult,thirdResult]) => {
          return [].concat(firstResult).concat(secondResult).concat(thirdResult
            )
        }) 
   );
   console.log(this.combined$);*/
   this.programmes$=this.programmeService.getlist(this.id,this.myDate);
  /* this.programmeService.getrecommenderList(this.id).subscribe(data=>{
     console.log(data);
     this.recommprogs=data;
   });*/
     /* const concat = (...arrays) => [].concat(...arrays.filter(Array.isArray));
         console.log(concat(this.demandesA$,this.demandesEA$));*/
      /*Observable.combineLatest(this.demandesA$, this.demandesEA$).subscribe(
        ([ValOne, ValTwo]) => {
          const combinedArr = [];
          const length = Math.max(this.demandesA$.length,this.demandesEA$.length);
          for (let i = 0;i < length;i++) {
            combinedArr.push([this.demandesA$[i], this.demandesEA$[i]]);
          }
        }
      );*/
      // this.demandes.mergeById(this.demandes,data);
      /*   Observable.forkJoin(this.demandesA$,this.demandesEA$).subscribe(data=>{
           console.log(data);
         });*/
         //  this.demandesA$.merge(this.demandesEA$);
         // console.log(this.demandes);
      
      
            //this.demandes.push(...this.demandesR$);
            //this.demandesR=data;
            console.log(this.demandes);
           
           
        
        
         
     
     /* this.getDemandesAAsyncPipe();
      this.getDemandesEAAsyncPipe();
      this.getDemandesRAsyncPipe();*/
    

    /*this.demande_formateurService.getDemandesByStatutFormateurDate("A",this.id,this.myDate).subscribe(data=>{
      console.log(data);
      this.demandesA=data;
    });*/
       
  }
  public getDemandesRAsyncPipe() {    
    this.demandesR$=this.demande_formateurService.getDemandesByStatutFormateurDate("R",this.id,this.myDate);
   
     console.log(this.demandesR$);

  }    
  public getDemandesEAAsyncPipe() {    
    this.demandesEA$=this.demande_formateurService.getDemandesByStatutFormateurDate("EA",this.id,this.myDate);
   
     console.log(this.demandesEA$);

  } 
  public getDemandesAAsyncPipe() {    
//this.demandesA$=this.demande_formateurService.getDemandesByStatutFormateurDate("R",this.id,this.myDate);
   this.demandesA$= this.demande_formateurService.getDemandesByStatutFormateurDateNon( this.id,this.myDate);

     console.log(this.demandesA$);

  } 
  onRightClick(){
    console.log("right click");
  }
}
