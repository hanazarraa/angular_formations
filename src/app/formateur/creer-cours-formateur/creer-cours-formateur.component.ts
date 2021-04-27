import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Doc } from 'src/app/models/doc.model';
import { Enregistrement } from 'src/app/models/enregistrement.model';
import { Reunion } from 'src/app/models/reunion.model';

@Component({
  selector: 'app-creer-cours-formateur',
  templateUrl: './creer-cours-formateur.component.html',
  styleUrls: ['./creer-cours-formateur.component.scss']
})
export class CreerCoursFormateurComponent implements OnInit {
  documents:Array<Doc>=[];
  newDocument:any={};
  enregistrements:Array<Enregistrement>=[];
  newEnregistrement:any={};
  reunions:Array<Reunion>=[];
  newReunion:any={};

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
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
