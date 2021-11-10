import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/models/turno/turno';
import { Usuario } from 'src/app/models/usuario/usuario';
import { TurnoService } from 'src/app/services/turnoService/turno.service';
import { UsuarioService } from 'src/app/services/usuarioService/usuario.service';

@Component({
  selector: 'app-especialista',
  templateUrl: './especialista.component.html',
  styleUrls: ['./especialista.component.css']
})
export class EspecialistaComponent implements OnInit {
  public iniciado? : Usuario;
  public turnos : Turno[] = [];
  public mostrarEspecialista : boolean = true;
  public mostrarTurno : boolean = false;

  constructor(
    private usuarioService : UsuarioService,
    private turnosService : TurnoService
  ) {
    this.iniciado = this.usuarioService.iniciado;
  }

  async ngOnInit() {
    this.turnos = await this.turnosService.getTurnosByEspecialista( this.iniciado?.email );
  }

  public elegidoTurnos ( turnos : Turno[] ) {
    this.turnos = turnos;
  }

  public filtrarPorEspecialista() {
    this.mostrarEspecialista = true;
    this.mostrarTurno = false;
  }

  public filtrarPorTurno() {
    this.mostrarTurno = !this.mostrarTurno;
    this.mostrarEspecialista = false;
  }

}