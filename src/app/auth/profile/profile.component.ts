import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormateurService } from 'src/app/services/formateur.service';
import { ParticipantService } from 'src/app/services/participant.service';
import { ResponsableService } from 'src/app/services/responsable.service';
import { UserService } from 'src/app/services/user.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
token:any;
username:any;
id:any;
role:any;
email:any;
profile:any;
user:any;
profileID:any;
  constructor(private location:Location,private userService:UserService,private router:Router,private route:ActivatedRoute,private responsableService:ResponsableService,private formateurService:FormateurService,private participantService:ParticipantService
    ) {
    this.token=localStorage.getItem('auth-token');

    console.log("token decoded",this.userService.updateData(this.token));
    this.username=userService.updateData(this.token).username;
    this.email=userService.updateData(this.token).email;
   this.id=this.userService.updateData(this.token).user_id;
   this.role=this.userService.updateData(this.token).role;
   this.profileID= this.route.snapshot.paramMap.get('id');
   }
   goBack() {
    this.location.back();
  }
  ngOnInit(): void {
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
    
    
  }
editerProfile(){
  this.router.navigateByUrl('/profile/'+this.id+'/edit');
}
}
