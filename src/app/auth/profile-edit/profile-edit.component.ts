import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormateurService } from 'src/app/services/formateur.service';
import { ParticipantService } from 'src/app/services/participant.service';
import { ResponsableService } from 'src/app/services/responsable.service';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';
import {MatChipInputEvent} from '@angular/material/chips';
import { TagInputModule } from 'ngx-chips';

import 'rxjs/add/observable/of';
import { CompetenceService } from 'src/app/services/competence.service';
import { Competence } from 'src/app/models/competence';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  token:any;
  username:any;
  id:any;
  selectedFiles?: FileList;

  progressInfos: any[] = [];
  message: string[] = [];
  enregistrements:any;
  fileInfos?: Observable<any>;
  coursID:any;
  files:any=[];

  role:any;
  email:any;
  profile:any;
  user:any;
  profileID:any;
  competences:any;
  submitted:boolean=false;
  invalid = false;
  Success = true;
  successMessage = 'Profile Mis a jour avec succes';
  errorMessage="Erreur de mis a jour du Profile";
    constructor(private userService:UserService,private router:Router,private competenceService:CompetenceService,private route:ActivatedRoute,private responsableService:ResponsableService,private formateurService:FormateurService,private participantService:ParticipantService
      ) {
      this.token=localStorage.getItem('auth-token');
  
      console.log("token decoded",this.userService.updateData(this.token));
      this.username=userService.updateData(this.token).username;
      this.email=userService.updateData(this.token).email;
     this.id=this.userService.updateData(this.token).user_id;
     this.role=this.userService.updateData(this.token).role;
     this.profileID= this.route.snapshot.paramMap.get('id');
     }
  
    ngOnInit(): void {
      TagInputModule.withDefaults({
        tagInput: {
          placeholder: 'ajouter nouvelle competence',
          secondaryPlaceholder:'Your Custom PlaceHolder Here'
        }
      });
      this.userService.getUserByID(this.profileID).subscribe(data=>{
        this.user=data;
        if(this.user.role == 'R'){
          this.responsableService.getResponsableByID(this.profileID).subscribe(data=>{
            this.profile=data;
            console.log(data);
          });
        }else if(this.user.role =='F'){
         this.formateurService.getFormateur(this.profileID).subscribe(data=>{
           this.profile=data;
           console.log(data);
         });
        }else{
         this.participantService.getParticipantByID(this.profileID).subscribe(data=>{
           this.profile=data;
           console.log(data);
         });
        }
  
        
      });
      this.competenceService.getCompetenceByFormateur(this.profileID).subscribe(data=>{
        console.log(data);
        this.competences=data;
      });
      
    }
    selectedFile: File;
     url:any;
    onFileChanged(event) {
      this.selectedFile = event.target.files[0]
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
    public onSelect(item) {
      console.log('tag selected: value is ' + item);
  }
    Editer(){
      this.submitted=true;
      //console.log(this.competences);
             //console.log(uploadData);
        console.log(this.profile.competences);
    this.userService.updateUser(this.user.id,this.user,this.selectedFile  ).subscribe(data=>{
        console.log(data);
        if(this.user.role == 'R'){
          this.responsableService.updateResp(this.user.id,this.profile).subscribe(data=>{
            console.log(data);
            this.Success=true;
            this.invalid=false;
          },(error=>{
            this.invalid=true;
            this.Success=false;
          }));
        }else if(this.user.role =='F'){
          for(var comp of this.profile.competences){
              
            this.competenceService.getCompetenceByTitre(comp ).subscribe(data=>{
              console.log(data);
             
               if(data.length == 0){
                console.log(data.length);
                let competence=new Competence();
                competence.titre=comp;
                  competence.formateurs=[];
                competence.formateurs.push(this.profileID);
                this.competenceService.AjouterCompetence(competence).subscribe(data=>{
                  console.log(competence);
                  this.formateurService.updateFormateur1(this.profileID,this.profile,this.files[0]).subscribe(data=>{
                    console.log(data);
                    this.Success=true;
                    this.invalid=false;
                  },(error=>{
                    this.Success=false;
                    this.invalid=true;

                  }));
                  //this.formateurService.updateFormateur(this.profileID,this.profile).subscribe(data=>{console.log(data)});

                });
              }else{
                console.log(data[0]);
                console.log(data[0].formateurs.indexOf(this.profile));
                data[0].formateurs.push(this.profileID);
                console.log(data[0]);
                //data[0].formateurs=this.profileID;
                this.competenceService.updateCompetence(data[0].id,data[0]).subscribe(data=>{
                  this.formateurService.updateFormateur1(this.profileID,this.profile,this.files[0]).subscribe(data=>{
                    console.log(data);
                    this.Success=true;
                    this.invalid=false;
                  },(error=>{
                    this.Success=false;
                    this.invalid=true;
                  }));
                });
                 // this.formateurService.updateFormateur(this.profileID,this.profile).subscribe(data=>{console.log(data)});
               
                 
              }
            }); 

          }
      
        }
      });
      console.log(this.user);
      console.log(this.profile);
     /* this.userService.updateUser(this.user.id,this.user).subscribe(data=>{
        console.log(data);
      
      });*/
    }
    
selectFiles(event): void {
 // console.log(i);
  this.message = [];
  this.progressInfos = [];
  this.selectedFiles = event.target.files;
  console.log(this.selectedFiles[0]);
 
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
    console.log(this.selectedFiles);
    for (let i = 0; i < this.selectedFiles.length; i++) {
       this.uploadFile(i, this.selectedFiles[i]);
       
  }
}
}
uploadFile(idx: number, file: File): void {
  this.progressInfos[idx] = { value: 0, fileName: file.name };

  if (file) {
    console.log(file.name);
    
    this.files.push(file);
    console.log(this.files);
    const msg = 'Le fichier ' + file.name+" est importé avec succés";
    this.message.push(msg);
   // this.currentTravail.consignes[idx].remises.push(file);
    //console.log(this.traveaux[this.modal.index]);
  //   this.consignes.push(file);
     
  }
}
   
    retour(){
      this.router.navigateByUrl("/profile/"+this.profile.user);
    }
}
