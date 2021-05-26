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
//import {ProgrammeFormateurComponent} from  './formateur/programme-formateur/programme-formateur.component';
 import { from } from 'rxjs';
import { ProgrammeFormateurComponent } from './formateur/programme-formateur/programme-formateur.component';
import { InscriptionsFormateurComponent } from './formateur/inscriptions-formateur/inscriptions-formateur.component';
 import { PlanifierCourseFormateurComponent } from './formateur/planifier-course-formateur/planifier-course-formateur.component';
import { PlanifierProgramFormateurComponent } from './formateur/planifier-program-formateur/planifier-program-formateur.component';
import { PlanifierCourseHebdomodaireComponent } from './formateur/planifier-course-hebdomodaire/planifier-course-hebdomodaire.component';
import { FormationFormateurComponent } from './formateur/formation-formateur/formation-formateur.component';
import { CoursesFormateurComponent } from './formateur/courses-formateur/courses-formateur.component';
import { HoraireCoursesComponent } from './formateur/horaire-courses/horaire-courses.component';
import { ConsulterCoursFormateurComponent } from './formateur/consulter-cours-formateur/consulter-cours-formateur.component';
import { CreerCoursFormateurComponent } from './formateur/creer-cours-formateur/creer-cours-formateur.component';
import { ProgrammeEmployesComponent } from './employe/programme-employes/programme-employes.component';
import { FormationsEmployesComponent } from './employe/formations-employes/formations-employes.component';
import { InscrireEmployesComponent } from './employe/inscrire-employes/inscrire-employes.component';
import { CreerCoursResponsableComponent } from './programmes/creer-cours-responsable/creer-cours-responsable.component';
import { ConsulterCoursResponsableComponent } from './programmes/consulter-cours-responsable/consulter-cours-responsable.component';
import { ConsulterFormationFormateurComponent } from './formateur/consulter-formation-formateur/consulter-formation-formateur.component';
import { ConsulterFormationEmployeComponent } from './employe/consulter-formation-employe/consulter-formation-employe.component';
import { ConsulterCoursEmployeComponent } from './employe/consulter-cours-employe/consulter-cours-employe.component';
import { AuthorizationGuard } from './authorization.guard';
import { AccessDeniedComponent } from './auth/access-denied/access-denied.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { AddFormationResponsableComponent } from './programmes/add-formation-responsable/add-formation-responsable.component';
const routes: Routes = [
  
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'access-denied',component:AccessDeniedComponent},
  {path:'logout',component:LogoutComponent},
  {path:'responsable',component:ProgrammeComponent, data: {
    allowedRoles: ['R']

  },
  canActivate: [AuthorizationGuard],
 
    children:[
      {path :'programmes' , component:FormationsComponent},
      {path:'programmes/add',component:AddFormationResponsableComponent},
      {path:'programmes/:programmeID',component:ConsulterFormationComponent},
       {path:'programmes/:programmeID/inscriptions',component:InscriptionsComponent},
       {path:'programmes/:programmeID/inscriptions/:inscriptionID',component:InscriptionsEmployesComponent},
       {path:'programmes/:programmeID/cours/ajouter',component:CreerCoursResponsableComponent},
       {path:'programmes/:programmeID/cours/:coursID',component:ConsulterCoursResponsableComponent}

      ]
 },
  {path:'formateur/programmes',component:ProgrammeFormateurComponent, data: {
    allowedRoles: ['F']

  },
  canActivate: [AuthorizationGuard],
   children:[
     {path:'',component:FormationFormateurComponent},
     {path:':programmeID',component:ConsulterFormationFormateurComponent},
     {path:':programmeID/demande_inscription',component:PlanifierProgramFormateurComponent},
     {path:':programmeID/inscriptions',component:InscriptionsFormateurComponent},
     {path:':programmeID/cours',component:CoursesFormateurComponent},
     {path:':programmeID/cours/ajouter',component:CreerCoursFormateurComponent},

     {path:':programmeID/cours/horaire',component:HoraireCoursesComponent},
     {path:':programmeID/cours/:coursID',component:ConsulterCoursFormateurComponent},

     {path:':programmeID/cours/:coursID/planifier',component:PlanifierCourseFormateurComponent},
     {path:':programmeID/cours/:coursID/planifier_hebdo',component:PlanifierCourseHebdomodaireComponent}


   ]

 },
 {path:'employé/programmes',component:ProgrammeEmployesComponent,
   children:[
     {path:'',component:FormationsEmployesComponent},
     {path:':programmeID',component:ConsulterFormationEmployeComponent},
     {path:':programmeID/cours/:coursID',component:ConsulterCoursEmployeComponent},

     {path:':programmeID/inscriptions',component:InscrireEmployesComponent}
   ]   
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
