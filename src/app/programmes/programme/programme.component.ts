import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Programme } from 'src/app/models/programme';
import { ProgrammeService } from 'src/app/services/programme.service';

@Component({
  selector: 'app-programme',
  templateUrl: './programme.component.html',
  styleUrls: ['./programme.component.scss']
})
export class ProgrammeComponent implements OnInit {
  courses:any;
  programmeID:any;
   constructor(private route:ActivatedRoute) { 
     this.programmeID= this.route.snapshot.paramMap.get('programmeID');
      console.log(this.programmeID);
   }
 
   ngOnInit(): void {
     this.courses=[
       {"id":1,"titre":"Introduction","date_exacte":"19/04/2021","heure_debut":"10:00","heure_fin":"12:00"},
       {"id":2,"titre":"Cours 1","date_exacte":"20/04/2021","heure_debut":"9:00","heure_fin":"15:00"},
       {"id":3,"titre":"Cours 2","date_exacte":"16/04/2021","heure_debut":"11:00","heure_fin":"17:00"}
     ]
     $(function() {
       $('.plus-minus-toggle').on('click', function() {
         $(this).toggleClass('collapsed');
       });
     });
     
   $(document).ready(function(){
         // Add minus icon for collapse element which is open by default
         $(".collapse.show").each(function(){
           $(this).prev(".card-header").find(".fa").addClass("fa-minus").removeClass("fa-plus");
         });
         
         // Toggle plus minus icon on show hide of collapse element
         $(".collapse").on('show.bs.collapse', function(){
           $(this).prev(".card-header").find(".fa").removeClass("fa-plus").addClass("fa-minus");
         }).on('hide.bs.collapse', function(){
           $(this).prev(".card-header").find(".fa").removeClass("fa-minus").addClass("fa-plus");
         });
     });
     
   }
}
