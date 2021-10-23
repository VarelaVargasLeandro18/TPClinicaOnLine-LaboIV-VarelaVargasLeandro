import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnoRoutingModule } from './turno-routing.module';
import { TurnoComponent } from './turno.component';
import { AdminComponent } from './components/admin/admin.component';
import { PacienteComponent } from './components/paciente/paciente.component';
import { EspecialistaComponent } from './components/especialista/especialista.component';


@NgModule({
  declarations: [
    TurnoComponent,
    AdminComponent,
    PacienteComponent,
    EspecialistaComponent
  ],
  imports: [
    CommonModule,
    TurnoRoutingModule
  ]
})
export class TurnoModule { }
