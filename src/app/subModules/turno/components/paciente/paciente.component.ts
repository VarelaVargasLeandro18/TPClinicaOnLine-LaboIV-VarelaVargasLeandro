import { Component, OnInit } from '@angular/core';
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

  constructor(
    private usuarioService : UsuarioService,
    private turnosService : TurnoService
  ) {
    this.iniciado = this.usuarioService.iniciado;
  }

  async ngOnInit() {
    //this.turnos = await this.turnosService.getTurnosByPaciente( this.iniciado?.email );
  }

  public async elegidoEspecialista ( especialistaMail : string ) {
    this.turnos = (await this.turnosService.getTurnosByEspecialista( especialistaMail ))
      .filter( (turno) => turno.paciente === this.iniciado?.email );
  }

}
