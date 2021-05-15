import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Formateur } from 'src/app/models/formateur';
import { Participant } from 'src/app/models/participant';
import { Responsable } from 'src/app/models/responsable';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userModel=new User();
  users : User[]=new Array<User>();
  first_name:string;
  responsableModel=new Responsable();
  formateurModel=new Formateur();
  form:FormGroup;
  submitted:boolean=false;
  loading:boolean;
  participantModel=new Participant();
    constructor(private router:Router,private userService:UserService,private fb :FormBuilder ) { 
      this.form = this.fb.group({
        first_name: ['', Validators.required ]
     });
    }
  
    ngOnInit(): void {
      /*this.form = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });*/
    }
 
    save(){
      console.log(this.userModel);
  
    }
    onSubmit(form:FormGroup) {
      this.submitted = true;
      this.save();    
    }
   
     register(fom:FormGroup) {
       this.submitted=true;
       
       console.log(fom);
      console.log(this.userModel);
      this.userService.registerUser(this.userModel).subscribe((result:any)=> {
        //user tesnaa 
        console.log(result);
        //affichit resultat mtaa user created succesfully
        console.log(this.userModel.role);
        //testit aa role 
        if(this.userModel.role=='F'){
          //houni affectit user l formateur  result haka {message:"registrated user succesfullu","user":"1"}
          
          this.formateurModel.user=result["user"];
          console.log(this.formateurModel)
          this.userService.registerFormateur(this.formateurModel).subscribe((result:any)=>{
            //lena tesnaa formateur mrigel
            console.log(result);
            this.router.navigate(['/login']);
          },(error:any)=>{
            //houni kn fama err  f register formateur 
          //  this.alertService.error(error);
            this.loading = false;
      
            console.log(error);
          });

        }
        if(this.userModel.role=='P'){
          this.participantModel.user=result["user"];
          console.log(this.participantModel)
          this.userService.registerParticipant(this.participantModel).subscribe((result:any)=>{
            console.log(result);
            this.router.navigate(['/login']);
          },(error:any)=>{
          //  this.alertService.error(error);
            this.loading = false;
      
            console.log(error);
          });

        }
        /*if(this.userModel.role=='R'){
          this.responsableModel.user=result["user"];
          console.log(this.responsableModel)
          this.userService.registerResponsable(this.responsableModel).subscribe((result:any)=>{
            console.log(result);
          },(error:any)=>{
            console.log(error);
          })
        }*/
      
         //localStorage.setItem('user', JSON.stringify({login : result.user.username}));
         //this.router.navigate(['/programmes']);
      }, (error:any) => {
       // this.invalidLogin = true;
         console.log(error);
        //this.loginSuccess = false;
      });
      
  
      console.log(this.userModel.username);
     } 

     changeRole(e:any){
       console.log(e.target.value);
       if(e.target.value =='F'){
         $("#poste_formateur_div").css({'display':'block'});
         $("#specialite_formateur_div").css({'display':'block'});
         $("#entreprise_formateur_div").css({'display':'block'});
       }else{
         $("#poste_formateur_div").css({'display':'none'});
         $("#specialite_formateur_div").css({'display':'none'});
         $("#entreprise_formateur_div").css({'display':'none'});
       }
       if(e.target.value =='P'){
        $("#poste_participant_div").css({'display':'block'});
         $("#entreprise_participant_div").css({'display':'block'});
      }else{
        $("#poste_participant_div").css({'display':'none'});
         $("#entreprise_participant_div").css({'display':'none'});
      }
     
     }
  }
  