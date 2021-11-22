import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Turno } from 'src/app/models/turno/turno';
import { Usuario } from 'src/app/models/usuario/usuario';
import { TurnoService } from 'src/app/services/turnoService/turno.service';

@Component({
  selector: 'app-filtro-turno',
  templateUrl: './filtro-turno.component.html',
  styleUrls: ['./filtro-turno.component.css']
})
export class FiltroTurnoComponent implements OnInit {
  @Output() turnos : EventEmitter<Turno[]> = new EventEmitter<Turno[]>();
  @Input() paciente? : Usuario;
  @Input() especialista? : Usuario;

  private todosLosTurnos : Turno[] = [];

  public readonly camposTurno : string[] = [
    "fecha", "resenia", "encuesta", "motivo",
    "especialidad", "calificacion", "estado",
    "cancelado", "historia"
  ];

  public campoTurnoElegido : string = "";

  public readonly camposHistoria : string[] = [
    "altura", "datoDinamicoUnoNombre", "datoDinamicoUnoValor",
    "datoDinamicoDosNombre", "datoDinamicoDosValor", 
    "datoDinamicoTresNombre", "datoDinamicoTresValor",
    "peso", "presion", "temperatura"
  ];

  public campoHistoriaElegido  : string = "";

  public valorCampo : string = "";

  constructor(
    private turnoService : TurnoService
  ) { }

  async ngOnInit() {
    this.todosLosTurnos = await this.turnoService.getTodosLosTurnos();
  }

  private defaultValues () {
    this.campoTurnoElegido = "";
    this.campoHistoriaElegido = "";
  }

  setCampoTurno( campo : string ) {
    this.defaultValues();
    this.campoTurnoElegido = campo;
  }

  setCampoHistoria( campo : string ) {
    this.campoHistoriaElegido = campo;
  }

  async buscar() {
    let turnos;

    if ( this.campoTurnoElegido != 'historia' )
      turnos = await this.buscarPorCampoDeTurno();
    else
      turnos = await this.buscarPorCampoDeHistoria();

    turnos = this.filtrar( turnos );
    
    this.turnos.emit( turnos );
  }

  mostrarValor() {
    return (
            this.campoTurnoElegido != ""
            &&
            ((this.campoTurnoElegido == 'historia' && this.campoHistoriaElegido) 
            ||
            (this.campoTurnoElegido != 'historia'))
    );
  }

  private buscarPorCampoDeTurno() {
    let valorCampo : string | number = this.valorCampo;

    if ( this.campoTurnoElegido === 'calificacion' )
      valorCampo = parseInt(valorCampo);

    return this.turnoService.getTurnosPorCampo(
      this.campoTurnoElegido,
      this.valorCampo
    ); 
  }

  private async buscarPorCampoDeHistoria() {
    return (await this.turnoService.getTodosLosTurnos())
      .filter( (turno) => turno.historia)
      .filter( (turno) => turno.historia[ this.campoHistoriaElegido ] == this.valorCampo );

  }

  onSearch( target : any ) {
    let turnos = [];
    const valor = target.value;

    for ( let turno of this.todosLosTurnos ) {
      
      if ( this.chequearValor( turno, valor ) ) {
        turnos.push(turno);
        continue
      }

    }

    turnos = this.filtrar( turnos );
    console.log(turnos);
    this.turnos.emit( turnos );
  }

  private chequearValor( turno : Turno, valor : string ) {
    
    for ( let turnoValor of Object.values(turno) ) {
      if ( turnoValor.toString().indexOf( valor ) > -1 ) return true;
    }

    const historia : any = turno.historia;

    if ( !historia ) return false;

    const historiaValues : any = Object.values(historia);

    for ( let historiaValor of historiaValues ) {
      if ( historiaValor.toString().indexOf( valor ) > -1 ) return true;
    }

    return false;
  }

  private filtrar( turnos : Turno[] ) {
    if ( this.paciente ) 
      return this.filtrarPorPaciente(turnos);
    if( this.especialista )
      return this.filtrarPorEspecialista(turnos);
    return turnos;
  }

  private filtrarPorPaciente( turnos : Turno[] ) {
    return turnos.filter( (turno) => turno.paciente === this.paciente?.email );
  }

  private filtrarPorEspecialista( turnos : Turno[] ) {
    return turnos.filter( (turno) => turno.especialista === this.especialista?.email );
  }

}