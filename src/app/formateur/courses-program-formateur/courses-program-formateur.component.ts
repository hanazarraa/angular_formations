import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { ProgrammeService } from 'src/app/services/programme.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-courses-program-formateur',
  templateUrl: './courses-program-formateur.component.html',
  styleUrls: ['./courses-program-formateur.component.scss']
})
export class CoursesProgramFormateurComponent implements OnInit {
  courses:any;
  programmeID:any;
  programme:any;
  token:any;
  id:any;
  demandeID:any;
   constructor(private courseService:CourseService,private userService:UserService,private route:ActivatedRoute,private cd: ChangeDetectorRef,private router:Router,private programmeService:ProgrammeService) { 
     this.programmeID= this.route.snapshot.paramMap.get('programmeID');
     console.log(this.programmeID);
      console.log(this.route.snapshot.paramMap);
      this.token=localStorage.getItem('auth-token');
     this.demandeID=this.route.snapshot.queryParamMap.get("demande");
     console.log(this.demandeID);
       console.log(this.userService.updateData(this.token).user_id);
       this.id=this.userService.updateData(this.token).user_id
           console.log(this.id);
   }
 reload(){
  window.location.reload();

 }
   ngOnInit(): void {
  
    this.programmeService.getProgrammeByID(this.programmeID).subscribe(data=>{
      this.programme=data;
    });
    this.courseService.getCoursByProgrammeIDFormateur(this.programmeID,this.id).subscribe(data=>{
      console.log(data);
      this.courses=data;
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
     this.router.navigate(["formateur/mesprogrammes/"+this.programmeID+"/cours/ajouter" ], { queryParams: { demande: this.demandeID} });
 
   }
   supprimer(cours){
     this.courseService.deleteCours(cours.id).subscribe(data=>{
      this.courseService.getCoursByProgrammeIDFormateur(this.programmeID,this.id).subscribe(data=>{
        console.log(data);
        this.courses=data;
      });
     });
   }
 }