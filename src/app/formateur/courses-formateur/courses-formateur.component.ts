import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgrammeService } from 'src/app/services/programme.service';

@Component({
  selector: 'app-courses-formateur',
  templateUrl: './courses-formateur.component.html',
  styleUrls: ['./courses-formateur.component.scss']
})
export class CoursesFormateurComponent implements OnInit {
  courses:any;
  programmeID:any;
  programme:any;
   constructor(private router:Router,private route:ActivatedRoute,private programmeService:ProgrammeService) { 
     this.programmeID= this.route.snapshot.paramMap.get('programmeID');
   }
 
   ngOnInit(): void {
     this.programmeService.getProgrammeByID(this.programmeID).subscribe(data=>{
       this.programme=data;
     });
     this.courses=[
       {"id":1,"titre":"Introduction","date_exacte":"19/04/2021","heure_debut":"10:00","heure_fin":"12:00"},
       {"id":2,"titre":"Cours 1","date_exacte":"20/04/2021","heure_debut":"9:00","heure_fin":"15:00"},
       {"id":3,"titre":"Cours 2","date_exacte":"16/04/2021","heure_debut":"11:00","heure_fin":"17:00"}
     ]
   }
   Horaire(){
     this.router.navigate(["/formateur/programmes/"+this.programmeID+"/cours/horaire"]);
   }
   Creer(){
    this.router.navigate(["/formateur/programmes/"+this.programmeID+"/cours/ajouter"]);

   }
}
