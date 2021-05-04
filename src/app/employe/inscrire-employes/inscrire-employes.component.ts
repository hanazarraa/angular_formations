import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscrire-employes',
  templateUrl: './inscrire-employes.component.html',
  styleUrls: ['./inscrire-employes.component.scss']
})
export class InscrireEmployesComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  returntoList(){
    this.router.navigate(['/employé/programmes']);

  }

}
