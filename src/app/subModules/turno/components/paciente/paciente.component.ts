import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/models/turno/turno';
import { Usuario } from 'src/app/models/usuario/usuario';
import { TurnoService } from 'src/app/services/turnoService/turno.service';
import { UsuarioService } from 'src/app/services/usuarioService/usuario.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  public iniciado? : Usuario;
  public turnos : any[] = [];
  public mostrarEspecialista : boolean = true;
  public mostrarTurno : boolean = false;

  constructor(
    private usuarioService : UsuarioService,
    private turnosService : TurnoService
  ) {
    this.iniciado = this.usuarioService.iniciado;
  }

  async ngOnInit() {
    this.turnos = await this.turnosService.getTurnosByPaciente( this.iniciado?.email );
  }

  public async elegidoEspecialista ( especialistaMail : string ) {
    this.turnos = (await this.turnosService.getTurnosByEspecialista( especialistaMail ))
      .filter( (turno) => turno.paciente === this.iniciado?.email );
  }

  public elegidoTurnos ( turnos : Turno[] ) {
    this.turnos = turnos;
  }

  public filtrarPorEspecialista() {
    this.turnos = [];
    this.mostrarEspecialista = !this.mostrarEspecialista;
    this.mostrarTurno = false;
  }

  public filtrarPorTurno() {
    this.turnos= [];
    this.mostrarTurno = !this.mostrarTurno;
    this.mostrarEspecialista = false;
  }

}