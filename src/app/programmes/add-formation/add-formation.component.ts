import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
 import { ToastrService } from 'ngx-toastr';
import { Consigne } from 'src/app/models/consigne.model';
import { Doc } from 'src/app/models/doc.model';
import { Enregistrement } from 'src/app/models/enregistrement.model';
import { DynamicGrid } from 'src/app/models/grid.model';
import { Remise } from 'src/app/models/remise.model';
import { Reponse } from 'src/app/models/reponse';
import { Reunion } from 'src/app/models/reunion.model';
import { Travail } from 'src/app/models/travail.model';
import { MatFormField }from      '@angular/material/form-field';
@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.scss']
})
export class AddFormationComponent implements OnInit {
  @ViewChild('closebtn') closebtn:any;
   
  inscriptions:any;
  addForm: FormGroup;

  rows: FormArray;
  itemForm: FormGroup;
  dynamicArray: Array<DynamicGrid> = [];  
  newDynamic: any = {}; 
  traveaux:Array<Travail>=[];
  newTravail:any={};
  consignes:Array<Consigne>=[];
  newConsigne:any={};
  remises:Array<Remise>=[];
  newRemise:any={};
  documents:Array<Doc>=[];
  newDocument:any={};
  enregistrements:Array<Enregistrement>=[];
  newEnregistrement:any={};
  reunions:Array<Reunion>=[];
  newReunion:any={};
  reponses:Array<Reponse>=[];
  newReponse:any={};
  items=['compétence 1','compétence 2','compétence 3','compétence 4'];
  itemId:any;
  levels=['Niveau 1','Niveau 2','Niveau 3','Niveau 4'];
  levelId:any;
  public selectControl = new FormControl();
  public selectItems = [
    { optionId: 1, optionTitle: 'option 1' },
    { optionId: 2, optionTitle: 'option 2' },
    { optionId: 3, optionTitle: 'option 3' },
    { optionId: 4, optionTitle: 'option 4' },
    { optionId: 5, optionTitle: 'option 5' },
    { optionId: 6, optionTitle: 'option 6' },
    { optionId: 7, optionTitle: 'option 7' },
    { optionId: 8, optionTitle: 'option 8' },
    { optionId: 9, optionTitle: 'option 9' },
    { optionId: 10, optionTitle: 'option 10' },
    { optionId: 11, optionTitle: 'option 11' },
    { optionId: 12, optionTitle: 'option 12' },
    { optionId: 13, optionTitle: 'option 13' },
    { optionId: 14, optionTitle: 'option 14' },
    { optionId: 15, optionTitle: 'option 15' },
    { optionId: 16, optionTitle: 'option 16' },
    { optionId: 17, optionTitle: 'option 17' },
    { optionId: 18, optionTitle: 'option 18' },
    { optionId: 19, optionTitle: 'option 19' },
    { optionId: 20, optionTitle: 'option 20' },
  ];
   
  current = 0;
  prev = -1;

  onPrev() {
    this.prev = this.current--;
  }

  onNext() {
    this.prev = this.current++ ;
  }

  isLeftTransition(idx: number): boolean {
    return this.current === idx ? this.prev > this.current : this.prev < this.current;
  }

   
  model:any;
  date_debut:any;
  date_fin:any;
  public month: number = new Date().getMonth();
 
  public fullYear: number = new Date().getFullYear();
 
  public date: number = new Date().getDate();
 
  public heure_debut: Date = new Date(this.fullYear, this.month , this.date, 10, 0, 0);
 
  public minValue: Date = new Date(this.fullYear, this.month , this.date, 7, 0, 0);
  public heure_fin: Date = new Date(this.fullYear, this.month , this.date, 10, 0, 0);

  public maxValue: Date = new Date(this.fullYear, this.month, this.date, 20, 0 ,0);
 
  constructor(private toastr: ToastrService) { }  
  hide(){
    $("#addquestion").hide();
    }
  onRemoveRow(rowIndex:number){
    this.rows.removeAt(rowIndex);
  }
 

  ngOnInit(): void {
    var rowIdx = 0;
    this.newDynamic = {competence: "", niveau: "",resultat:""};  
     this.newTravail = {titre: "", date_debut: "",date_echeance:"",test:"",ponderation:"",resultat:""};  
     this.newConsigne={titre:"",piece_jointe:""};
     this.newRemise={titre:"",piece_jointe:""};
     this.newDocument={titre:"",piece_jointe:""};
     this.newEnregistrement={lien_zoom:"",date:""};
    this.newReunion={titre:"",date:"",lien:""};
 
    this.newReponse={id:"",option:"",result:false};
    this.inscriptions=[
      {'id':1, 'formateur':'Personne 1','Date_debut':'20/4/2021','Date_fin':'20/5/2020','statut':'réfuse'},
      {'id':2, 'formateur':'Personne 2','Date_debut':'20/4/2020','Date_fin':'20/5/2021','statut':'En attente'},
      {'id':3, 'formateur':'Personne 3','Date_debut':'22/2/2021','Date_fin':'20/3/2021','statut':'Accepté'},
      {'id':4, 'formateur':'Personne 4','Date_debut':'24/1/2021','Date_fin':'20/9/2021','statut':'conditionnel'},
    ]
    console.log(this.inscriptions);
    this.selectControl.valueChanges
    .subscribe((subscriptionTypeId: number) => {
      const obj = this.selectItems.find(item => item.optionId === subscriptionTypeId);
      console.log(
        'subscriptionTypeId', subscriptionTypeId, obj
      );
    });
  }
 
  time: Date = new Date();
 hours=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
 counter(i: number) {
  return new Array(i);
}
addRow() {    
  this.newDynamic = {competence: "", niveau: "",resultat:""};  
    this.dynamicArray.push(this.newDynamic);  
    this.toastr.success('New row added successfully', 'New Row');  
    console.log(this.dynamicArray);  
    return true;  
}  
addTravail() {    
  this.newTravail = {titre: "", date_debut: "",date_echeance:"",test:"",ponderation:"",resultat:""};  
    this.traveaux.push(this.newTravail);  
    this.toastr.success('New row added successfully', 'New Row');  
    //console.log(this.dynamicArray);  
    return true;  
}  
addConsigne() {    
  this.newConsigne = {titre: "", piece_jointe:""};  
    this.consignes.push(this.newConsigne);  
    this.toastr.success('New row added successfully', 'New Row');  
    //console.log(this.dynamicArray);  
    return true;  
}  
addRemise() {    
  this.newRemise = {titre: "", piece_jointe:""};  
    this.remises.push(this.newRemise);  
    this.toastr.success('New row added successfully', 'New Row');  
    //console.log(this.dynamicArray);  
    return true;  
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

addReponse() {    
  this.newReponse = {id: "", option:"" ,result:false};  
    this.reponses.push(this.newReponse);  
    this.toastr.success('New row added successfully', 'New Row');  
    //console.log(this.dynamicArray);  
    return true;  
}   

deleteRow(index:any) {  
    if(this.dynamicArray.length ==1) {  
      this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
        return false;  
    } else {  
        this.dynamicArray.splice(index, 1);  
        this.toastr.warning('Row deleted successfully', 'Delete row');  
        return true;  
    }  
}
deleteConsigne(index:any) {  
  if(this.consignes.length ==1) {  
    this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;  
  } else {  
      this.consignes.splice(index, 1);  
      this.toastr.warning('Row deleted successfully', 'Delete row');  
      return true;  
  }  
}
deleteRemise(index:any) {  
  if(this.remises.length ==1) {  
    this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;  
  } else {  
      this.remises.splice(index, 1);  
      this.toastr.warning('Row deleted successfully', 'Delete row');  
      return true;  
  }  
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

deleteTravail(index:any) {  
  if(this.traveaux.length ==1) {  
    this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;  
  } else {  
      this.traveaux.splice(index, 1);  
      this.toastr.warning('Row deleted successfully', 'Delete row');  
      return true;  
  }  
}
deleteReponse(index:any) {  
  if(this.reponses.length ==1) {  
    this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;  
  } else {  
      this.reponses.splice(index, 1);  
      this.toastr.warning('Row deleted successfully', 'Delete row');  
      return true;  
  }  
}
valider(){
  this.closebtn.nativeElement.click();

}
presentation(){
  $("#presentation-tab").removeClass("text-dark").addClass("text-light") ;
  $("#cmpv-tab").removeClass("text-light").addClass("text-dark") ;
  $("#evaluation-tab").removeClass("text-light").addClass("text-dark");
}
cmpv(){
  $("#presentation-tab").removeClass("text-light").addClass("text-dark");
  $("#cmpv-tab").removeClass("text-dark").addClass("text-light");
  $("#evaluation-tab").removeClass("text-light").addClass("text-dark");

}
evaluation(){
  $("#presentation-tab").removeClass("text-light").addClass("text-dark");
  $("#cmpv-tab").removeClass("text-light").addClass("text-dark");
  $("#evaluation-tab").removeClass("text-dark").addClass("text-light");

}
travaux(){
  $("#travaux-tab").removeClass("text-dark").addClass("text-light");
  $("#qcm-tab").removeClass("text-light").addClass("text-dark");
 
}
qcm(){
  $("#travaux-tab").removeClass("text-light").addClass("text-dark");
  $("#qcm-tab").removeClass("text-dark").addClass("text-light");
 
}
 
}
