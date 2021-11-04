import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnoRoutingModule } from './turno-routing.module';
import { TurnoComponent } from './turno.component';
import { AdminComponent } from './components/admin/admin.component';
import { PacienteComponent } from './components/paciente/paciente.component';
import { EspecialistaComponent } from './components/especialista/especialista.component';
import { TablaTurnosComponent } from './components/tabla-turnos/tabla-turnos.component';
import { FiltroEspecialistaComponent } from './components/filtro-especialista/filtro-especialista.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import { HistoriaClinicaComponent } from './components/historia-clinica/historia-clinica.component';

@NgModule({
  declarations: [
    TurnoComponent,
    AdminComponent,
    PacienteComponent,
    EspecialistaComponent,
    TablaTurnosComponent,
    FiltroEspecialistaComponent,
    HistoriaClinicaComponent
  ],
  imports: [
    CommonModule,
    TurnoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSliderModule
  ]
})
export class TurnoModule { }
