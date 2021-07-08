import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';
import { DemandeFormateurService } from 'src/app/services/demande-formateur.service';

@Component({
  selector: 'app-courses-program-employe',
  templateUrl: './courses-program-employe.component.html',
  styleUrls: ['./courses-program-employe.component.scss']
})
export class CoursesProgramEmployeComponent implements OnInit {
  courses:any;
  programmeID:any;
  demandeID:any;
  courses$:Observable<any>;
  value_route:any;
path:any;
  demandef:any;
   constructor(private route:ActivatedRoute,private cd: ChangeDetectorRef,private router:Router,private demandeFService:DemandeFormateurService,private courseService:CourseService) { 
     this.programmeID= this.route.snapshot.paramMap.get('programmeID');
      console.log(this.programmeID);
      this.demandeID=this.route.snapshot.queryParamMap.get('demande');
      console.log(this.route.snapshot.queryParamMap.get('demande'));
      this.value_route=this.route.url['_value'];
    this.path=this.value_route[0].path;
    console.log(this.value_route);
   }
 
   ngOnInit(): void {
 
     this.demandeFService.getDemandeFormateurByID(this.demandeID).subscribe(data=>{
       console.log(data);
       this.demandef=data;
       this.courses$=this.courseService.getCoursByProgrammeIDFormateur(this.programmeID,data.formateur);
     });
    /* this.courses=[
       {"id":1,"titre":"Introduction","date_exacte":"19/04/2021","heure_debut":"10:00","heure_fin":"12:00"},
       {"id":2,"titre":"Cours 1","date_exacte":"20/04/2021","heure_debut":"9:00","heure_fin":"15:00"},
       {"id":3,"titre":"Cours 2","date_exacte":"16/04/2021","heure_debut":"11:00","heure_fin":"17:00"}
     ]*/
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
   drop(event: CdkDragDrop<string[]>) {
     moveItemInArray(this.courses, event.previousIndex, event.currentIndex);
   }
   onAddItem() {
     this.courses.push({ titre: "" });
     this.cd.detectChanges();
     this.router.navigate(["formateur/programmes/"+this.programmeID+"/cours/ajouter"]);
 
   }
 }