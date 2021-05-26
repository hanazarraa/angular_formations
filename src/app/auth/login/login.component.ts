import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { TokenstorageService } from 'src/app/services/tokenstorage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
userModel=new User();
user:any;
users : User[]=new Array<User>();
data:any;
 form:FormGroup;
submitted:boolean;
role:string;
errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  isLoggedIn = false;
  isLoginFailed = false;

   roles: string[] = [];
  constructor(private router:Router,private userService:UserService, private tokenStorage: TokenstorageService,private authService:AuthService) { }

  ngOnInit(): void {
  
       this.user = {
        username: '',
        password: ''
      }; 
    
  }
  login() {
    console.log(localStorage);
    console.log(this.userModel);
 this.userService.login(this.userModel).subscribe((result:any)=> {
  console.log(result);
  localStorage.setItem('auth-token',result.token);
  this.invalidLogin = false;
  this.loginSuccess = true;
  this.successMessage = 'Login Successful.';
  
  this.role=this.userService.updateData(result.token).role;
  console.log(this.role);
  if(this.role =="R"){
    this.router.navigate(['/responsable/programmes']);
  }else if(this.role=="F"){
    this.router.navigate(['/formateur/programmes']);
  }else{
    this.router.navigate(['/employé/programmes']);
  }
 });
    //this.router.navigate(['/programmes']);
   // this.userService.logout();
  /* console.log(localStorage.getItem('auth-token'))
   if(localStorage.getItem('auth-token')!=null){
    this.invalidLogin = false;
    this.loginSuccess = true;
    this.successMessage = 'Login Successful.';
    console.log(this.userService.updateData(localStorage.getItem('auth-token')).role);
   if(this.userService.updateData(localStorage.getItem('auth-token')).role=='R'){
     this.router.navigate(['/responsable/programmes']);

   }
   }else{
    this.invalidLogin = true;
   
    this.loginSuccess = false;

   }*/
  }
 
  refreshToken() {
    this.userService.refreshToken();
  }
 
  logout() {
    this.userService.logout();
  }
  save(){
    console.log(this.userModel);

  }
 /* onSubmit(form:FormGroup) {
    this.submitted = true;
    this.save();    
  }*/
 
   handleLogin(fom:FormGroup) {
     console.log(fom);
    console.log(this.userModel);
  /*this.userService.authenticationService(this.userModel).subscribe((result:any)=> {
      console.log(result);
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      //this.userService.registerSuccessfulLogin(this.userModel.username,this.userModel.password);
       
       localStorage.setItem('user', result.username);
       console.log(localStorage.getItem("user"));
       console.log(this.userService.getLoggedInUserName());
       this.router.navigate(['/programmes']);
    }, (error:any) => {
       this.invalidLogin = true;
       console.log(error);
       this.loginSuccess = false;
    });*/
    
    }
    onSubmit(): void {
       this.authService.login(this.userModel.username, this.userModel.password).subscribe(
        data  => {
          console.log(data);
          this.invalidLogin = false;
          this.loginSuccess = true;
          this.successMessage = 'Login Successful.';
        
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(data);
  
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.router.navigate(['/responsable/programmes']);
     //     this.roles = this.tokenStorage.getUser(this.tokenStorage.getToken()).roles;
       //   this.reloadPage();
        },
        err => {
         // this.errorMessage = err.error.message;
          this.isLoginFailed = true;
          this.invalidLogin = true;
         // console.log(error);
          this.loginSuccess = false;
       
        }
      );
    }
  
    reloadPage(): void {
      window.location.reload();
    }
}
