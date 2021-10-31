import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Especialidad } from 'src/app/models/especialidad/especialidad';
import { EspecialidadService } from 'src/app/services/especialidadService/especialidad.service';
import { UsuarioDAOService } from 'src/app/services/usuarioDAO/usuario-dao.service';

@Component({
  selector: 'app-filtro-especialista',
  templateUrl: './filtro-especialista.component.html',
  styleUrls: ['./filtro-especialista.component.css']
})
export class FiltroEspecialistaComponent implements OnInit {
  @Output() public especialista : EventEmitter<string> = new EventEmitter();

  public especialidades : Especialidad[] = [];
  public especialistas : any[] = [];

  constructor(
    private especialidadService : EspecialidadService,
    private usuariosService : UsuarioDAOService
  ) {
  }

  async ngOnInit() {
    this.especialidades = await this.especialidadService.getCategorias();
  }

  elegirEspecialidad( especialidad? : string ) {
    this.traerEspecialistas( especialidad );
  }

  elegirEspecialista( especialista : any ) {
    this.especialista.emit( especialista.email );
  }

  private async traerEspecialistas ( especialidad? : string ) {
    if ( !especialidad ) return

    this.especialistas = await this.usuariosService.getEspecialistasPorEspecialidad( especialidad );
  }

}