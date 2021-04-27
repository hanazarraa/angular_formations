import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-planifier-program-formateur',
  templateUrl: './planifier-program-formateur.component.html',
  styleUrls: ['./planifier-program-formateur.component.scss']
})
export class PlanifierProgramFormateurComponent implements OnInit {
  date_debut:any;
  date_fin:any;
  programmeId:any;
  constructor(private router:Router,private route:ActivatedRoute) {
    this.programmeId= this.route.snapshot.paramMap.get('programmeID');
    console.log(this.programmeId);

   }

  ngOnInit(): void {
  }
  valider(){
    this.router.navigate(['/formateur/programmes/'+this.programmeId+'/inscriptions']);
  }

}
