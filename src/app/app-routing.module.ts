import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { RegistroComponent } from './components/registro/registro.component';
import { SolicitarTurnoComponent } from './components/solicitar-turno/solicitar-turno.component';
import { StatsComponent } from './components/stats/stats.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AdministradorGuard } from './guards/administrador.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: 'log-in', component: LoginComponent, data: { animation: 'log-in-page' } },
  { path: 'sign-up', component: RegistroComponent, data: { animation: 'sign-up-page' }},
  { path: 'users', component: UsuariosComponent, canActivate: [RoleGuard], data: { razon: ['0', '1'] } },
  { path: 'misTurnos', loadChildren: () => import('./subModules/turno/turno.module').then(m => m.TurnoModule) },
  { path: 'solicitarTurno', component: SolicitarTurnoComponent, canActivate: [RoleGuard], data: { razon: [ '0', '2' ], animation: 'solicitarTurno-page' } },
  { path: 'miPerfil', component: MiPerfilComponent, canActivate: [RoleGuard], data: { razon: [ '0', '1', '2' ], animation: 'miPerfil-page' } },
  {path: 'stats', component: StatsComponent, canActivate: [AdministradorGuard] },
  { path: '**', pathMatch: 'full', redirectTo:'/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
