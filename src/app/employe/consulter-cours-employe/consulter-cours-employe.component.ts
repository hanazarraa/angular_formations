import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Doc } from 'src/app/models/doc.model';
import { Enregistrement } from 'src/app/models/enregistrement.model';
import { Reunion } from 'src/app/models/reunion.model';
import { CourseService } from 'src/app/services/course.service';
import { DemandeFormateurService } from 'src/app/services/demande-formateur.service';

@Component({
  selector: 'app-consulter-cours-employe',
  templateUrl: './consulter-cours-employe.component.html',
  styleUrls: ['./consulter-cours-employe.component.scss']
})
export class ConsulterCoursEmployeComponent implements OnInit {
  documents:Array<Doc>=[];
  newDocument:any={};
  enregistrements:Array<Enregistrement>=[];
  newEnregistrement:any={};
  reunions:Array<Reunion>=[];
  newReunion:any={};
coursID:any;
demande:any;
cours:any;
  constructor(private toastr: ToastrService,private route:ActivatedRoute,private demandeFService:DemandeFormateurService,private coursService:CourseService) { 
    this.coursID= this.route.snapshot.paramMap.get('coursID');
    console.log(this.route.snapshot.paramMap.get('coursID'));
  
  }

  ngOnInit(): void {
   this.coursService.getCoursById(this.coursID).subscribe(data=>{
     this.cours=data;
     console.log(data);
   });
    this.newDocument={titre:"",piece_jointe:""};
    this.newEnregistrement={lien_zoom:"",date:""};
   this.newReunion={titre:"",date:"",lien:""};

  }
  addDocument() {    
    this.newDocument = {titre: "", piece_jointe:""};  
      this.documents.push(this.newDocument);  
      this.toastr.success('New row added successfully', 'New Row');  
      //console.log(this.dynamicArray);  
      return true;  
  }  
  addEnregistrement() {    
    this.newEnregistrement = {lien_zoom: "", date:""};  
      this.enregistrements.push(this.newEnregistrement);  
      this.toastr.success('New row added successfully', 'New Row');  
      //console.log(this.dynamicArray);  
      return true;  
  }
  addReunion() {    
    this.newReunion = {titre: "", date:"",lien:""};  
      this.reunions.push(this.newReunion);  
      this.toastr.success('New row added successfully', 'New Row');  
      //console.log(this.dynamicArray);  
      return true;  
  }   
  deleteDocument(index:any) {  
    if(this.documents.length ==1) {  
      this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
        return false;  
    } else {  
        this.documents.splice(index, 1);  
        this.toastr.warning('Row deleted successfully', 'Delete row');  
        return true;  
    }  
  }
  deleteEnregistrement(index:any) {  
    if(this.enregistrements.length ==1) {  
      this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
        return false;  
    } else {  
        this.enregistrements.splice(index, 1);  
        this.toastr.warning('Row deleted successfully', 'Delete row');  
        return true;  
    }  
  }
  deleteReunion(index:any) {  
    if(this.reunions.length ==1) {  
      this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
        return false;  
    } else {  
        this.reunions.splice(index, 1);  
        this.toastr.warning('Row deleted successfully', 'Delete row');  
        return true;  
    }  
  }
  presentation(){
    $("#presentation-tab").removeClass("text-dark").addClass("text-light") ;
    $("#materiel-tab").removeClass("text-light").addClass("text-dark") ;
    $("#reunions-tab").removeClass("text-light").addClass("text-dark");
  }
  materiel(){
    $("#presentation-tab").removeClass("text-light").addClass("text-dark");
    $("#materiel-tab").removeClass("text-dark").addClass("text-light");
    $("#reunions-tab").removeClass("text-light").addClass("text-dark");
  
  }
  reunion(){
    $("#presentation-tab").removeClass("text-light").addClass("text-dark");
    $("#materiel-tab").removeClass("text-light").addClass("text-dark");
    $("#reunions-tab").removeClass("text-dark").addClass("text-light");
  
  }
}

