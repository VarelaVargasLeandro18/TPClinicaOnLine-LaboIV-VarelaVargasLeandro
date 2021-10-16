import { Injectable, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario/usuario';
import { UsuarioService } from '../usuarioService/usuario.service';
import { Logger } from 'src/app/models/logger/logger';
import { AngularFirestore, DocumentReference} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuarioDAOService implements OnInit {

  private collectionUsr : string = "usuarios";

  constructor(
    private usuarioService : UsuarioService,
    private db : AngularFirestore
  ) { }

  ngOnInit() {
  } 

  async login ( usuario : Usuario ) {
    const usuarioSnapshot = await this.checkIfExist(usuario);

    if ( usuarioSnapshot === undefined ) {
      this.usuarioService.errorIniciarSesion();
      return
    }

    const usuarioDB = usuarioSnapshot.data() as Usuario;
    const usuarioReference = usuarioSnapshot.ref;
    usuarioDB.email = usuario.email;
    this.usuarioService.iniciarSesion( usuarioDB );
    this.logger( usuarioReference, 'Inicio de Sesion' );
  }

  async checkIfExist ( usuario : Usuario ) {
    const usuarioSnapshot = await this.db.collection(this.collectionUsr).doc<Usuario>( usuario.email ).get().toPromise();

    if ( !usuarioSnapshot.exists ) {
      return undefined;
    }
    
    return usuarioSnapshot;
  }

  async register ( usuario : Usuario ) {
    const usuarioLogeado = ( await this.checkIfExist(usuario) );
    
    if ( usuarioLogeado != undefined ) {
      this.usuarioService.usuarioExistente('Este email se encuentra en uso.');
      return
    }
    
    try {
      await this.db.collection(this.collectionUsr).doc( usuario.email ).set( {
        contrasenia: usuario.contrasenia,
        apellido: usuario.apellido,
        nombre: usuario.nombre
      } );
      const usuarioRef = (await this.db.collection( this.collectionUsr ).doc<Usuario>( usuario.email ).get().toPromise()).ref;
      this.logger( usuarioRef, 'Registro' );
      this.usuarioService.registroUsuario( usuario );
    } catch ( error ) {
      console.error(error)
      this.usuarioService.errorRegistrar( 'Error al realizar el registro' );
    }
  }

  logger( refUsuario : DocumentReference<Usuario>, logEvent : string ) {

    const hora = new Date();
    const log = new Logger(
      logEvent,
      hora,
      refUsuario
    );
    
    console.log({...log})
    this.db.collection('logs').add( {...log} );

  }



}