import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddFormationComponent } from './programmes/add-formation/add-formation.component';
import { ConsulterFormationComponent } from './programmes/consulter-formation/consulter-formation.component';
import { FormationsComponent } from './programmes/formations/formations.component';
import { InscriptionsEmployesComponent } from './programmes/inscriptions-employes/inscriptions-employes.component';
import { InscriptionsComponent } from './programmes/inscriptions/inscriptions.component';
import { ProgrammeComponent } from './programmes/programme/programme.component';

const routes: Routes = [
  
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'programmes',component:ProgrammeComponent,
 
    children:[
      {path :'' , component:FormationsComponent},
      {path:'add',component:AddFormationComponent},
      {path:':programmeID',component:ConsulterFormationComponent},
       {path:':programmeID/inscriptions',component:InscriptionsComponent},
       {path:':programmeID/inscriptions/:inscriptionID',component:InscriptionsEmployesComponent}
    ]
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
