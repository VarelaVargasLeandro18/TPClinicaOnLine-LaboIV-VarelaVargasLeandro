import { Component, OnInit } from '@angular/core';
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
  public turnos : any[] = [];

  constructor(
    private usuarioService : UsuarioService,
    private turnosService : TurnoService
  ) {
    this.iniciado = this.usuarioService.iniciado;
  }

  async ngOnInit() {
    this.turnos = await this.turnosService.getTurnosByEspecialista( this.iniciado?.email );
  }

}
