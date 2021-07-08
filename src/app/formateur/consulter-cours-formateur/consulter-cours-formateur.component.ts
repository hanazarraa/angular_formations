import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import {switchMap,map} from 'rxjs/operators';
import { Course } from 'src/app/models/course';
import { Doc } from 'src/app/models/doc.model';
import { Enregistrement } from 'src/app/models/enregistrement.model';
import { Reunion } from 'src/app/models/reunion.model';
import { CourseService } from 'src/app/services/course.service';
import { DocumentService } from 'src/app/services/document.service';
import { EnregistrementService } from 'src/app/services/enregistrement.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ProgrammeService } from 'src/app/services/programme.service';
import { ReunionService } from 'src/app/services/reunion.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-consulter-cours-formateur',
  templateUrl: './consulter-cours-formateur.component.html',
  styleUrls: ['./consulter-cours-formateur.component.scss']
})
export class ConsulterCoursFormateurComponent implements OnInit {
documents  :any={};
  coursModel:any ;
  programmeID:any;
  reunions:any;
  token:any;
  id:any;
  reunionModel:any;
  newEnregistrement:any={};
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  enregistrements:any;
  fileInfos?: Observable<any>;
  coursID:any;
  files:any=[];

  constructor(private loaderService:LoaderService,private router:Router,private enregService:EnregistrementService,private userService:UserService, private documentService:DocumentService,private toastr: ToastrService,private coursService:CourseService,private route:ActivatedRoute,private reunionService:ReunionService) { }
  selectFiles(event): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }
  uploadFiles(): void {
    this.message = [];
  
    if (this.selectedFiles) {
      console.log(this.selectFiles);
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }
  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
  
    if (file) {
      console.log(file.name);
      
     // this.files.push(file);
      console.log(this.files);
      const msg = 'Le fichier ' + file.name+" est importé avec succés";
      this.message.push(msg);
       this.files.push(file);
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
  item$: Observable<string | undefined>

  ngOnInit(): void {
  //  this.fileInfos = this.documentService.getFilesByCours(null);
      this.newEnregistrement={};
   this.programmeID=this.route.snapshot.paramMap.get('programmeID');
   this.token=localStorage.getItem('auth-token');

   console.log(this.userService.updateData(this.token).user_id);
   this.id=this.userService.updateData(this.token).user_id
       console.log(this.id);
       this.coursModel = this.route.snapshot.data['coursModel'];
console.log(this.coursModel);
    /*   this.coursID=this.route.snapshot.paramMap.get('coursID');
       console.log(this.coursID);


      
        


       this.coursService.getCoursById(this.coursID).subscribe(data=>{
         this.coursModel=data;
       });*/
       this.documentService.getFilesByCours(this.coursModel.id).subscribe(data=>{
        this.files=data;
          console.log(this.files);
      });
      this.reunionService.getReunionsByCours(this.coursModel.id).subscribe(data=>{
        console.log(data);
        this.reunionModel=data;
      });
      this.enregService.getEnregistrementsByCours(this.coursModel.id).subscribe(data=>{
        this.enregistrements=data;
        console.log(data);
      });
    
   


  }
 /* addDocument() {    
    this.newDocument = {titre: "", piece_jointe:""};  
      this.documents.push(this.newDocument);  
      this.toastr.success('New row added successfully', 'New Row');  
      //console.log(this.dynamicArray);  
      return true;  
  }  */
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
    console.log(index);

    if(this.files[index].id){
      this.message.push("Le document "+this.files[index].file_name+" supprimé avec succés");

      this.documentService.supprimer(this.files[index].id).subscribe(data=>{
        console.log(data);
        this.files.splice(index,1);

      });
    }else{
      this.message.push("Le document "+this.files[index].name+" supprimé avec succés");
      this.files.splice(index,1);

     
     
    }
    //this.files.splice(index,1);
    
    console.log(this.files);
    //return true
  }
  valider_cours(){
    

    console.log(this.reunionModel);
    console.log(this.coursModel);
    this.coursModel.programme=this.programmeID;
    this.coursModel.partage_par=this.id;
    this.coursService.updateCours(this.coursModel.id,this.coursModel).subscribe(data=>{
      console.log(data);
      for (var file of this.files){
        console.log(file);
       
        if(!file.id){
          this.documentService.upload(file,this.coursModel.id).subscribe(data=>{
            console.log(data);
          });

        }
        
        
        
      }
      for(var enregistrement of this.enregistrements){
        if(enregistrement.id){
          this.enregService.updateEnregistrement(enregistrement.id,enregistrement).subscribe(data=>{
            console.log(data);
          });
        }else{
          enregistrement.cours=data.id;
          this.enregService.AjouterEnregistrement(enregistrement).subscribe(data=>{
            console.log(data);
          });
        }
      
       }
       if(this.reunionModel.cours){
         this.reunionService.updateReunion(this.coursModel.id,this.reunionModel).subscribe(data=>{
           console.log(data);
         });

       }else{
        this.reunionModel.cours=data.id;
        this.reunionService.AjouterReunion(this.reunionModel).subscribe(data=>{

          console.log(data);
        });
       }
     
       this.router.navigate(['/formateur/programmes/'+this.programmeID+'/cours/'+data.id]);

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


