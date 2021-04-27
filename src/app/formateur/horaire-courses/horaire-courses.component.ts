import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horaire-courses',
  templateUrl: './horaire-courses.component.html',
  styleUrls: ['./horaire-courses.component.scss']
})
export class HoraireCoursesComponent implements OnInit {
   courses:any;
   date_exacte:any;
   jour:any;
    public month: number = new Date().getMonth();
 
   public fullYear: number = new Date().getFullYear();
  
   public date: number = new Date().getDate();
  
   public heure_debut: Date = new Date(this.fullYear, this.month , this.date, 10, 0, 0);
  
   public minValue: Date = new Date(this.fullYear, this.month , this.date, 7, 0, 0);
   public heure_fin: Date = new Date(this.fullYear, this.month , this.date, 10, 0, 0);
 
   public maxValue: Date = new Date(this.fullYear, this.month, this.date, 20, 0 ,0);
  
  constructor() { }

  ngOnInit(): void {
    this.courses=[
      {"id":1,"titre":"Introduction","date_exacte":"19/04/2021","heure_debut":"10:00","heure_fin":"12:00"},
      {"id":2,"titre":"Cours 1","date_exacte":"20/04/2021","heure_debut":"9:00","heure_fin":"15:00"},
      {"id":3,"titre":"Cours 2","date_exacte":"16/04/2021","heure_debut":"11:00","heure_fin":"17:00"}
    ]
  }
  setValue(value:any){
    console.log(value);

  }
}
