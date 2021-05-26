import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
 import { ToastrService } from 'ngx-toastr';
 import * as $ from 'jquery';

import { Consigne } from 'src/app/models/consigne.model';
import { Doc } from 'src/app/models/doc.model';
import { Enregistrement } from 'src/app/models/enregistrement.model';
import { DynamicGrid } from 'src/app/models/grid.model';
import { Remise } from 'src/app/models/remise.model';
import { Reponse } from 'src/app/models/reponse';
import { Reunion } from 'src/app/models/reunion.model';
import { Travail } from 'src/app/models/travail.model';
import { MatFormField }from      '@angular/material/form-field';
import { Programme } from 'src/app/models/programme';
import { ProgrammeService } from 'src/app/services/programme.service';
import { Programmecompetenceniveau } from 'src/app/models/programmecompetenceniveau';
import { Competence } from 'src/app/models/competence';
import { CompetenceService } from 'src/app/services/competence.service';
import { Niveau } from 'src/app/models/niveau';
import { NiveauService } from 'src/app/services/niveau.service';
import { ProgrammeCompetenceNiveauService } from 'src/app/services/programme-competence-niveau.service';
import { TravailService } from 'src/app/services/travail.service';
import { UserService } from 'src/app/services/user.service';
import { ConsigneService } from 'src/app/services/consigne.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Quizz } from 'src/app/models/quizz';
@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.scss']
})
export class AddFormationComponent implements OnInit {
  @ViewChild('closebtn') closebtn:any;
     formGroup:FormGroup;
    totalRow:number;
  addForm: FormGroup;

   rows: FormArray;
  itemForm: FormGroup;



//rows=<any>[];

  programmeModel=new Programme();
  programmeCompetenceniveauModel=new Programmecompetenceniveau();
  form:FormGroup;
  submitted:boolean=false;
  loading:boolean;
  competences : Competence[]=new Array<Competence>();
  niveaux:Niveau[]=new Array<Niveau>();
  inscriptions:any;
    
  dynamicArray: Array<DynamicGrid> = [];  
  newDynamic: any = {}; 
  programmeCompetenceNiveauArray:Array<Programmecompetenceniveau>=[];
  newprogcompniv:any={};
  traveaux:Array<Travail>=[];
   newTravail:any={};
  consignes:Consigne[][]=[];
  quizzes:Array<Quizz>=[];
  newQuizz:any={};
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
  items=[{id:"1",titre:"compétence 1"},
  {id:"2",titre:'compétence 2'},
  {id:"3",titre:'compétence 3'},
  {id:"4",titre:'compétence 4'}];
  selectedComp:number;
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
 
  constructor(private http:HttpClient,private consigneService:ConsigneService,private userService:UserService,private _fb:FormBuilder,private toastr: ToastrService,private fb :FormBuilder,private programmeService:ProgrammeService,private CompetenceService:CompetenceService,private NiveauService:NiveauService,private progcompnivService:ProgrammeCompetenceNiveauService ,private travailService:TravailService) {
    this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });


    this.rows = this.fb.array([]);

    this.form = this.fb.group({
      titre: ['', Validators.required ],
      description:['',Validators.required]
   });
   }  
  hide(){
    $("#addquestion").hide();
    }
  
 
  onAddRow() {
    this.rows.push(this.createItemFormGroup());
  }

  onRemoveRow(rowIndex:number){
    this.rows.removeAt(rowIndex);
  }

  createItemFormGroup(): FormGroup {
    return this.fb.group({
      competence:new FormControl(""),
      niveau: new FormControl(""),
      programme: null
    });
  }
  token:any;
  id:any;
  piece_jointe:File;
  pieces_jointes:any=[];
  currentTravail:any;
  pieces_travail:any[][]=[[]];
  voirTravail(travail) {
    this.currentTravail = travail;
    this.currentTravail.consignes=[];
  }

  quizzModel=new Quizz();
   validerQuizz( ){
     console.log(this.quizzModel);
    console.log(this.quizzes);
    console.log(this.newQuizz);
     
  }
  onChange(event) {
     console.log(event.target.files[0]);
    this.newConsigne.piece_jointe=event.target.files[0];
    this.piece_jointe=event.target.files[0];
    console.log(event.target.id);
    let index=event.target.id.substring(13,event.target.id.length);
   // this.traveaux[0].consignes[0]=event.target.files[0];

     let index_travail=event.target.id.substring(12,event.target.id.length-1);
    console.log(index)
    this.pieces_jointes[index]=event.target.files[0];
    console.log(this.pieces_jointes)
    this.pieces_travail[index_travail].push(event.target.files[0]);
    console.log(this.pieces_travail[0][0]);
    console.log(this.pieces_travail[0][1]);

    console.log("pieces_travaux",this.pieces_travail);
   
  }

  ngOnInit(): void {
    this.consignes[0][0]=new Consigne();
   
    this.token=localStorage.getItem('auth-token');
   
    console.log(this.userService.updateData(this.token).user_id);
 this.id=this.userService.updateData(this.token).user_id
 console.log(this.id)
   // $('.datepicker').datepicker();

jQuery(document).delegate('a.add-record', 'click', function(e) {
     e.preventDefault();    
     var content = jQuery('#sample_table tr'),
     size = jQuery('#tbl_posts >tbody >tr').length + 1,
     
    // element:any = null,    
     element = content.clone();
     element.attr('id', 'rec-'+size);
     element.find('.delete-record').attr('data-id', size);
     element.appendTo('#tbl_posts_body');
     console.log('#tbl_posts_body'.length);
    // element.find('.sn').html(size);
   });
   
    this.formGroup=this._fb.group({
      itemRows:this._fb.array([this.initItemRow()])
    });
     
    this.addForm.get("items").valueChanges.subscribe(val => {
      if (val === true) {
        this.addForm.get("items_value").setValue("yes");

        this.addForm.addControl('rows', this.rows);
      }
      if (val === false) {
        this.addForm.get("items_value").setValue("no");
        this.addForm.removeControl('rows');
      }
    });


    this.CompetenceService.getCompetences()
    .subscribe(
      (competences:Competence[])=> 
       { console.log(competences);
         this.competences=competences}
       );
       this.NiveauService.getNiveaux()
       .subscribe(
         (niveaux:Niveau[])=> 
          { console.log(niveaux);
            this.niveaux=niveaux}
          );
        this.newprogcompniv={programme:"",competence:"",niveau:""};
      

    var rowIdx = 0;
   this.newQuizz={};
    this.newDynamic ={};
     this.newTravail = {};  
     this.newConsigne={};
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
initItemRow(){
  return this._fb.group({
    competence:[''],
    niveau:[''],
    programme:['']
  })
}
addNewRow(){
  const control=<FormArray>this.formGroup.controls['itemRows'];
  control.push(this.initItemRow());
  console.log(control.value)

}
deleterow(index:number){
  const control=<FormArray>this.formGroup.controls['itemRows'];
  if(control!=null){
    this.totalRow=control.value.length;
  }
  if(this.totalRow>1){
    control.removeAt(index);
  }else{
    alert('one record is mandatory');
   // return false;
  }
}
selectedCompetence: string;
trackByFn(index, item) {
  return index;
}
customTrackBy(index: number, obj: any): any {
  return index;
}
addRow() {    
 // console.log(this.programmeCompetenceNiveauArray);
 /* this.newprogcompniv={programme:"",competence:"",niveau: ""};
   this.programmeCompetenceNiveauArray.push(this.newprogcompniv);*/
   console.log("avant insertion",this.dynamicArray.length) ;
   console.log(this.newDynamic)

     this.dynamicArray.push(this.newDynamic);  
     this.newDynamic={};
    this.toastr.success('New row added successfully', 'New Row'); 
    console.log(this.dynamicArray);
    console.log("apres insertion",this.dynamicArray.length) ;
    this.newDynamic={}
    //this.newDynamic={};
    //console.log(this.programmeCompetenceNiveauArray);  
    return true;  
}  
addTravail() {    
  console.log(this.newTravail)
 // this.newTravail.consignes=[];
 this.pieces_travail[this.modal.index]=[];

  console.log(this.newTravail.consignes);
    this.traveaux.push(this.newTravail); 
    this.traveaux[this.traveaux.length-1].consignes=[] ;

    this.newTravail = {};  
     console.log(this.traveaux);
    this.toastr.success('New row added successfully', 'New Row');  
    //console.log(this.dynamicArray);  
    return true;  
}  

modal:any={};
showModal(x,travail){
  console.log(x);
  this.currentTravail=travail;
  console.log("my index",this.currentTravail.rowIndex);
  this.modal.index=x;
  //this.modconsignes.index=i;
  //console.log("my index",x.rowIndex);
}
addConsigne() { 
     console.log("my index",this.currentTravail.rowIndex);
     console.log("current travail index",this.modal.index)
     this.traveaux[this.modal.index].consignes.push(this.newConsigne)
  this.newConsigne.piece_jointe=this.piece_jointe;  
    //this.newTravail.consignes.push(this.newConsigne);  
   let index = Array.prototype.indexOf.call(this.traveaux,this.currentTravail);

    console.log(this.newTravail.consignes);
    this.newConsigne = {};  

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

addQuizz() {    
  console.log(this.quizzes);
  console.log(this.newQuizz);
 // this.newQuizz = {titre: "", date:"",lien:""};  
    this.quizzes.push(this.newQuizz);  
    this.toastr.success('New row added successfully', 'New Row');  
    this.newQuizz={};
    //console.log(this.dynamicArray);  
    return true;  
}   
deleteQuizz(index:any) {  
  if(this.quizzes.length ==1) {  
    this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;  
  } else {  
      this.quizzes.splice(index, 1);  
      this.toastr.warning('Row deleted successfully', 'Delete row');  
      return true;  
  }  
}
addReponse() {    
  this.newReponse = {id: "", option:"" ,result:false};  
    this.reponses.push(this.newReponse);  
    this.toastr.success('New row added successfully', 'New Row');  
    //console.log(this.dynamicArray);  
    return true;  
}   

deleteRow(index:any) {  
 /* if(this.programmeCompetenceNiveauArray.length ==1) {  
    this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;  
  } else {  
      this.programmeCompetenceNiveauArray.splice(index, 1);  
      this.toastr.warning('Row deleted successfully', 'Delete row');  
      return true;  
  }  */
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
  if( this.traveaux[this.modal.index].consignes.length ==1) {  
    this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;  
  } else {  
      this.traveaux[this.modal.index].consignes.splice(index, 1);
      this.pieces_jointes.splice(index,1);  
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
DJANGO_SERVER = 'http://127.0.0.1:8000'
fileURL;
headers: Headers = new Headers();

valider(){
  console.log(this.pieces_jointes);
  console.log(this.traveaux);
  /*for(let i=0;i<this.consignes.length;i++){
    const uploadData=new FormData()
    uploadData.append("piece_jointe",this.pieces_jointes[i]);
    uploadData.append("travail",this.id);
    uploadData.append("remis_par",this.id);
    console.log(uploadData.get('piece_jointe'));
    console.log(uploadData.get('travail'));
    console.log(uploadData.get('remis_par'));
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers,
     
    };
    //return this.httpclient.post('http://localhost:8000/api/consignes/',consigne,options);
  
  
    this.http.post('http://127.0.0.1:8000/api/consigneUpload/',uploadData).subscribe(
      result=>console.log(result),
      error=>console.log(error)
      );
  }*/
 /* console.log(this.piece_jointe)
  const uploadData=new FormData();
  uploadData.append("travail",this.id)
  uploadData.append("remis_par",this.id);
  //console.log(this.piece_jointe)
  uploadData.append("piece_jointe",this.piece_jointe);
  var options1 = { content: uploadData };
console.log(options1);*/
 
    
  

 /* console.log(this.newConsigne);
  console.log(this.consignes);
  for (var consigne of this.consignes) {
    console.log(consigne.piece_jointe); 
    consigne.travail=null;
    consigne.remis_par=this.id;
    this.consigneService.AjouterConsigne(consigne).subscribe((result:any)=>{
      console.log(result);
      this.fileURL=`${this.DJANGO_SERVER}${result.file}`;
      console.log(result);
      console.log(this.fileURL);
   
    },(error:any)=>{
      console.log(error);
    });
  }*/
  this.closebtn.nativeElement.click();

}
valider_formation(form:FormGroup){

 console.log(this.programmeCompetenceNiveauArray);
  console.log(this.dynamicArray)
  console.log(this.traveaux)
  this.submitted=true;
  console.log(this.programmeModel);
 
 /* this.programmeService.AjouterProgramme(this.programmeModel).subscribe((result:any)=>{
    console.log(result);
    for (var dynamic of this.dynamicArray) {
      console.log(dynamic.competence); 
      dynamic.programme=result.id;
      this.progcompnivService.AjouterProgramme_Competence_Niveau(dynamic).subscribe((result:any)=>{
        console.log(result);
      },(error:any)=>{
        console.log(error);
      });
  
    }

     for (var travail of this.traveaux) {
      console.log(travail.titre); 
      travail.programme=result.id;
      travail.partage_par=this.id;
      this.travailService.AjouterTravail(travail).subscribe((result:any)=>{
        console.log(result);
        for(let i=0;i<this.consignes.length;i++){
          const uploadData=new FormData()
          uploadData.append("piece_jointe",this.pieces_jointes[i]);
          uploadData.append("travail",result.id);
          uploadData.append("remis_par",this.id);
          console.log(uploadData.get('piece_jointe'));
          console.log(uploadData.get('travail'));
          console.log(uploadData.get('remis_par')); 
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
             });
             
              this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
              const options = {
            headers,
           
          };
         
        
          this.http.post('http://127.0.0.1:8000/api/consigneUpload/',uploadData).subscribe(
            result=>console.log(result),
            error=>console.log(error)
            );
        }
      },(error:any)=>{
        console.log(error);
      });
  
    }

  },(error:any)=>{
    console.log(error);

  }
  );*/
  
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
