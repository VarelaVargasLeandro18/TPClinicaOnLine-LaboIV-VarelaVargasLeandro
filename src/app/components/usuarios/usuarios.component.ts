import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario/usuario';
import { GenerarExcelTurnosService } from 'src/app/services/generarExcelTurnos/generar-excel-turnos.service';
import { TurnoService } from 'src/app/services/turnoService/turno.service';
import { UsuarioDAOService } from 'src/app/services/usuarioDAO/usuario-dao.service';
import { UsuarioService } from 'src/app/services/usuarioService/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public usuarios : any[] = [];
  public actualizado : boolean = false;

  public iniciado? : Usuario;
  public isAdmin : boolean = false;
  public paciente? : Usuario;

  constructor(
    private usuarioDaoService : UsuarioDAOService,
    private usuarioService : UsuarioService,
    private turnoService : TurnoService,
    private excelService : GenerarExcelTurnosService
  ) {
    this.iniciado = this.usuarioService.iniciado;
  }

  ngOnInit(): void {
    if ( this.iniciado?.razon === '0' ){
      this.usuarioDaoService.obtenerTodosLosUsuarios().subscribe( (usuarios) => this.usuarios = usuarios );
      this.isAdmin = true;
      return
    }
    
    if ( this.iniciado?.email )
      this.usuarioDaoService.getUsuariosAtendidosPorEspecialista( this.iniciado.email )
        .then( (usuarios) => this.usuarios = usuarios );
  }

  onAprobadoClick ( usuario : Usuario, event : any ) {
    usuario.aprobado = event.target.checked;
    this.usuarioDaoService.actualizarUsuario(usuario).then( () => this.actualizado = true );
  }

  pacienteElegido( usuario : Usuario ) {
    this.paciente = usuario;
  }

  async descargarExcel( usuario : Usuario ) {
    let turnos = [];
    
    if ( usuario.razon === '1' )
      turnos = await this.turnoService.getTurnosByEspecialista( usuario.email );

    if ( usuario.razon === '2' )
      turnos = await this.turnoService.getTurnosByPaciente( usuario.email );
    
    const nomApe = usuario.nombre + " " + usuario.apellido;
    const blobFile = await this.excelService.generarExcel( turnos, nomApe );

    const url = window.URL.createObjectURL(blobFile);
    const anchor = document.createElement("a");
    anchor.download = nomApe + ".xlsx";
    anchor.href = url;
    anchor.click();
  }

}
