import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AdministradorGuard } from './guards/administrador.guard';

const routes: Routes = [
  { path: 'log-in', component: LoginComponent },
  { path: 'sign-up', component: RegistroComponent},
  { path: 'users', component: UsuariosComponent, canActivate: [AdministradorGuard] },
  { path: '**', pathMatch: 'full', redirectTo:'/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
