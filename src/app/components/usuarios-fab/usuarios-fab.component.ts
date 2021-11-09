import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario/usuario';

@Component({
  selector: 'app-usuarios-fab',
  templateUrl: './usuarios-fab.component.html',
  styleUrls: ['./usuarios-fab.component.css']
})
export class UsuariosFABComponent implements OnInit {
  @Input() usuarios : Usuario[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
