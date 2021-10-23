import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectByRoleGuard } from 'src/app/guards/redirect-by-role.guard';
import { RoleGuard } from 'src/app/guards/role.guard';
import { AdminComponent } from './components/admin/admin.component';
import { EspecialistaComponent } from './components/especialista/especialista.component';
import { PacienteComponent } from './components/paciente/paciente.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent, data: { razon: "0" }, canActivate: [RoleGuard] },
  { path: 'especialista', component: EspecialistaComponent, data: { razon: "1" }, canActivate: [RoleGuard] },
  { path: 'paciente', component: PacienteComponent, data: { razon: "2" }, canActivate: [RoleGuard] },
  { path: '**', canActivate: [RedirectByRoleGuard], data: { redirects: [ { razon: "0", route: "admin" }, { razon: "1", route: "especialista" }, { razon: "2", route: "paciente" } ] } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnoRoutingModule { }
