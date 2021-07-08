import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { MatExpansionModule } from '@angular/material/expansion';
 import {DragDropModule} from '@angular/cdk/drag-drop';

import {MatTreeModule} from '@angular/material/tree';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import { SliderComponent } from './slider/slider.component';
import { AngularImgComponent } from './angular-img/angular-img.component';
import { HoraireCoursesComponent } from './formateur/horaire-courses/horaire-courses.component';
import { ConsulterCoursFormateurComponent } from './formateur/consulter-cours-formateur/consulter-cours-formateur.component';
import { CreerCoursFormateurComponent } from './formateur/creer-cours-formateur/creer-cours-formateur.component';
import { ProgrammeEmployesComponent } from './employe/programme-employes/programme-employes.component';
import { FormationsEmployesComponent } from './employe/formations-employes/formations-employes.component';
import { InscrireEmployesComponent } from './employe/inscrire-employes/inscrire-employes.component';
import { CoursesProgramResponsableComponent } from './programmes/courses-program-responsable/courses-program-responsable.component';
import { CreerCoursResponsableComponent } from './programmes/creer-cours-responsable/creer-cours-responsable.component';
import { ConsulterCoursResponsableComponent } from './programmes/consulter-cours-responsable/consulter-cours-responsable.component';
import { CoursesProgramFormateurComponent } from './formateur/courses-program-formateur/courses-program-formateur.component';
import { ConsulterFormationFormateurComponent } from './formateur/consulter-formation-formateur/consulter-formation-formateur.component';
import { CoursesProgramEmployeComponent } from './employe/courses-program-employe/courses-program-employe.component';
import { ConsulterFormationEmployeComponent } from './employe/consulter-formation-employe/consulter-formation-employe.component';
import { ConsulterCoursEmployeComponent } from './employe/consulter-cours-employe/consulter-cours-employe.component';
import { RegisterComponent } from './auth/register/register.component';
import { TokenInterceptor } from './auth/TokenInterceptor';
import { JwtInterceptor } from './auth/JwtInterceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthorizationService } from './services/authorization.service';
import { AccessDeniedComponent } from './auth/access-denied/access-denied.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AddFormationResponsableComponent } from './programmes/add-formation-responsable/add-formation-responsable.component';
 import {DurationPickerModule}  from 'ngx-duration-picker';
import { ConsulterFormationResponsableComponent } from './programmes/consulter-formation-responsable/consulter-formation-responsable.component';
import { SidebarFormateurComponent } from './formateur/sidebar-formateur/sidebar-formateur.component';
import { MesProgrammesFormateurComponent } from './formateur/mes-programmes-formateur/mes-programmes-formateur.component';
import { MyprogComponent } from './formateur/myprog/myprog.component';
import { ViewFormationFormateurComponent } from './formateur/view-formation-formateur/view-formation-formateur.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { SidebarEmployeComponent } from './employe/sidebar-employe/sidebar-employe.component';
import { MesprogParticipantComponent } from './employe/mesprog-participant/mesprog-participant.component';
import { ViewFormationEmployeComponent } from './employe/view-formation-employe/view-formation-employe.component';
import { TagInputModule } from 'ngx-chips';
import { ProfileComponent } from './auth/profile/profile.component';
import { ProfileEditComponent } from './auth/profile-edit/profile-edit.component';

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
   ProgrammeEmployesComponent,
   FormationsEmployesComponent,
   InscrireEmployesComponent,
   CoursesProgramResponsableComponent,
   CreerCoursResponsableComponent,
   ConsulterCoursResponsableComponent,
   CoursesProgramFormateurComponent,
   ConsulterFormationFormateurComponent,
   CoursesProgramEmployeComponent,
   ConsulterFormationEmployeComponent,
   ConsulterCoursEmployeComponent,
   RegisterComponent,
   AccessDeniedComponent,
   LogoutComponent,
   AddFormationResponsableComponent,
   ConsulterFormationResponsableComponent,
   SidebarFormateurComponent,
   MesProgrammesFormateurComponent,
   MyprogComponent,
   ViewFormationFormateurComponent,
   SearchFilterPipe,
   SidebarEmployeComponent,
   MesprogParticipantComponent,
   ViewFormationEmployeComponent,
   ProfileComponent,
   ProfileEditComponent,
 
    //AccordionModule
  ],
  imports: [
    BsDatepickerModule.forRoot(),  
    TagInputModule,  

    NgSelectModule,
    MatExpansionModule,
    DragDropModule,
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
     DurationPickerModule,

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
    ReactiveFormsModule,   
  // TimepickerModule.forRoot(),
  // FullCalendarModule,
   //   ,// register FullCalendar with you app
    ToastrModule.forRoot(), BrowserAnimationsModule, 
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return sessionStorage.getItem('auth-token');
        },
       // whitelistedDomains: ['budgetivity.com', 'budgetivity.local']
      }
      // jwtOptionsProvider: {
      //   provide: JWT_OPTIONS,
      //   useFactory: jwtOptionsFactory,
      //   deps: [TokenService]
      // }
    }),
  
    
      
     
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
     },
     AuthorizationService
    ],
   
  bootstrap: [AppComponent]
})
export class AppModule { }
