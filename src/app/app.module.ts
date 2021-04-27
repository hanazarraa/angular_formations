import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { LoginComponent } from './auth/login/login.component';
import { FormationsComponent } from './programmes/formations/formations.component';
import { ProgrammeComponent } from './programmes/programme/programme.component';
import { AddFormationComponent } from './programmes/add-formation/add-formation.component';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSelectModule } from 'ngx-select-ex';
import { ConsulterFormationComponent } from './programmes/consulter-formation/consulter-formation.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { from } from 'rxjs';
import { InscriptionsComponent } from './programmes/inscriptions/inscriptions.component';
import { InscriptionsEmployesComponent } from './programmes/inscriptions-employes/inscriptions-employes.component';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { ProgrammeFormateurComponent } from './formateur/programme-formateur/programme-formateur.component';
import {MatFormFieldModule} from  '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {  MatDatepickerModule} from '@angular/material/datepicker';
import { PlanifierCourseFormateurComponent } from './formateur/planifier-course-formateur/planifier-course-formateur.component';
import { PlanifierProgramFormateurComponent } from './formateur/planifier-program-formateur/planifier-program-formateur.component';
import { TimePicker, TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { PlanifierCourseHebdomodaireComponent } from './formateur/planifier-course-hebdomodaire/planifier-course-hebdomodaire.component';
import { FormationFormateurComponent } from './formateur/formation-formateur/formation-formateur.component';
import { CoursesFormateurComponent } from './formateur/courses-formateur/courses-formateur.component';
import {InscriptionsFormateurComponent} from './formateur/inscriptions-formateur/inscriptions-formateur.component';
 
import {MatTreeModule} from '@angular/material/tree';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import { SliderComponent } from './slider/slider.component';
import { AngularImgComponent } from './angular-img/angular-img.component';
import { HoraireCoursesComponent } from './formateur/horaire-courses/horaire-courses.component';
import { ConsulterCoursFormateurComponent } from './formateur/consulter-cours-formateur/consulter-cours-formateur.component';
import { CreerCoursFormateurComponent } from './formateur/creer-cours-formateur/creer-cours-formateur.component';
 @NgModule({
  declarations: [
    AppComponent,
     NavbarComponent,
    SidebarComponent, 
    LoginComponent,
   FormationsComponent,
   ProgrammeComponent,
   AddFormationComponent,
   ConsulterFormationComponent,
   InscriptionsComponent,
   InscriptionsEmployesComponent,
   ProgrammeFormateurComponent,
   PlanifierCourseFormateurComponent,
   PlanifierProgramFormateurComponent,
   PlanifierCourseHebdomodaireComponent,
   FormationFormateurComponent,
   CoursesFormateurComponent,
   InscriptionsFormateurComponent,
   SliderComponent,
   AngularImgComponent,
   HoraireCoursesComponent,
   ConsulterCoursFormateurComponent,
   CreerCoursFormateurComponent,

    //AccordionModule
  ],
  imports: [
    MatInputModule,
     MatNativeDateModule,
    MatFormFieldModule,
     CommonModule,
    TimePickerModule,
     MatIconModule,
    MatDatepickerModule,
      MatTabsModule,
    BrowserModule,
    AppRoutingModule,
     NgxSelectModule,
    // NgxMatSelectSearchModule,
    HttpClientModule,
    AccordionModule,
    //NgbDate,
    BrowserModule,
     
   // BsDatepickerModule.forRoot(),
    // MatIconModule,
   // AgGridModule.withComponents([]),
     NgbModule,
    FormsModule,   
  // TimepickerModule.forRoot(),
  // FullCalendarModule,
   //   ,// register FullCalendar with you app
    ToastrModule.forRoot(), BrowserAnimationsModule, 
  // TreeViewModule,
  
    
      
     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
