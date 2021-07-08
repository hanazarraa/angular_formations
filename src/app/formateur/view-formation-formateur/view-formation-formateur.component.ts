import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgrammeCompetenceNiveauService } from 'src/app/services/programme-competence-niveau.service';
import { ProgrammeService } from 'src/app/services/programme.service';
import {Location } from '@angular/common';
@Component({
  selector: 'app-view-formation-formateur',
  templateUrl: './view-formation-formateur.component.html',
  styleUrls: ['./view-formation-formateur.component.scss']
})
export class ViewFormationFormateurComponent implements OnInit {
   programmeId:any;
   competences:any;
   programme:any;
  constructor(private route:ActivatedRoute,private location:Location,private programmeService:ProgrammeService,private progcompnivService:ProgrammeCompetenceNiveauService) {
    this.programmeId = this.route.snapshot.paramMap.get('programmeID');
    console.log(this.programmeId);
   }
goBack(){
  this.location.back();
}
  ngOnInit(): void {
    this.programmeService.getProgrammeByID(this.programmeId).subscribe(data=>{
      this.programme=data;

    });
    this.progcompnivService.getCompNiveauByProgrammeID(this.programmeId).subscribe(data=>{
      console.log(data);
      this.competences=data;
      
    });

  }

}
