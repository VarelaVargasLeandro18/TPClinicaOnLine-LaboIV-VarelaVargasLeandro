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

  ngOnInit(): void {
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

  private filtrar( turnos : Turno[] ) {
    if ( this.paciente ) 
      return this.filtrarPorPaciente(turnos);
    return this.filtrarPorEspecialista(turnos);
  }

  private filtrarPorPaciente( turnos : Turno[] ) {
    return turnos.filter( (turno) => turno.paciente === this.paciente?.email );
  }

  private filtrarPorEspecialista( turnos : Turno[] ) {
    return turnos.filter( (turno) => turno.especialista === this.especialista?.email );
  }

}