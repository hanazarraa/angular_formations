import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute ,Router} from '@angular/router';
import { moment } from 'ngx-bootstrap/chronos/test/chain';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Competence } from 'src/app/models/competence';
import { Consigne } from 'src/app/models/consigne.model';
import { Doc } from 'src/app/models/doc.model';
import { Enregistrement } from 'src/app/models/enregistrement.model';
import { DynamicGrid } from 'src/app/models/grid.model';
import { Niveau } from 'src/app/models/niveau';
import {Location} from '@angular/common';
import { Programme } from 'src/app/models/programme';
import { Programmecompetenceniveau } from 'src/app/models/programmecompetenceniveau';
import { Question } from 'src/app/models/question';
import { Quizz } from 'src/app/models/quizz';
import { Remise } from 'src/app/models/remise.model';
import { Reponse } from 'src/app/models/reponse';
import { Reunion } from 'src/app/models/reunion.model';
import { Travail } from 'src/app/models/travail.model';
import { CompetenceService } from 'src/app/services/competence.service';
import { ConsigneService } from 'src/app/services/consigne.service';
import { NiveauService } from 'src/app/services/niveau.service';
import { ProgrammeCompetenceNiveauService } from 'src/app/services/programme-competence-niveau.service';
import { ProgrammeService } from 'src/app/services/programme.service';
import { QuestionService } from 'src/app/services/question.service';
import { ReponseService } from 'src/app/services/reponse.service';
import { ScoreQuizzService } from 'src/app/services/score-quizz.service';
import { TravailService } from 'src/app/services/travail.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-consulter-formation-formateur',
  templateUrl: './consulter-formation-formateur.component.html',
  styleUrls: ['./consulter-formation-formateur.component.scss'],
  providers: [DatePipe]
})
export class ConsulterFormationFormateurComponent implements OnInit {
  @ViewChild('closebtn') closebtn:any;
  @ViewChild('formRecipe') formRecipe: NgForm;   
  @ViewChild('consigneForm') public consigneForm : NgForm;

  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  enregistrements:any;
  fileInfos?: Observable<any>;
  coursID:any;
  files:any=[];

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
consignes:any=[];
quizzes:Array<Quizz>=[];
questions:Array<Question>=[];
questions1:any;
newQuizz:any={};
newConsigne:any={};
remises:Array<Remise>=[];
newRemise:any={};
documents:Array<Doc>=[];
newDocument:any={};

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
 /*console.log(this.questions[this.current].id);
 this.reponseService.getReponsesByQuestionID(this.questions[this.current].id)
.subscribe(data=>{
  this.reponses=data;
  console.log(this.reponses);
}); */
}

onNext() {
  if(this.questions1.length == 0 && this.current == 0){
    this.valider_question();
  }else{
    this.prev=this.current++;
  }
  
  
//  console.log(this.questionModel);
  //console.log(this.quizzModel);
 // this.quizzModel.questions.push(this.questionModel);
 // console.log(this.quizzModel);

  //this.questionModel={};
 /* console.log(this.current);
   this.prev = this.current++ ;
   console.log(this.questions[this.current].id);
    this.reponseService.getReponsesByQuestionID(this.questions[this.current].id)
   .subscribe(data=>{
     this.reponses=data;
     console.log(this.reponses);
    
   }); */
   

}
files1: any[] = [];

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
   // this.remiseService.supprimerRemise()
   this.files1.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files1.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files1[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files1[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      console.log(item);
      this.files1.push(item);
   
    }
    this.uploadFilesSimulator(0);
    console.log("prepare file_list",this.files1);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }


currentTravail:any;
currentConsigne:any;
onNextT(object:any){
  if(this.currentt == 0){
    this.currentTravail=object;
  }else{
    this.currentConsigne=object;
  }

  this.prevt=this.currentt++;
}
onPrevT(){
  this.prevt=this.currentt--;
}
consulterscores(){
   this.current=this.questions1.length+1;

}
  valider_question(){
   // console.log(this.quizzModel);
  // let row:Reponse[]  = new Array<Reponse>();      
  //  this.responseArray.push(row);
  this.questionModel=new Question();
   this.questionModel.reponses=new Array<Reponse>();
    this.questions1.push(this.questionModel) ;
    console.log(this.questions1);
   this.current=this.questions1.length ;
   //this.current+=1;
    //this.prev+=1;
   
   //this.prev=this.current++;
  //console.log(this.quizzModel);

  //this.questionModel={};
  // this.current=0;
}
supprimerQuestion(index:any){
  if(this.questions1[index].id){
    this.questionService.deleteQuestion(this.questions1[index].id).subscribe(data=>{
      console.log(data);
      this.questions1.splice(index);
      console.log(this.questions1);
    });
  }else{
    this.questions1.splice(index);
  }
   
    this.prev = this.current--;

  
}
creerQuizz() {
  this.prev=this.current++;
  this.questionModel.reponses=[];
 this.questions.push(this.questionModel)
 console.log(this.questionModel);
 console.log(this.questions);
 
 }
 consulterQuizz() {
  this.prev=this.current++;
  /*this.questionModel.reponses=[];
 this.questions1.push(this.questionModel)
 console.log(this.questionModel);
 console.log(this.questions);*/
 
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

//public date: number = new Date().getDate();

//public heure_debut: Date = new Date(this.fullYear, this.month , this.date, 10, 0, 0);

//public minValue: Date = new Date(this.fullYear, this.month , this.date, 7, 0, 0);
//public heure_fin: Date = new Date(this.fullYear, this.month , this.date, 10, 0, 0);

//public maxValue: Date = new Date(this.fullYear, this.month, this.date, 20, 0 ,0);
public programmeId:any;
currentt:any=0;
prevt:any=-1;
demandeID:any;
date=new Date();
myDate:any;
constructor(private route:ActivatedRoute,private location:Location, private datePipe:DatePipe,private scoreQuizzService:ScoreQuizzService,private reponseService:ReponseService,private questionService:QuestionService,private changeDetectorRef: ChangeDetectorRef,private http:HttpClient,private consigneService:ConsigneService,private userService:UserService,private _fb:FormBuilder,private toastr: ToastrService,private fb :FormBuilder,private programmeService:ProgrammeService,private CompetenceService:CompetenceService,private NiveauService:NiveauService,private progcompnivService:ProgrammeCompetenceNiveauService
   ,private travailService:TravailService) {
 this.addForm = this.fb.group({
   items: [null, Validators.required],
   items_value: ['no', Validators.required]
 });
 this.myDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
 console.log(this.myDate);
 this.token=localStorage.getItem('auth-token');

 console.log(this.userService.updateData(this.token).user_id);
this.id=this.userService.updateData(this.token).user_id
console.log(this.id);
 this.programmeId = this.route.snapshot.paramMap.get('programmeID');
console.log(this.programmeId);
 this.rows = this.fb.array([]);
 this.demandeID=this.route.snapshot.queryParamMap.get('demande');
 console.log(this.route.snapshot.queryParamMap.get('demande'));


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
scoresquizz:any;
id:any;
piece_jointe:File;
pieces_jointes:any=[];
//currentTravail:any;
pieces_travail:any[][]=[[]];
/*voirTravail(travail) {
 this.currentTravail = travail;
 this.currentTravail.consignes=[];
}*/

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
 
  dateValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const today = new Date().getTime();

    if(!(control && control.value)) {
      // if there's no control or no value, that's ok
      return null;
    }

    // return null if there's no errors
    console.log(control.value);
    return control.value.getTime() < today 
      ? {invalidDate: 'You cannot use future dates' } 
      : null;
  }
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
this.form = this.fb.group({
  
  date_debut: [,this.dateValidator()],
  date_limite: [,this.dateValidator()]
});
this.scoreQuizzService.getScoreQuizByDemandeFormateur(this.demandeID).subscribe(data=>{
  this.scoresquizz=data;
  console.log("scores",data);
});
this.progcompnivService.getCompNiveauByProgrammeID(this.programmeId).subscribe(data=>{
  this.competences=data;
  console.log(data);
});
this.submitted=false;
 this.programmeService.getProgrammeByID(this.programmeId)
.subscribe(data => {
  this.programme = data;
  
   console.log(this.programme);

  
 // console.log(this.customer);
}, error => console.log(error));

this.travailService.getTravailByProgrammeIDProprietaire(this.programmeId,this.id)
  .subscribe(data=>{
    this.traveaux=data;
    console.log(this.traveaux);
    for(let i=0;i<this.traveaux.length;i++){
        this.traveaux[i].consignes=[];
         this.consigneService.getConsignesByTravail(this.traveaux[i].id).subscribe((result:any)=>{
         console.log(result);
         for(let j=0;j<result.length;j++){
          this.traveaux[i].consignes.push(result[j]);
  
  
        //console.log(this.traveaux[i]);
         }
        });
      }
  },error=>console.log(error));
  
this.progcompnivService.getCompNiveauByProgrammeID(this.programmeId)
.subscribe(data=>{
  this.dynamicArray=data;
  console.log(this.dynamicArray);
});
this.questionService.getQuestionByProgrammeIDFormateur(this.programmeId,this.id).subscribe(data=>{
  console.log(data);
  this.questions1=data;
  console.log(this.questions1);
});
 /*this.questionService.getQuestionByProgrammeID(this.programmeId)
 .subscribe(data=>{
   this.questions=data;
   console.log(this.questions);
   for(let i=0;i<this.questions.length;i++){
   // let row:Reponse[]  = new Array<Reponse>();      
     this.questions[i].reponses=new Array<Reponse>();
      this.reponseService.getReponsesByQuestionID(this.questions[i].id).subscribe((result:any)=>{
      console.log(result);
      
      for(let j=0;j<result.length;j++){
        this.questions[i].reponses.push(result[j]);


      
      }
      console.log(this.questions[i]);
      
      
    });
    console.log("response array for question",0,this.responseArray[1]);

  }

    
 });*/
 
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
first(){
  this.current=1;
  this.prev=0;
}
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
  this.newTravail.consignes=[];
 
console.log(this.newTravail.consignes);
 this.traveaux.push(this.newTravail); 
 //this.traveaux[this.traveaux.length-1].consignes=new Array<Consigne>();

 this.newTravail = {};  
  console.log(this.traveaux);
 this.toastr.success('New row added successfully', 'New Row');  
 //console.log(this.dynamicArray);  
 return true;  
}  
selectFiles(event): void {
  this.message = [];
  this.progressInfos = [];
  this.selectedFiles = event.target.files;
}
supprimer_Consigne(file:any,i:any){
  this.currentTravail.consignes.splice(i,1);
  this.consigneService.supprimerConsigne(file.id).subscribe(data=>{
    
    console.log(data);

  });
}
supprimer_file(index:any){
  if(this.traveaux[this.modal.index].consignes[index].id){
    this.consigneService.supprimerConsigne(this.traveaux[this.modal.index].consignes[index].id).subscribe(result=>{
      console.log(this.traveaux[this.modal.index].consignes);
    });
  }
  this.traveaux[this.modal.index].consignes.splice(index,1);
}
uploadFiles(): void {
   this.message = [];

  if (this.selectedFiles) {
    console.log(this.selectFiles);
    for (let i = 0; i < this.selectedFiles.length; i++) {
       this.uploadFile(i, this.selectedFiles[i]);
       
  }
}
}
uploadFile(idx: number, file: File): void {
  this.progressInfos[idx] = { value: 0, fileName: file.name };

  if (file) {
    console.log(file.name);
    
   // this.files.push(file);
    console.log(this.files);
    const msg = 'Le fichier ' + file.name+" est importé avec succés";
    this.message.push(msg);
    this.traveaux[this.modal.index].consignes.push(file);
    console.log(this.traveaux[this.modal.index]);
  //   this.consignes.push(file);
     
  }
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
 //// console.log("new reponse in question ",this.current);
 //this.responseArray=[];
   console.log(this.newReponse );
  //console.log(this.responseArray[this.current]);
  //console.log(this.reponses);
 // let row=this.responseArray[this.current];
 // row.push(this.newReponse);
 // console.log(row);
/* if(!this.questions[this.current-1].reponses){
    this.questions[this.current].reponses=new  Array<Reponse>();
    console.log(this.questions[this.current]);

 }*/
   this.questions1[this.current-1].reponses.push(this.newReponse);
   console.log(this.questions1[this.current-1].reponses);
   console.log(this.questions1);
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

  if(this.questions1[this.current-1].reponses[index].id){
    this.reponseService.supprimerReponse(this.questions1[this.current-1].reponses[index].id).subscribe(data=>{
      this.questionService.getQuestionByProgrammeIDFormateur(this.programmeId,this.id).subscribe(data=>{
        this.questions1=data;
      });
    });
  }else{
   this.questions1[this.current-1].reponses.splice(index,1);
  }
  console.log(this.questions1[this.current-1].reponses);
  /*  let row=this.responseArray[this.current];
    this.reponseService.supprimerReponse(row[index].id).subscribe((result:any)=>{
      console.log("deleted from db");
    });
     row.splice(index, 1);  
     console.log(this.responseArray);
      // console.log(this.questions[this.current-1].reponses);
       this.toastr.warning('Row deleted successfully', 'Delete row');  
       return true;  */
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
  if(this.traveaux[index].id){

  
  this.travailService.deleteTravail(this.traveaux[index].id).subscribe((result:any)=>{
    console.log("travail deleted successfully");
  });
}
   this.traveaux.splice(index, 1);  
   this.toastr.warning('Row deleted successfully', 'Delete row');  
   return true;  

}

DJANGO_SERVER = 'http://127.0.0.1:8000'
fileURL;
headers: Headers = new Headers();
@ViewChild('myInput')
myInputVariable: ElementRef;
valider(){
  this.message=[];
   //this.consigneForm.form.reset();
   console.log(this.myInputVariable.nativeElement.files);
   this.myInputVariable.nativeElement.value = "";
   console.log(this.myInputVariable.nativeElement.files);
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
  console.log("valider_formation clicked");
console.log(this.questions1);
 console.log(this.dynamicArray)
console.log(this.traveaux)
this.submitted=true;
console.log(this.programmeModel);

 this.programmeService.modifierProgramme(this.programmeId,this.programme).subscribe((result:any)=>{
 console.log(result);
 
 this.submitted=true;
 console.log(this.updateSuccess);
  for(let i=0;i<this.questions1.length;i++){
    if(this.questions1[i].id){
    
     this.questionService.updateQuestion(this.questions1[i].id,this.questions1[i]).subscribe((result:any)=>{
       console.log(result);
       let row=this.questions1[i].reponses;
       for(var j=0;j<row.length;j++){
         if(row[j].id){
          this.reponseService.ModifierReponse(row[j].id,row[j]).subscribe((result:any)=>{
            console.log(result);
          });
         }else{
          row[j].question=this.questions1[i].id;
          this.reponseService.AjouterReponse(row[j]).subscribe((result:any)=>{
            console.log(result);
          });
         }
       }
     });
   }else{
    this.questions1[i].programme=this.programmeId;
    this.questions1[i].cree_par=this.id;
     this.questionService.AjouterQuestion(this.questions1[i]).subscribe((result:any)=>{
       console.log(result);
       let row=this.questions1[i].reponses;
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
 
 console.log(this.files1);
 for(var file of this.files1){
  this.consigneService.upload(file,this.currentTravail.id,this.id).subscribe(data=>{
    console.log(data);
  });
}
 for( var travail of this.traveaux ){
   console.log(travail.id);
    if(travail.id){
      let row=travail.consignes;
      console.log(row);
     this.travailService.updateTravail(travail.id,travail).subscribe((result:any)=>{
       if(row.length>0){
 
         for(var consigne of row){
           console.log(consigne,"valider_formation");
           if(consigne.id===undefined){
           this.consigneService.upload(consigne,travail.id,this.id).subscribe((result)=>{
             console.log(result);
           });
          }
         }
       }
       console.log(result);
     });
   }else{
    console.log(travail.date_debut);
    console.log(this.myDate);
    if(travail.date_debut < this.myDate   ){
            this.updateSuccess=false;
            this.errorMessage="Date début déjà passée";
    }else if(travail.date_limite < this.myDate){
      this.updateSuccess=false;
      this.errorMessage="Date fin déjà passée";

    }else{
      travail.programme=this.programmeId;
      travail.partage_par=this.id;
      let row=travail.consignes;
      this.travailService.AjouterTravail(travail).subscribe((result:any)=>{
        console.log(result);
        if(row.length>0){
        for(var consigne of row){
               this.consigneService.upload(consigne,result.id,this.id).subscribe(result=>{
                 console.log(result);
               });
        }
       }
      });
      this.successMessage = 'Programme Mis a jour avec succés';
      this.updateSuccess=true;
    }
    
   }
 }
 this.successMessage = 'Programme Mis a jour avec succés';
      this.updateSuccess=true;
     //window.location.reload();
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


 /*horaire(){
   this.router.navigate(["/formateur/programmes/"+this.+"/cours/horaire"])
 }*/
}
