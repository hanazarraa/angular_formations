import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.scss']
})
export class FormationsComponent implements OnInit {

  formations:any;
  constructor(  private router:Router) {
     
  }
  ngOnInit(){
     
    
     this.formations=[{
      "id":11,
      "titre":"Programme IC Canada",
      "sousProg":[{
      "id" :1,
      "titre":"Hancho",
      "cours":[
        {
          "id":1,
          "titre":"introduction"
        },
        {
          "id":2,
          "titre":"cours 1"
        }
      ]
    },
  {
    "id":2,
    "titre":"BSC",
    "cours":[]
  },{
    "id":3,
    "titre":"BPR",
    "cours":[]
  }]
  
  }
    ];
  }
   
  Ajouter(){
     this.router.navigate(['programmes/add']);
 }
}
