import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DemandeFormateurService } from 'src/app/services/demande-formateur.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-myprog',
  templateUrl: './myprog.component.html',
  styleUrls: ['./myprog.component.scss'],
  providers: [DatePipe]

})
export class MyprogComponent implements OnInit {
token:any;
id:any;
date=new Date();
  myDate:any;
  demandesA:any;
  query: string;
  public searchFilter: any = '';


  constructor(private userService:UserService ,private datePipe:DatePipe,private demande_formateurService:DemandeFormateurService) { 
    this.token=localStorage.getItem('auth-token');

     console.log(this.userService.updateData(this.token).user_id);
     this.id=this.userService.updateData(this.token).user_id
         console.log(this.id);
         this.myDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
        console.log(this.myDate);

  }

  ngOnInit(): void {
    this.demande_formateurService.getDemandesByStatutFormateurDate("A",this.id,this.myDate).subscribe(data=>{
      console.log(data);
      this.demandesA=data;
    });
  }

}
