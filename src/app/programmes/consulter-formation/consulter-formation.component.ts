import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Niveau } from 'src/app/models/niveau';
import { Competence } from 'src/app/models/competence';
import { Quizz } from 'src/app/models/quizz';
import { TravailService } from 'src/app/services/travail.service';
import { ReponseService } from 'src/app/services/reponse.service';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from 'src/app/models/question';
import { Programmecompetenceniveau } from 'src/app/models/programmecompetenceniveau';
import { Programme } from 'src/app/models/programme';
import { ConsigneService } from 'src/app/services/consigne.service';
import { UserService } from 'src/app/services/user.service';
import { ProgrammeService } from 'src/app/services/programme.service';
import { CompetenceService } from 'src/app/services/competence.service';
import { NiveauService } from 'src/app/services/niveau.service';
import { ProgrammeCompetenceNiveauService } from 'src/app/services/programme-competence-niveau.service';
import { data } from 'jquery';

@Component({
  selector: 'app-consulter-formation',
  templateUrl: './consulter-formation.component.html',
  styleUrls: ['./consulter-formation.component.scss']
})
export class ConsulterFormationComponent implements OnInit {
  @ViewChild('closebtn') closebtn:any;
  @ViewChild('formRecipe') formRecipe: NgForm;   
  @ViewChild('consigneForm') public consigneForm : NgForm;


  formGroup:FormGroup;
 totalRow:number;
addForm: FormGroup;

rows: FormArray;
itemForm: FormGroup;

ngAfterViewInit() {
 // HtmlDurationPicker.init();
}

//rows=<any>[];
successMessage:string;
formatted:string;
 updateSuccess:boolean;
errorMessage:string;

programmeModel=new Programme();
programmeCompetenceniveauModel=new Programmecompetenceniveau();
form:FormGroup;
submitted:boolean=false;
loading:boolean;
competences : Competence[]=new Array<Competence>();
niveaux:Niveau[]=new Array<Niveau>();
inscriptions:any;
 programme:any;
dynamicArray: Array<DynamicGrid> = [];  
newDynamic: any = {}; 
programmeCompetenceNiveauArray:Array<Programmecompetenceniveau>=[];
newprogcompniv:any={};
traveaux:Array<Travail>=[];
newTravail:any={};
consignes:Consigne[][]=[];
quizzes:Array<Quizz>=[];
questions:Array<Question>=[];
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
responses:Array<Reponse>=[];
responseArray:Reponse[][]=new Array<Array<Reponse>>();
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
questionModel=new Question();
onPrev() {
 this.prev = this.current--;
 console.log(this.questions[this.current].id);
 this.reponseService.getReponsesByQuestionID(this.questions[this.current].id)
.subscribe(data=>{
  this.reponses=data;
  console.log(this.reponses);
}); 
}

onNext() {
//  console.log(this.questionModel);
  //console.log(this.quizzModel);
 // this.quizzModel.questions.push(this.questionModel);
 // console.log(this.quizzModel);

  //this.questionModel={};
  console.log(this.current);
   this.prev = this.current++ ;
   console.log(this.questions[this.current].id);
    this.reponseService.getReponsesByQuestionID(this.questions[this.current].id)
   .subscribe(data=>{
     this.reponses=data;
     console.log(this.reponses);
   /*  for(var reponse of this.reponses){
     }*/
   }); 
   

}
  valider_question(){
   // console.log(this.quizzModel);
  // let row:Reponse[]  = new Array<Reponse>();      
  //  this.responseArray.push(row);
  this.questions[this.current].reponses=new Array<Reponse>();
    this.questions.push(this.questionModel) ;
    console.log(this.questions);
   console.log("avant");
   console.log(this.current);
   console.log(this.prev);
   this.current+=1;
   this.prev+=1;
   console.log("apres");
   console.log(this.current);
   console.log(this.prev);
  
   //this.prev=this.current++;
  //console.log(this.quizzModel);

  //this.questionModel={};
  // this.current=0;
}
supprimerQuestion(index:any){
  if(this.questions.length==0){
    console.log("error");
  }else{
    this.questionService.deleteQuestion(this.questions[index].id).subscribe((result:any)=>{
      console.log(result);
    });
    this.questions.splice(index,1);
    console.log(this.questions);
    this.prev = this.current--;

  }
}
creerQuizz() {
  this.prev=this.current++;
  this.questionModel.reponses=[];
 this.questions.push(this.questionModel)
 console.log(this.questionModel);
 console.log(this.questions);
 
 }
onNext1() {
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
public programmeId:any;
constructor(private route:ActivatedRoute,private reponseService:ReponseService,private questionService:QuestionService,private changeDetectorRef: ChangeDetectorRef,private http:HttpClient,private consigneService:ConsigneService,private userService:UserService,private _fb:FormBuilder,private toastr: ToastrService,private fb :FormBuilder,private programmeService:ProgrammeService,private CompetenceService:CompetenceService,private NiveauService:NiveauService,private progcompnivService:ProgrammeCompetenceNiveauService
   ,private travailService:TravailService) {
 this.addForm = this.fb.group({
   items: [null, Validators.required],
   items_value: ['no', Validators.required]
 });
 this.token=localStorage.getItem('auth-token');
 console.log(this.token);

 console.log(this.userService.updateData(this.token).user_id);
this.id=this.userService.updateData(this.token).user_id
console.log(this.id);
 this.programmeId = this.route.snapshot.paramMap.get('programmeID');
console.log(this.programmeId);
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
validerQuizz(form:NgForm ){
  console.log(this.quizzModel);
  this.quizzModel.questions=[];
  this.quizzes.push(this.quizzModel);
 //.quizzModel.titre=""
  console.log(this.quizzes);
  this.onNext( );
  //this.changeDetectorRef.detectChanges();
 // this.closebtn.nativeElement.click();

  //form.form.reset ();

 


 //console.log(this.quizzes);
 //console.log(this.newQuizz);
  
}
onChange(event) {
  console.log(event.target.files[0]);
 this.newConsigne.piece_jointe=event.target.files[0];
 this.piece_jointe=event.target.files[0];
 console.log(event.target.id);
 let index=event.target.id.substring(13,event.target.id.length);
// this.traveaux[0].consignes[0]=event.target.files[0];

  let index_travail=event.target.id.substring(12,event.target.id.length-1);
  this.traveaux[index_travail].consignes[index].piece_jointe=event.target.files[0].name;
 console.log(index)
 this.pieces_jointes[index]=event.target.files[0];
 console.log(this.pieces_jointes)
 this.pieces_travail[index_travail].push(event.target.files[0]);
 console.log(this.pieces_travail[0][0]);
 console.log(this.pieces_travail[0][1]);

 console.log("pieces_travaux",this.pieces_travail);

}

ngOnInit(): void {
  $('#testModal').on('hide', function() {
     $('#titre', this).val('');
  });
  $('#testModal').on('hidden.bs.modal', function () {
     $(this)
       
      //  .find("input[type=file]")
      //  .val("")
        .end();
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
this.submitted=false;
 this.programmeService.getProgrammeByID(this.programmeId)
.subscribe(data => {
  this.programme = data;
  
   console.log(this.programme);

  
 // console.log(this.customer);
}, error => console.log(error));
console.log(this.id);
this.travailService.getTravailByProgrammeIDProprietaire(this.programmeId,this.id)
  .subscribe(data=>{
    this.traveaux=data;
    console.log(this.traveaux);
  },error=>console.log(error));
this.progcompnivService.getCompNiveauByProgrammeID(this.programmeId)
.subscribe(data=>{
  this.dynamicArray=data;
  console.log(this.dynamicArray);
});
 this.questionService.getQuestionByProgrammeID(this.programmeId)
 .subscribe(data=>{
   this.questions=data;
   console.log(this.questions);
   for(let i=0;i<this.questions.length;i++){
   // let row:Reponse[]  = new Array<Reponse>();      
     this.questions[i].reponses=new Array<Reponse>();
     //console.log(this.responseArray[i]);
     this.reponseService.getReponsesByQuestionID(this.questions[i].id).subscribe((result:any)=>{
      console.log(result);
      //this.responses =result;
      //console.log(this.responses);

      for(let j=0;j<result.length;j++){
        this.questions[i].reponses.push(result[j]);


        //console.log(result[j]);
        //this.responseArray[i][j]=result[j];
        //console.log("f",this.responseArray[i][j]);
    

      }
      console.log(this.questions[i]);
      //this.responseArray.push(row);
      //console.log(this.responseArray);
      //console.log(this.responseArray[i]);

      
      
    });
    console.log("response array for question",0,this.responseArray[1]);

  }

    
 });
 for(var i=0;i<this.questions.length;i++){
   this.responseArray[i]=[];
   this.reponseService.getReponsesByQuestionID(this.questions[i].id).subscribe((result:any)=>{
     console.log(result);
    // this.responseArray[i]=result;
    // console.log("response array ",i,this.responseArray[i]);
   });
 }
    
 //  console.log(this.questions[this.current].reponses);

 /*console.log(this.current);
 console.log(this.questions[this.current]);
 this.reponseService.getReponsesByQuestionID(this.questions[this.current].id)
 .subscribe(data=>{
   this.reponses=data;
   console.log(this.reponses);
 });*/
 
  


  $("#validModal").on('click',function(){
    console.log("i was clicked");
  })
  this.quizzModel.questions=[];
// this.consignes[0][0]=new Consigne();

 
// $('.datepicker').datepicker();

/*jQuery(document).delegate('a.add-record', 'click', function(e) {
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
 });*/


 
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

 this.newReponse={};
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
  console.log("new reponse in question ",this.current);
 //this.responseArray=[];
   console.log(this.newReponse);
  //console.log(this.responseArray[this.current]);
  //console.log(this.reponses);
 // let row=this.responseArray[this.current];
 // row.push(this.newReponse);
 // console.log(row);
 if(!this.questions[this.current].reponses){
    this.questions[this.current].reponses=new  Array<Reponse>();
    console.log(this.questions[this.current]);

 }
  this.questions[this.current].reponses.push(this.newReponse);
  //console.log(this.responseArray);
 /* this.newReponse.question=this.questions[this.current].id;
  this.reponseService.AjouterReponse(this.newReponse).subscribe((result:any)=>{
    console.log(result);
    console.log("new reponse");
  });*/
//this.newReponse = {id: "", option:"" ,result:false};  
 //this.questions[this.current-1].reponses.push(this.newReponse); 
 //console.log(this.questions[this.current-1]);
 this.newReponse={};
 this.toastr.success('New rep added successfully in question');  
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
this.progcompnivService.deleteCompetence(this.dynamicArray[index].id).subscribe((result:any)=>{
  console.log("competence deleted successfully");
});
     this.dynamicArray.splice(index, 1);  
     this.toastr.warning('Row deleted successfully', 'Delete row');  
     return true;  
 
}
deleteReponse(index:any) {  
  /* if(this.programmeCompetenceNiveauArray.length ==1) {  
   this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
     return false;  
  } else {  
     this.programmeCompetenceNiveauArray.splice(index, 1);  
     this.toastr.warning('Row deleted successfully', 'Delete row');  
     return true;  
  }  */

    let row=this.responseArray[this.current];
    this.reponseService.supprimerReponse(row[index].id).subscribe((result:any)=>{
      console.log("deleted from db");
    });
     row.splice(index, 1);  
     console.log(this.responseArray);
      // console.log(this.questions[this.current-1].reponses);
       this.toastr.warning('Row deleted successfully', 'Delete row');  
       return true;  
   
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
  this.travailService.deleteTravail(this.traveaux[index].id).subscribe((result:any)=>{
    console.log("travail deleted successfully");
  });
   this.traveaux.splice(index, 1);  
   this.toastr.warning('Row deleted successfully', 'Delete row');  
   return true;  

}

DJANGO_SERVER = 'http://127.0.0.1:8000'
fileURL;
headers: Headers = new Headers();

valider(){
  //this.consigneForm.form.reset();

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
console.log(this.questions);
//console.log(this.programmeCompetenceNiveauArray);
console.log(this.dynamicArray)
console.log(this.traveaux)
this.submitted=true;
console.log(this.programmeModel);

 this.programmeService.modifierProgramme(this.programmeId,this.programme).subscribe((result:any)=>{
 console.log(result);
 this.updateSuccess=true;
 this.successMessage = 'Programme Mis a jour avec succés';
 console.log(this.updateSuccess);
 for(let i=0;i<this.questions.length;i++){
  // console.log("now",this.current);
   if(this.questions[i].id){
    
     this.questionService.updateQuestion(this.questions[i].id,this.questions[i]).subscribe((result:any)=>{
       console.log(result);
       let row=this.questions[i].reponses;
       for(var j=0;j<row.length;j++){
         if(row[j].id){
          this.reponseService.ModifierReponse(row[j].id,row[j]).subscribe((result:any)=>{
            console.log(result);
          });
         }else{
          row[j].question=this.questions[i].id;
          this.reponseService.AjouterReponse(row[j]).subscribe((result:any)=>{
            console.log(result);
          });
         }
       }
     });
   }else{
    this.questions[i].programme=this.programmeId;
    this.questions[i].cree_par=this.id;
     this.questionService.AjouterQuestion(this.questions[i]).subscribe((result:any)=>{
       console.log(result);
       let row=this.questions[i].reponses;
       for(var j=0;j<row.length;j++){
        row[j].question=result.id;
        this.reponseService.AjouterReponse(row[j]).subscribe((result:any)=>{
          console.log(result);
        });
       }
     });
   }

 }
 
 /*for(var reponse of this.reponses){
   console.log(this.reponse)
   if(reponse.id){
     this.reponseService.ModifierReponse(reponse.id,reponse).subscribe((result:any)=>{
       console.log(result);
     });
   }
 }*/

/* for (var question of this.questions) {
  console.log(question); 
  question.programme=result.id;
  question.cree_par=this.id;
  this.questionService.AjouterQuestion(question).subscribe((result:any)=>{
    console.log(result);
    for(var reponse of question.reponses){
      console.log(reponse);
      reponse.question=result.id;
      this.reponseService.AjouterReponse(reponse).subscribe((result:any)=>{
        console.log(result);
      },(error:any)=>{
        console.log(error);
      });
    }
  },(error:any)=>{
    console.log(error);
  });

}*/
for (var dynamic of this.dynamicArray) {
   console.log(dynamic); 
   if(dynamic.id){

      this.progcompnivService.updateCompNiveau(dynamic.id,dynamic).subscribe((result:any)=>{
     console.log(result);
      

   });
  }
  else{
    dynamic.programme=this.programmeId;
    this.progcompnivService.AjouterProgramme_Competence_Niveau(dynamic).subscribe((result:any)=>{
      console.log(result);

    });
  }
 

 }
 for( var travail of this.traveaux ){
   if(travail.id){
     this.travailService.updateTravail(travail.id,travail).subscribe((result:any)=>{
       console.log(result);
     });
   }else{
     travail.programme=this.programmeId;
     travail.partage_par=this.id;
     this.travailService.AjouterTravail(travail).subscribe((result:any)=>{
       console.log(result);
     });
   }
 }

 /* for (var travail of this.traveaux) {
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

 }*/

},(error:any)=>{
 console.log(error);
 this.updateSuccess=false;
 this.errorMessage="Echec de mis a jour du programmme";

}
);

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