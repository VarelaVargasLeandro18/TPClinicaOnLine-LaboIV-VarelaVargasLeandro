import { Component, OnInit } from '@angular/core';
import { UsuarioDAOService } from 'src/app/services/usuarioDAO/usuario-dao.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public usuarios : any[] = [];

  constructor(
    private usuarioDaoService : UsuarioDAOService
  ) {
    this.usuarioDaoService.obtenerTodosLosUsuarios().subscribe( (usuarios) => this.usuarios = usuarios );
  }

  ngOnInit(): void {
  }

}
