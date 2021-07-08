 import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Consigne } from 'src/app/models/consigne.model';
import { Doc } from 'src/app/models/doc.model';
import { Enregistrement } from 'src/app/models/enregistrement.model';
import { DynamicGrid } from 'src/app/models/grid.model';
import { Remise } from 'src/app/models/remise.model';
import { Reponse } from 'src/app/models/reponse';
import { Reunion } from 'src/app/models/reunion.model';
import { Scorequizz } from 'src/app/models/scorequizz';
import { Travail } from 'src/app/models/travail.model';
import { DemandeFormateurService } from 'src/app/services/demande-formateur.service';
import { ProgrammeCompetenceNiveauService } from 'src/app/services/programme-competence-niveau.service';
import { QuestionService } from 'src/app/services/question.service';
import { RemiseService } from 'src/app/services/remise.service';
import { ScoreQuizzService } from 'src/app/services/score-quizz.service';
import { TravailService } from 'src/app/services/travail.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-consulter-formation-employe',
  templateUrl: './consulter-formation-employe.component.html',
  styleUrls: ['./consulter-formation-employe.component.scss']
})
export class ConsulterFormationEmployeComponent implements OnInit {
  @ViewChild('closebtn') closebtn:any;
  @ViewChild('closebutton') closebutton:any;
  @Output() answers =
    new EventEmitter<{user_answer: Response}>();
  quizStart = false;
  quizEnd = false;
  currentIndex = 0;

   
  startQuiz() {
    this.quizStart = true;
    this.score=0;
    this.current=1;
  }
  
  backHome() {
    this.quizStart = false;
    this.quizEnd = false;
  }
   scoreQuiz:Scorequizz=new Scorequizz();
  endQuiz() {
    this.quizEnd = true;
    
    this.scoreQuiz.demande_formateur=this.demandeID;
    this.scoreQuiz.participant=this.id;
    this.scoreQuiz.score=this.score;
     this.scorequizService.AjouterScoreQuiz(this.scoreQuiz).subscribe(data=>{
       console.log(data);
     });
     //alert('Quiz Over! Score is ' + this.score + '/ ' + this.questions.length);
    console.log("votre score =",this.score);


  }
  CONGRATULATIONS = '../../../assets/images/ng-trophy.jpg';
 /* restartQuiz() {
    this.quizOver = false;
    this.score = 0;
    this.currentIndex = 0;
  }*/
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



  valider_test(){
    console.log(this.files1);
    for(var file of this.files1){
     this.remiseService.upload(file,this.currentConsigne.id,this.id).subscribe(data=>{
      //  console.log(data);
        
        this.remiseService.getRemisesByConsigneRemispar(this.currentConsigne.id,this.id).subscribe(data=>{
          this.remises=data;
          console.log("remises",this.remises);
          console.log("current consigne",this.currentConsigne);
          this.prevt=2;
          this.currentt=3;
          console.log(this.currentt);
          this.closebutton.nativeElement.click();
        });
      });
    }
  
  /*  for(var file of this.files1){
      this.remiseService.upload(consigne,result.id,this.id).subscribe((result)=>{
        console.log(result);
      });
    }*/
  }
  selectedFiles?: FileList;

  progressInfos: any[] = [];
  message: string[] = [];
  enregistrements:any;
  fileInfos?: Observable<any>;
  coursID:any;
  files:any=[];

  inscriptions:any;
  addForm: FormGroup;

  rows: FormArray;
  itemForm: FormGroup;
  dynamicArray: Array<DynamicGrid> = [];  
  newDynamic: any = {}; 
  traveaux:Array<Travail>=[
    ];
  newTravail:any={};
  consignes:Array<Consigne>=[
    
  ];
  newConsigne:any={};
  remises:Array<Remise>=[
    
  ];
  newRemise:any={};
  documents:Array<Doc>=[];
  newDocument:any={};
   newEnregistrement:any={};
  reunions:Array<Reunion>=[];
  newReunion:any={};
  reponses:Array<Reponse>=[
     
  ];
  newReponse:any={};
  competences=["Angular","Django"];

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
currentt=0;
prevt=-1;
  onPrev() {
    this.prev = this.current--;
  }

  onNext(question) {
    if(this.current>0 ){
      //console.log(question);
      if(this.current==this.questions.length){
         
        //console.log("votre score",this.score);
        this.endQuiz();
        this.prev=this.current++;
      }else{

      
      this.updateScore();
      this.prev=this.current++;
      }
    }
    else{
      this.prev = this.current++ ;

    }
  }
  userAnswer:any;
  setUserAnswer(option){
    this.userAnswer = option;
   
    console.log(option);
    this.answers.emit(
      {user_answer: this.userAnswer});
      //this.userAnswer=option;
console.log(this.answers);
  }
  score:any=0;
  updateScore(){
  console.log(this.answers);
  if(this.userAnswer.isvalid){
    this.score++;
    
  }
  console.log(this.score);
  }
  receiveAnswers(receivedAnswers) {
    console.log(receivedAnswers);
    this.answers = receivedAnswers;

  }
  onPrevT() {
    if(this.currentt == 3 ){
        this.prevt=this.currentt-=2;
    }else{
      this.prevt = this.currentt--;
    }
    
  }
    currentConsigne:any;
  onNextT(object) {
    console.log(object);
    if(this.currentt == 0){
     this.currentTravail=object;
    
     this.prevt=this.currentt++;
    }else if(this.currentt == 1){
      this.currentConsigne=object;
      this.remiseService.getRemisesByConsigneRemispar(this.currentConsigne.id,this.id).subscribe(data=>{
        console.log(data);
        if(data.length>0){
          this.remises=data;
          this.prevt = this.currentt+=2 ;
        }else{
          this.prevt = this.currentt++ ;
        }
      
      });
    
     
    } 
 
  }

  isLeftTransition(idx: number): boolean {
    return this.current === idx ? this.prev > this.current : this.prev < this.current;
  }
demandeID:any;
   demande:any;
  model:any;
  date_debut:any;
  date_fin:any;
  competencesniveaux:any;
  competencesniveaux$:Observable<any>;
  public month: number = new Date().getMonth();
 
  public fullYear: number = new Date().getFullYear();
 
  public date: number = new Date().getDate();
 
  public heure_debut: Date = new Date(this.fullYear, this.month , this.date, 10, 0, 0);
 
  public minValue: Date = new Date(this.fullYear, this.month , this.date, 7, 0, 0);
  public heure_fin: Date = new Date(this.fullYear, this.month , this.date, 10, 0, 0);

  public maxValue: Date = new Date(this.fullYear, this.month, this.date, 20, 0 ,0);
  programmeID:any;
  token:any;
  id:any;
  travaux$:Observable<any>;
  questions:any;
  username:any
  user1:any;
  scoresquizz:any;
  constructor(private toastr: ToastrService,private scorequizService:ScoreQuizzService,private remiseService:RemiseService,private questionService:QuestionService, private userService:UserService,private route:ActivatedRoute, private travailService:TravailService,private demande_formateurService:DemandeFormateurService,private progcompnivService:ProgrammeCompetenceNiveauService) {
    this.programmeID= this.route.snapshot.paramMap.get('programmeID');
    // console.log(this.programmeID);
    this.demandeID=this.route.snapshot.queryParamMap.get('demande');
    console.log(this.route.snapshot.queryParamMap.get('demande'));
    this.token=localStorage.getItem('auth-token');

 console.log(this.userService.updateData(this.token).user_id);
 this.username=userService.updateData(this.token).username;
this.id=this.userService.updateData(this.token).user_id
this.userService.getUserByID(this.id).subscribe(data=>{
  console.log(data);
  this.user1=data;
});
console.log(this.id);
    //this.demande_formateurService
   }  
  hide(){
    $("#addquestion").hide();
    }
  onRemoveRow(rowIndex:number){
    this.rows.removeAt(rowIndex);
  }
 

  ngOnInit(): void {
   
     this.demande_formateurService.getDemandeFormateurByID(this.demandeID).subscribe(data=>{
       this.demande=data;
       console.log(data);
       this.travaux$=this.travailService.getTravailByProgrammeIDProprietaire(this.programmeID,this.demande.formateur);
       this.travaux$.forEach(travail=>{
         console.log(travail);
       });
       this.questionService.getQuestionByProgrammeIDFormateur(this.programmeID,this.demande.formateur).subscribe(data=>{
        this.questions=data;
        console.log(data);
      });
     });
    this.competencesniveaux$=this.progcompnivService.getCompNiveauByProgrammeID(this.programmeID);
    this.progcompnivService.getCompNiveauByProgrammeID(this.programmeID).subscribe(data=>{
      this.competencesniveaux=data;
      console.log(data);
    });
    
  this.scorequizService.getScoreQuizzByDemandeFormateurAndParticipant(this.demandeID,this.id).subscribe(data=>{
    console.log("score ce participant",data);
    this.scoresquizz=data;
  });
    console.log(this.demande );
   
    var rowIdx = 0;
    this.newDynamic = {competence: "", niveau: "",resultat:""};  
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
selectFiles(event,i): void {
  console.log(i);
  this.message = [];
  this.progressInfos = [];
  this.selectedFiles = event.target.files;
  console.log(this.selectedFiles[0]);
 /* this.currentTravail.consignes[i].remises.push(this.selectFiles[0]);
  console.log(this.currentTravail.consignes[i]);*/
  //this.uploadFile(0,this.selectedFiles[0]);
}
/*supprimer_file(index:any){
  if(this.traveaux[this.modal.index].consignes[index].id){
    this.consigneService.supprimerConsigne(this.traveaux[this.modal.index].consignes[index].id).subscribe(result=>{
      console.log(this.traveaux[this.modal.index].consignes);
    });
  }
  this.traveaux[this.modal.index].consignes.splice(index,1);
}*/
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
   // this.currentTravail.consignes[idx].remises.push(file);
    //console.log(this.traveaux[this.modal.index]);
  //   this.consignes.push(file);
     
  }
}
currentTravail:any;
modal:any={};
showModal(x,travail){
console.log(x);
this.currentTravail=travail;
console.log("my index",this.currentTravail.rowIndex);
this.modal.index=x;

//this.modconsignes.index=i;
//console.log("my index",x.rowIndex);
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
  console.log(this.currentTravail.consignes);
  //console.log(this.remise);
  console.log((<HTMLInputElement>document.getElementById("remise0")).value);
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
 download(){
   console.log("telecharger");
 }
}
