import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tag } from 'src/app/models/tag';
import { DemandeFormateurService } from 'src/app/services/demande-formateur.service';
import { ProgrammeCompetenceNiveauService } from 'src/app/services/programme-competence-niveau.service';
import { ProgrammeService } from 'src/app/services/programme.service';

@Component({
  selector: 'app-view-formation-employe',
  templateUrl: './view-formation-employe.component.html',
  styleUrls: ['./view-formation-employe.component.scss']
})
export class ViewFormationEmployeComponent implements OnInit {
demandeID:any;
demande:any;
competences:any;
tags:any=[];
  constructor(private route:ActivatedRoute,private demandeFService:DemandeFormateurService,private progammeService:ProgrammeService,private programmeCompnivService:ProgrammeCompetenceNiveauService) {
    this.demandeID=this.route.snapshot.queryParamMap.get('demande');
    console.log(this.route.snapshot.queryParamMap.get('demande'));
   
   }

  ngOnInit(): void {
    this.demandeFService.getDemandeFormateurByID(this.demandeID).subscribe(data=>{
      this.demande=data;
      console.log(data);
       this.programmeCompnivService.getCompNiveauByProgrammeID(this.demande.programme).subscribe(data=>{
         this.competences=data;
         console.log(this.competences);
         for(var comp of this.competences){
           let tag=new Tag( );
           tag.id=comp.id;
           tag.name=comp.competence_name;
           tag.readonly=true;
           console.log(tag);
           this.tags.push(tag);

         }
         console.log(this.tags);
       });
    });
    
  }

}
