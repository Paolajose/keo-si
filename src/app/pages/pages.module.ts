import { LOCALE_ID,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from'@angular/forms';
import { FormsModule } from'@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';



import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    
  ],
  imports: [ 
    CommonModule,
    SharedModule,
    NgbModule,
    SweetAlert2Module.forRoot(),
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule
  ],

  providers: [
    // { provide: LOCALE_ID, useValue: 'es-cl' }
  ],
})
export class PagesModule {}
