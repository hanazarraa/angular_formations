import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
   InscriptionsEmployesComponent
    //AccordionModule
  ],
  imports: [
    MatTabsModule,
    BrowserModule,
    AppRoutingModule,
     NgxSelectModule,
    // NgxMatSelectSearchModule,
    HttpClientModule,
    AccordionModule,
    
    BrowserModule,
     
   // BsDatepickerModule.forRoot(),
    // MatIconModule,
   // AgGridModule.withComponents([]),
     NgbModule,
    FormsModule,   
  // TimepickerModule.forRoot(),
  // FullCalendarModule,
  // BrowserAnimationsModule ,// register FullCalendar with you app
    ToastrModule.forRoot(), BrowserAnimationsModule, 
  // TreeViewModule,
  
    
      
     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
