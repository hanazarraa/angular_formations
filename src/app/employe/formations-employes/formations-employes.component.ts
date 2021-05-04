import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Programme } from 'src/app/models/programme';
import { ProgrammeService } from 'src/app/services/programme.service';

@Component({
  selector: 'app-formations-employes',
  templateUrl: './formations-employes.component.html',
  styleUrls: ['./formations-employes.component.scss']
})
export class FormationsEmployesComponent implements OnInit {
  programmes : Programme[]=new Array<Programme>();
  formations:any;
  formationId:any;
  constructor(  private router:Router,private programmeService:ProgrammeService,private route: ActivatedRoute) {
    this.formationId= this.route.snapshot.paramMap.get('programmeID');

  }

  ngOnInit(): void {
    this.programmeService.getProgrammes()
    .subscribe(
      (programmes:Programme[])=> 
       { console.log(programmes);
         this.programmes=programmes}
       );
  }
}
