import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inscriptions-formateur',
  templateUrl: './inscriptions-formateur.component.html',
  styleUrls: ['./inscriptions-formateur.component.scss']
})
export class InscriptionsFormateurComponent implements OnInit {
  title = 'angular-bootstrap-datepicker-tutorial';
cv:any;
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  @ViewChild('closebutton') closebutton:any;
  formationId:any;
  inscriptions:any;
  date_debut:any;
  date_fin:any;
 constructor(private route: ActivatedRoute,private router:Router,private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) { 
   this.formationId= this.route.snapshot.paramMap.get('programmeID');
   this.fromDate = calendar.getToday();
   this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);

 }

 ngOnInit(): void {

        this.inscriptions=[
         {'id':1, 'Date_debut':'20/4/2021','Date_fin':'20/5/2020'},
         {'id':2,'Date_debut':'20/4/2020','Date_fin':'20/5/2021'},
         {'id':3, 'Date_debut':'22/2/2021','Date_fin':'20/3/2021'},
         {'id':4, 'Date_debut':'24/1/2021','Date_fin':'20/9/2021'},
       ]
console.log(this.inscriptions);
 }
 demande(){
  //this.router.navigate(['/formateur/programmes/'+this.formationId+'/demande_inscription']);
  this.closebutton.nativeElement.click();

}
accept(){
  $("#acceptes-tab").removeClass("text-dark").addClass("text-light") 
  $("#enattente-tab").removeClass("text-light").addClass("text-dark") ;
  $("#refuses-tab").removeClass("text-light").addClass("text-dark");
}
enattente(){
  $("#acceptes-tab").removeClass("text-light").addClass("text-dark");
  $("#enattente-tab").removeClass("text-dark").addClass("text-light");
  $("#refuses-tab").removeClass("text-light").addClass("text-dark");

}
refuses(){
  $("#acceptes-tab").removeClass("text-light").addClass("text-dark");
  $("#enattente-tab").removeClass("text-light").addClass("text-dark");
  $("#refuses-tab").removeClass("text-dark").addClass("text-light");

}

}