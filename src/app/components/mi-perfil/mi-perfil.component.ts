import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioDAOService } from 'src/app/services/usuarioDAO/usuario-dao.service';
import { UsuarioService } from 'src/app/services/usuarioService/usuario.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { Usuario } from 'src/app/models/usuario/usuario';
import { GenerarPDFService } from 'src/app/services/generarPDF/generar-pdf.service';
import { TurnoService } from 'src/app/services/turnoService/turno.service';
import { Turno } from 'src/app/models/turno/turno';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {
  @ViewChild('menuEspecialistasTrigger') triggerEspecialista? : MatMenuTrigger;

  public usuario : any;
  public pacientes : any[] = [];
  public pacienteElegido : any;
  public especialistas : any[] = [];

  public horarioMin : string = "";
  public horarioMax : string = "";

  public mensaje : string = "";

  constructor(
    private usuarioService : UsuarioService,
    private usuarioDAOService : UsuarioDAOService,
    private pdfService : GenerarPDFService,
    private turnoService : TurnoService
  ) { 
    this.usuario = this.usuarioService.iniciado;
  }

  async ngOnInit() {
    if ( this.usuario.razon === '0' ) this.pacientes = await this.usuarioDAOService.getPacientes();
  }
  
  actualizarHorario() {
    this.mensaje = "";
    this.usuario.horarioMin = this.horarioMin;
    this.usuario.horarioMax = this.horarioMax;
    this.usuarioDAOService.actualizarUsuario( this.usuario ).then( () => this.mensaje = "Horario Actualizado!" );
  }

  async onEligePaciente( usuario : any ) {
    this.pacienteElegido = usuario;
    const especialistasMail = await this.usuarioDAOService.getEspecialistasQueAtendieronAUsuario( usuario.email );
    const especialistasAux = [];

    for ( let mail of especialistasMail )
      especialistasAux.push( await this.usuarioDAOService.getUsuario( mail ) );

    this.especialistas = especialistasAux;
    
    this.triggerEspecialista?.openMenu();
  }

  async onEligeFormaDeDescarga ( usuario : any ) {
    let nombreDoc = this.pacienteElegido.email;

    if ( usuario === null ) {
      nombreDoc += ".pdf";
      const turnos = await this.turnoService.getTurnosByPaciente( this.pacienteElegido.email );
      const historias = this.separarHistoriasClinicas( turnos );
      this.pdfService.createTablePDF( nombreDoc, historias );
      return
    }
    
    nombreDoc += "-" + usuario.email + ".pdf";
    const turnos = await this.turnoService.getTurnosByPacienteAndEspecialista( usuario.email, this.pacienteElegido.email );
    const historias = this.separarHistoriasClinicas( turnos );
    this.pdfService.createTablePDF( nombreDoc, historias );
    
  }

  separarHistoriasClinicas ( turnos : Turno[] ) {
    return turnos
            .filter( (turno) => turno.historia != undefined )
            .map( (turno) => turno.historia );
  }

}
