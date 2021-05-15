import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) {
    this.userService.logout();
    this.router.navigate(['/login']);
    console.log(localStorage);
   }

  ngOnInit(): void {
  }

}
