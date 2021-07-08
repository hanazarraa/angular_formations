import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { Doc } from 'src/app/models/doc.model';
import { Enregistrement } from 'src/app/models/enregistrement.model';
import { Reunion } from 'src/app/models/reunion.model';
import { CourseService } from 'src/app/services/course.service';
import { DocumentService } from 'src/app/services/document.service';
import { UserService } from 'src/app/services/user.service';
import * as fileSaver from 'file-saver';
import { DomSanitizer } from '@angular/platform-browser';
import { saveAs } from 'file-saver';
import { EnregistrementService } from 'src/app/services/enregistrement.service';
import { ReunionService } from 'src/app/services/reunion.service';
import { DemandeFormateurService } from 'src/app/services/demande-formateur.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-creer-cours-formateur',
  templateUrl: './creer-cours-formateur.component.html',
  styleUrls: ['./creer-cours-formateur.component.scss'],
  providers: [DatePipe]
})
export class CreerCoursFormateurComponent implements OnInit {
  documents:Array<Doc>=[];
  date=new Date();
  myDate:any;
  newDocument:any={};
  errorMessage:any;
  enregistrements:Array<Enregistrement>=[];
  newEnregistrement:any={};
  reunions:Array<Reunion>=[];
  newReunion:any={};
  coursModel:any=new Course();
  programmeID:any;
  token:any;
  id:any;
  reunionModel=new Reunion();
  submitted:boolean;
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
   success:boolean;
  fileInfos?: Observable<any>;
  files:any=[];
  demande:any;
  demandeID:any;
successMessage:string;
  constructor(private router:Router,private datePipe:DatePipe,private enregService:EnregistrementService,private demandeFService:DemandeFormateurService,private userService:UserService, private documentService:DocumentService,private toastr: ToastrService,private coursService:CourseService,private route:ActivatedRoute,private reunionService:ReunionService) {
    this.myDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    console.log(this.myDate);
    this.demandeID=this.route.snapshot.queryParamMap.get("demande");
   console.log(this.demandeID);
   }
  selectFiles(event): void {
    this.message = [];
    this.progressInfos = [];
    
    this.selectedFiles = event.target.files;
  }
  uploadFiles(): void {
    this.message = [];
  
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }
  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
  
    if (file) {
      console.log(file.name);
      this.files.push(file);
      console.log(this.files);
      const msg = 'Uploaded the file successfully: ' + file.name;
      this.message.push(msg);
   
      /* this.documentService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            this.documentService.getFilesByCours(null).subscribe(data=>{
              console.log(data);
            });
            this.fileInfos = this.documentService.getFilesByCours(null);
            console.log(this.fileInfos);
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);

          this.fileInfos = this.documentService.getFilesByCours(null);
        });*/
    }
  }
  ngOnInit(): void {
  //  this.fileInfos = this.documentService.getFilesByCours(null); 


    this.newDocument={titre:"",piece_jointe:""};
    this.newEnregistrement={lien_zoom:"",date:""};
   this.newReunion={titre:"",date:"",lien:""};
   this.programmeID=this.route.snapshot.paramMap.get('programmeID');
   this.token=localStorage.getItem('auth-token');
     this.demandeFService.getDemandesById(this.demandeID).subscribe(data=>{
       this.demande=data;
       console.log(data);
     });
   console.log(this.userService.updateData(this.token).user_id);
   this.id=this.userService.updateData(this.token).user_id
       console.log(this.id);

  }
  addDocument() {    
    this.newDocument = {titre: "", piece_jointe:""};  
      this.documents.push(this.newDocument);  
      this.toastr.success('New row added successfully', 'New Row');  
      //console.log(this.dynamicArray);  
      return true;  
  }  
  addEnregistrement() {    
   // this.newEnregistrement = {lien_zoom: "", date:""};  
      this.enregistrements.push(this.newEnregistrement);  
      this.newEnregistrement={};
      console.log(this.enregistrements);
      this.toastr.success('New row added successfully', 'New Row');  
      //console.log(this.dynamicArray);  
      return true;  
  }
  customTrackBy(index: number, obj: any): any {
    return index;
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
  supprimer_file(index){
    console.log(index)
    this.message[index]="Le document "+this.files[index].name+" supprimé avec succés";
    this.files.splice(index,1);
    console.log(this.files);
    //return true
  }
  valider_cours(){
    
     this.submitted=true;
     
    console.log(this.reunionModel);
    console.log(this.coursModel);
    this.coursModel.programme=this.programmeID;
    this.coursModel.partage_par=this.id;
    this.coursService.AjouterCours(this.coursModel).subscribe(data=>{
      console.log(data);
      for (var file of this.files){
        console.log(file);
        this.documentService.upload(file,data.id).subscribe(data=>{
          console.log(data);
        });
        
        
      }
      for(var enregistrement of this.enregistrements){
        enregistrement.cours=data.id;
        this.enregService.AjouterEnregistrement(enregistrement).subscribe(data=>{
          console.log(data);
        });
       }
       this.reunionModel.cours=data.id;
       this.reunionService.AjouterReunion(this.reunionModel).subscribe(data=>{
           
         console.log(data);
       });
       this.router.navigate(['/formateur/programmes/'+this.programmeID+'/cours/'+data.id]);
      this.success=true;
      this.successMessage="Cours Ajoutée avec succés"
    },(error:any) =>{
      console.log(error.error.non_field_errors );
      this.success=false;
       this.errorMessage=error.error ;
       console.log(this.errorMessage);
    });
  }
 /* download(doc:any){
    this.documentService.downloadFile(doc.id).subscribe(response => {
let blob:any = new Blob([response.blob()],{type:'application/pdf'});
			const url= window.URL.createObjectURL(blob);
 	window.open(url);
		//	window.location.href = response.url;
		 fileSaver.saveAs(blob, doc.piece_jointe);
		}), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
  }*/
  downloadFile(doc: any): void {

    this.documentService
      .downloadFile(doc)
      .subscribe(blob => saveAs(blob, doc.file_name));
  }
  }

