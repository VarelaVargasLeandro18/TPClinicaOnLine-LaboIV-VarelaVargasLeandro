import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario/usuario';
import { UsuarioDAOService } from 'src/app/services/usuarioDAO/usuario-dao.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public usuarios : any[] = [];
  public actualizado : boolean = false;

  constructor(
    private usuarioDaoService : UsuarioDAOService
  ) {
    this.usuarioDaoService.obtenerTodosLosUsuarios().subscribe( (usuarios) => this.usuarios = usuarios );
  }

  ngOnInit(): void {
  }

  onAprobadoClick ( usuario : Usuario, event : any ) {
    usuario.aprobado = event.target.checked;
    console.log(event.target.value);
    this.usuarioDaoService.actualizarUsuario(usuario).then( () => this.actualizado = true );
  }

}
