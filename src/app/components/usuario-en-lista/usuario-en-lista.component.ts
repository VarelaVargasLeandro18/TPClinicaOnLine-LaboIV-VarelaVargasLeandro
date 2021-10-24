import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-usuario-en-lista',
  templateUrl: './usuario-en-lista.component.html',
  styleUrls: ['./usuario-en-lista.component.css']
})
export class UsuarioEnListaComponent implements OnInit {
  @Input() usuario : any;
  @Output() seleccionado : EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick( usuario : any ) {
    this.seleccionado.emit(usuario)
  }

}
