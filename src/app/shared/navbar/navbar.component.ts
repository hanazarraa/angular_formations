import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenstorageService } from 'src/app/services/tokenstorage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn:boolean;
username?:string;
  constructor(private userService:UserService,private router:Router,private tokenStorageService:TokenstorageService) { }

  ngOnInit(): void {
  console.log(this.userService.getToken());
    }
  
  }


