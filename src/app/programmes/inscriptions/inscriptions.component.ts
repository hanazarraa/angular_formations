import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.scss']
})
export class InscriptionsComponent implements OnInit {
  @ViewChild('closebutton') closebutton:any;
  formationId:any;
  inscriptions:any;
 constructor(private route: ActivatedRoute,private router:Router) { 
   this.formationId= this.route.snapshot.paramMap.get('programmeID');
   console.log(this.formationId);
 }

 ngOnInit(): void {

        this.inscriptions=[
         {'id':1, 'formateur':'Personne 1','Date_debut':'20/4/2021','Date_fin':'20/5/2020','statut':'réfuse'},
         {'id':2, 'formateur':'Personne 2','Date_debut':'20/4/2020','Date_fin':'20/5/2021','statut':'En attente'},
         {'id':3, 'formateur':'Personne 3','Date_debut':'22/2/2021','Date_fin':'20/3/2021','statut':'Accepté'},
         {'id':4, 'formateur':'Personne 4','Date_debut':'24/1/2021','Date_fin':'20/9/2021','statut':'conditionnel'},
       ]
console.log(this.inscriptions);
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
ConsulterProg(){
  this.router.navigate(["/responsable/programmes/"+this.formationId]);
}
}
