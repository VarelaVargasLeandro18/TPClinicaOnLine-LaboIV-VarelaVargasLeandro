import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuarioService/usuario.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {
  public usuario : any;

  constructor(
    private usuarioService : UsuarioService
  ) { 
    this.usuario = usuarioService.iniciado;
  }

  ngOnInit(): void {
  }



}
