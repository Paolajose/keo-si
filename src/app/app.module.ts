import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID,NgModule } from '@angular/core';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { SharedModule} from './shared/shared.module'
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

import { ReactiveFormsModule } from'@angular/forms';
import { FormsModule } from'@angular/forms';

import { AngularFireModule } from '@angular/fire';

import { environment } from 'src/environments/environment';
import { NgxPaginationModule } from 'ngx-pagination';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';









@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    SharedModule,
    AuthModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    SweetAlert2Module.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
  ],

  providers: [{ provide: LOCALE_ID, useValue: 'es-cl' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
