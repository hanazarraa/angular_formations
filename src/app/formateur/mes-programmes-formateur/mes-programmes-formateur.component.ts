import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Programme } from 'src/app/models/programme';
import { DemandeFormateurService } from 'src/app/services/demande-formateur.service';
import { ProgrammeService } from 'src/app/services/programme.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mes-programmes-formateur',
  templateUrl: './mes-programmes-formateur.component.html',
  styleUrls: ['./mes-programmes-formateur.component.scss']
})
export class MesProgrammesFormateurComponent implements OnInit {
  programmes : Programme[]=new Array<Programme>();
  formations:any;
  formationId:any;
  token:any;
  id:any;
  date=new Date();
  myDate:any;
  demandesA:any;
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
    /*this.programmeService.getProgrammes()
    .subscribe(
      (programmes:Programme[])=> 
       { console.log(programmes);
         this.programmes=programmes}
       );

    this.demande_formateurService.getDemandesByStatutFormateurDate("A",this.id,this.myDate).subscribe(data=>{
      console.log(data);
      this.demandesA=data;
    });*/
       
  }
   
  onRightClick(){
    console.log("right click");
  }
}
