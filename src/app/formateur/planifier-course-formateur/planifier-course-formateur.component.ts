import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-planifier-course-formateur',
  templateUrl: './planifier-course-formateur.component.html',
  styleUrls: ['./planifier-course-formateur.component.scss']
})
export class PlanifierCourseFormateurComponent implements OnInit {
 date_exacte:any;
  constructor() { }
  public month: number = new Date().getMonth();
 
  public fullYear: number = new Date().getFullYear();
 
  public date: number = new Date().getDate();
 
  public heure_debut: Date = new Date(this.fullYear, this.month , this.date, 10, 0, 0);
 
  public minValue: Date = new Date(this.fullYear, this.month , this.date, 7, 0, 0);
  public heure_fin: Date = new Date(this.fullYear, this.month , this.date, 10, 0, 0);

  public maxValue: Date = new Date(this.fullYear, this.month, this.date, 20, 0 ,0);
 

  ngOnInit(): void {
  }

}
