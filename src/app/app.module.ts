import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID,NgModule } from '@angular/core';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

import { ReactiveFormsModule } from'@angular/forms';
import { FormsModule } from'@angular/forms';

import { AngularFireModule } from '@angular/fire';

import { environment } from 'src/environments/environment';
import { NgxPaginationModule } from 'ngx-pagination';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { RegistroComponent } from './registro/registro.component';







@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
    NavbarComponent,
    RegistroComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],

  providers: [{ provide: LOCALE_ID, useValue: 'es-cl' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
