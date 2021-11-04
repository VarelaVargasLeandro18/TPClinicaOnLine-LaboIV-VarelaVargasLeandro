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

  public indexTurnoElegido : number = -1;
  public resenya : boolean = false;
  public encuesta : boolean = false;

  public mailFinalizado : string = "";

  public texto = "";

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

  finalizarTurno ( turno : any, target : any ) {
    this.actualizarTurnoChecked(turno, target, 'finalizado');

    if ( target.checked ) {
      this.mailFinalizado = turno.paciente;
      return
    }

    if ( !target.checked ) this.mailFinalizado = "";

  
  }

  prepararResenya( index : number ) {
    this.indexTurnoElegido = index;
    const turno = this.turnos[index];

    if ( !turno.resenia ){
      this.resenya = true;
      this.texto = "";
      return
    }
    
    this.texto = turno.resenia;
  }

  prepararEncuesta( index : number ) {
    this.indexTurnoElegido = index;
    const turno = this.turnos[index];

    if ( !turno.encuesta ) {
      this.encuesta = true;
      this.texto = "";
      return
    }

    this.texto = turno.encuesta;
  }
  
  actualizarEncuesta() {

    if ( this.encuesta ) {
      const turno = this.turnos [ this.indexTurnoElegido ];
      turno.encuesta = this.texto;
      this.encuesta = false;
      this.actualizarTurnoValor( turno, this.texto, 'encuesta' );
    }

  }

  actualizarResenya() {
    
    if ( this.resenya ) {
      const turno = this.turnos [ this.indexTurnoElegido ];
      turno.resenia = this.texto;
      this.resenya = false;
      this.actualizarTurnoValor( turno, this.texto, 'resenia' );
    }

  }

  salirDelModal() {
    this.encuesta = false;
    this.resenya = false;
  }


}
