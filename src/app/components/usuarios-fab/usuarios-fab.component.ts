import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/models/usuario/usuario';

@Component({
  selector: 'app-usuarios-fab',
  templateUrl: './usuarios-fab.component.html',
  styleUrls: ['./usuarios-fab.component.css']
})
export class UsuariosFABComponent implements OnInit {
  @Output() usuarioElegido : EventEmitter<Usuario> = new EventEmitter<Usuario>();
  @Input() usuarios : Usuario[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  elegirUsuario( usuario : Usuario ) {
    this.usuarioElegido.emit(usuario);
  }

}
