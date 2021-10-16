import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/models/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  registro : EventEmitter<Usuario> = new EventEmitter<Usuario>();
  usuarioYaRegistrado : EventEmitter<string> = new EventEmitter<string>();
  sesionIniciada : EventEmitter<Usuario> = new EventEmitter<Usuario>();
  errorInicioDeSesion : EventEmitter<string> = new EventEmitter<string> ();
  sesionTerminada : EventEmitter<boolean> = new EventEmitter<boolean>();
  errorRegistro : EventEmitter<string> = new EventEmitter<string>();

  iniciado? : Usuario;
  
  constructor(
  ) { }

  registroUsuario ( usuario : Usuario ) {
    this.iniciado = usuario;
    this.registro.emit(this.iniciado);
  }

  usuarioExistente( mensaje : string ) {
    this.usuarioYaRegistrado.emit(mensaje);
  }

  iniciarSesion( usuario : Usuario ) {
    this.iniciado = usuario;
    this.sesionIniciada.emit(usuario);
  }

  errorIniciarSesion() {
    this.errorInicioDeSesion.emit( "Error al iniciar sesión. Datos incorrectos!" );
  }

  salirDeSesion() {
    this.iniciado = undefined;
    this.sesionTerminada.emit(true);
  }

  errorRegistrar( mensaje : string ) {
    this.errorRegistro.emit(mensaje);
  }

}