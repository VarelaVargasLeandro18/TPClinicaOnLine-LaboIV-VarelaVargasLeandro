import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario/usuario';
import { TurnoService } from 'src/app/services/turnoService/turno.service';
import { UsuarioService } from 'src/app/services/usuarioService/usuario.service';

@Component({
  selector: 'app-tabla-turnos',
  templateUrl: './tabla-turnos.component.html',
  styleUrls: ['./tabla-turnos.component.css']
})
export class TablaTurnosComponent implements OnInit {
  @Input() public turnos : any[] = [];
  public iniciado? : Usuario;

  public texto : string = "";

  constructor(
    private turnoService : TurnoService,
    private usuarioService : UsuarioService
  ) {
    this.iniciado = this.usuarioService.iniciado;
  }

  ngOnInit(): void {
  }

  actualizarTurno ( turno : any, target : any, atributo : any ) {
    turno[atributo] = target.value;
    this.turnoService.actualizarTurno( turno );
  }

  actualizarTurnoValor ( turno : any, valor : any, atributo : any ) {
    turno[atributo] = valor;
    this.turnoService.actualizarTurno( turno );
  }

  actualizarTurnoChecked ( turno : any, target : any, atributo : any ) {
    turno[atributo] = target.checked;
    this.turnoService.actualizarTurno( turno );
  }

  mostrarTexto ( texto : string ) {
    this.texto = texto;
  }

}
