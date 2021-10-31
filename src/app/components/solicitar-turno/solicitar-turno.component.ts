import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/app/models/especialidad/especialidad';
import { Turno } from 'src/app/models/turno/turno';
import { Usuario } from 'src/app/models/usuario/usuario';
import { EspecialidadService } from 'src/app/services/especialidadService/especialidad.service';
import { TurnoService } from 'src/app/services/turnoService/turno.service';
import { UsuarioDAOService } from 'src/app/services/usuarioDAO/usuario-dao.service';
import { UsuarioService } from 'src/app/services/usuarioService/usuario.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css']
})
export class SolicitarTurnoComponent implements OnInit {
  public iniciado? : Usuario;
  public pacientes : any[] = [];
  public paciente? : Usuario;

  public dia : string = "";
  public horario : string = "";

  public especialista : any;
  public especialidades : Especialidad[] = [];
  public especialistas : any[] = [];
  public dias : string[] = [];
  public horarios : string[] = [];

  constructor(
    private especialidadService : EspecialidadService,
    private usuarioDAOService : UsuarioDAOService,
    private usuarioService : UsuarioService,
    private turnoService : TurnoService
  ) {
    this.iniciado = this.usuarioService.iniciado;
  }

  async ngOnInit() {
    this.especialidades = await this.especialidadService.getCategorias();

    if ( this.iniciado?.razon === "0" ){
      this.pacientes = await this.usuarioDAOService.getPacientes();
      return
    }

    this.paciente = this.iniciado;
  }

  elegirEspecialidad( especialidad? : string ) {
    this.horario = "";
    this.dias = [];
    this.dia = "";
    this.especialista = undefined;

    this.traerEspecialistas( especialidad );
  }

  elegirEspecialista( especialista : any ) {
    this.horario = "";
    this.dias = []
    this.dia = "";
    this.especialista = especialista;
    
    const currentDate = new Date();
    let dias = this.filterDays( this.getWeekdaysInMonth( currentDate.getMonth(), currentDate.getFullYear() ) );
    this.dias = this.estilizarDias( dias );

    if ( this.dias.length === 0 ) {
      this.dias.push ( "01-11-2021" );
    }

  }

  elegirDia ( dia : string ) {
    this.dia = dia;
    this.horario = "";
    this.obtenerHorarios( this.especialista.horarioMin, this.especialista.horarioMax );
    
  }

  elegirHorario ( horario : string ) {
    this.horario = this.dia + "T" + horario;
  }

  solicitarTurno() {
    const turno = new Turno();
    turno.paciente = this.paciente?.email;
    turno.especialidad = this.especialista.especialidad;
    turno.especialista = this.especialista.email;
    turno.fecha = this.horario;
  }

  private async traerEspecialistas ( especialidad? : string ) {
    if ( !especialidad ) return

    this.especialistas = await this.usuarioDAOService.getEspecialistasPorEspecialidad( especialidad );
  }

  public async chequearDisponibilidadFecha ( fecha : string ) {
    console.log( fecha );
    
    return true//( await this.turnoService.averiguarSiHayTurnoEnHorario( this.especialista.email, fecha ) )?.length === 0;
  }

  private estilizarDias ( days : number[] ) : string[] {
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    return days.map( (day) => year + "-" + (month + 1) + day);
  }

  private filterDays( days : number[] ) : number[] {
    const currentDay = (new Date()).getDate();
    return days.filter( (number) => number > currentDay);
  }

  private getWeekdaysInMonth(month : number, year : number) : number[] {
    let days = this.daysInMonth(month, year);
    const weekdays = [];
    for(var i=0; i< days; i++) {
        if (this.isWeekday(year, month, i+1)) weekdays.push( i+1 );
    }
    return weekdays;
  }

  private daysInMonth(iMonth : number, iYear : number) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
  }

  private isWeekday(year : number, month : number, day : number) {
    let onlyDay = new Date(year, month, day).getDay();
    return onlyDay !=0 && onlyDay !=6;
  }

  private async obtenerHorarios ( horarioMin : string, horarioMax : string ) {
    const horarioMinSplitted = horarioMin.split(':');
    const horarioMaxSplitted = horarioMax.split(':');

    let hora = parseInt( horarioMinSplitted[0] );
    let minuto = parseInt( horarioMinSplitted[1] );

    const horaMax = parseInt( horarioMaxSplitted[0] );
    const minutoMax = parseInt( horarioMaxSplitted[1] );

    while( hora <= horaMax ) {
      if ( hora === horaMax && minuto >= minutoMax ) break;
      const horario = ( (hora < 10) ? '0' + hora : hora ) + ":" + ( (minuto == 0) ? '00' : minuto );
      this.horarios.push( horario );
      
      if ( minuto === 30 ){
        hora++;
        minuto = 0;
        continue;
      }

      if ( minuto === 0 ) 
        minuto = 30;
    } 
  }

  private combinarDiaYHorarios ( dia : string ) {
    const fechas = [];

    return this.horarios.map( (horario) => dia + 'T' + horario );
  }

}