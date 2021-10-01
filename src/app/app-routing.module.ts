import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { EventosComponent } from './eventos/eventos.component';
import { AuthGuardService } from './service/auth-guard.service';
import { EventoComponent } from './eventos/evento/evento.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'eventos', component: EventosComponent, canActivate:[AuthGuardService] },
  { path: 'evento', component: EventoComponent, canActivate:[AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
