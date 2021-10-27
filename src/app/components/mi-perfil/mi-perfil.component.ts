import { Component, OnInit } from '@angular/core';
import { UsuarioDAOService } from 'src/app/services/usuarioDAO/usuario-dao.service';
import { UsuarioService } from 'src/app/services/usuarioService/usuario.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {
  public usuario : any;

  public horarioMin : string = "";
  public horarioMax : string = "";

  public mensaje : string = "";

  constructor(
    private usuarioService : UsuarioService,
    private usuarioDAOService : UsuarioDAOService
  ) { 
    this.usuario = this.usuarioService.iniciado;
  }

  ngOnInit(): void {
  }
  
  actualizarHorario() {
    this.mensaje = "";
    this.usuario.horarioMin = this.horarioMin;
    this.usuario.horarioMax = this.horarioMax;
    this.usuarioDAOService.actualizarUsuario( this.usuario ).then( () => this.mensaje = "Horario Actualizado!" );
  }

}
