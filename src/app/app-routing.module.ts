import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Modulos
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

import { RegistroComponent} from './registro/registro.component'


const routes: Routes = [

  // path: '/dashboard' PagesRouting
  // path: '/auth' AuthRouting
  // path: '/medicos' MedicosRouting
  // path: '/compras' ComprasRouting
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'registro' , component:RegistroComponent},
  { path: '**', component: NopagefoundComponent },
];



@NgModule({
  declarations:[
    RegistroComponent,
  ],
  imports: [
    RouterModule.forRoot( routes ),
    PagesRoutingModule,
    AuthRoutingModule,
    

  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
