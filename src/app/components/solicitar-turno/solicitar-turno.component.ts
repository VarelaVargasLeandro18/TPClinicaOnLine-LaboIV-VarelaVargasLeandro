import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Turno } from 'src/app/models/turno/turno';
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
  public FECHA_MIN : string = "";
  public FECHA_MAX : string = "";
  public mensaje : string = "";

  private iniciado? : any;

  public form : FormGroup;

  public especialistas : any[] = [];
  public especialidades : any[] = [];
  public pacientes : any[] = [];

  public especialista : any = undefined;

  constructor(
    private formBuilder : FormBuilder,
    private especialidadService : EspecialidadService,
    private usuarioDAOService : UsuarioDAOService,
    private usuarioService : UsuarioService,
    private turnoService : TurnoService,
    private router : Router
  ) {
    this.form = this.formBuilder.group({
      especialidad: [null, [Validators.required]],
      especialista: [null, [Validators.required]],
      fecha: [null, [Validators.required]],
      paciente: [null]
    });
    this.iniciado = this.usuarioService.iniciado;

    const fechaMinStrAux = (new Date()).toISOString();
    this.FECHA_MIN = fechaMinStrAux.substring( 0, fechaMinStrAux.lastIndexOf(':') );
    
    const fechaMaxAux = new Date();
    fechaMaxAux.setFullYear( fechaMaxAux.getFullYear() + 1 );
    const fechaMaxStrAux = fechaMaxAux.toISOString();
    this.FECHA_MAX = fechaMaxStrAux.substring( 0, fechaMaxStrAux.lastIndexOf(':') );
  }

  async ngOnInit() {
    this.especialidades = await this.especialidadService.getCategorias();
    this.form.controls.especialidad.valueChanges.subscribe( 
      async (value) => this.especialistas = await this.usuarioDAOService.getEspecialistasPorEspecialidad( value )
    );

    this.form.controls.especialista.valueChanges.subscribe(
      async (value) => this.especialista = this.especialistas[value]
    );
        
    if ( this.iniciado.razon === "0" ) {
      this.form.controls.paciente.setValidators( [Validators.required] );
      this.pacientes = await this.usuarioDAOService.getPacientes();
    }
  }

  async onSubmit( event : any ) {
    this.mensaje = "";
    const fecha = this.form.controls.fecha.value;
    const especialidad = this.form.controls.especialidad.value;
    const especialista = this.especialista.email;
    const paciente = this.form.controls.paciente.value || this.iniciado.email;

    if ( !this.determinarHorarioCorrecto( fecha, this.especialista.horarioMax, this.especialista.horarioMin ) ) {
      this.mensaje = "Elija un horario entre las " + especialista.horarioMin + " y las " + especialista.horarioMax;
      return 
    }

    if ( !( await this.chequearTurno( fecha ) ) ) {
      this.mensaje = "Lo sentimos, ese turno no está disponible.";
      return
    }

    const turno = new Turno();
    turno.paciente = paciente;
    turno.especialista = especialista;
    turno.especialidad = especialidad;
    turno.fecha = fecha;

    this.turnoService.addTurno( turno )
      .then( () => this.router.navigateByUrl("/misTurnos") )
      .catch ( (error) => {
        this.mensaje = "Lo sentimos, se ha producido un error!";
        console.error( error );
      } );
  }

  private determinarHorarioCorrecto ( fecha : string, horarioMaxEspecialista : string, horarioMinEspecialista : string ) : boolean {
    const horarioFechaStr = fecha.substring( fecha.indexOf( 'T' ) + 1 );
    const regexTime = /([0-9]?[0-9]):([0-9][0-9])/;

    const horarioFecha = this.convertirATime( regexTime.exec( horarioFechaStr ) );
    const horarioMax = this.convertirATime( regexTime.exec( horarioMaxEspecialista ) );
    const horarioMin = this.convertirATime( regexTime.exec( horarioMinEspecialista ) );

    return horarioFecha >= horarioMin && horarioFecha <= horarioMax;
  }

  private async chequearTurno ( fecha : string ) {
    const turnos = await this.turnoService.averiguarSiHayTurnoEnHorario( this.especialista.email, fecha );
    
    return turnos === undefined || turnos[0] == undefined;
  }

  private convertirATime ( horaMinSecArr : any ) {
    let hr = parseInt(horaMinSecArr[1]) * 3600 * 1000;
    let min = parseInt(horaMinSecArr[2]) * 60 * 1000;
    return hr + min;
  }

  isRequiredField(field: string) {
    const form_field = this.form.get(field);
    if (form_field === null || form_field === undefined || !form_field.validator) {
        return false;
    }

    const validator = form_field.validator({} as AbstractControl);
    return (validator && validator.required);
  }

}
