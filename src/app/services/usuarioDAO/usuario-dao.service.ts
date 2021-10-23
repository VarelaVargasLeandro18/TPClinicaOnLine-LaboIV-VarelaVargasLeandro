import { Injectable, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario/usuario';
import { UsuarioService } from '../usuarioService/usuario.service';
import { Logger } from 'src/app/models/logger/logger';
import { AngularFirestore, DocumentReference} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioDAOService implements OnInit {

  private collectionUsr : string = "usuarios";

  constructor(
    private usuarioService : UsuarioService,
    private db : AngularFirestore,
    private auth : AngularFireAuth
  ) { }

  ngOnInit() {
  }

  actualizarUsuario ( usuario : Usuario ) {
    return this.db.collection( this.collectionUsr ).doc( usuario.email ).update ( {...usuario} );
  }

  obtenerTodosLosUsuarios () {
    return this.db.collection( this.collectionUsr ).get().pipe(
      map( (usuarios) => usuarios.docs.map( usuarioSnapshot => usuarioSnapshot.data() ) )
    );
  }

  async login ( usuario : Usuario ) {
    const usuarioSnapshot = await this.checkIfExist(usuario);

    if ( usuarioSnapshot === undefined ) {
      this.usuarioService.errorIniciarSesion();
      return
    }

    const usuarioDB = usuarioSnapshot.data() as Usuario;
    usuarioDB.email = usuario.email;
    this.usuarioService.iniciarSesion( usuarioDB );
    this.logger( usuarioDB.email, 'Inicio de Sesion' );
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

    /* try {
      await this.auth.createUserWithEmailAndPassword( 
              usuario.email ? usuario.email : '', 
              usuario.contrasenia ? usuario.contrasenia : ''
      );
    } catch (err) {
      this.usuarioService.errorRegistrar( "El mail ingresado no es válido!" );
      return
    }   */  
    
    if ( usuarioLogeado != undefined ) {
      this.usuarioService.usuarioExistente('Este email se encuentra en uso.');
      return
    }
    
    try {
      await this.db.collection(this.collectionUsr).doc( usuario.email ).set( {...usuario} );
      this.logger( usuario.email, 'Registro' );
      this.usuarioService.registroUsuario( usuario );
    } catch ( error ) {
      this.usuarioService.errorRegistrar( 'Error al realizar el registro' );
      throw error;
    }
  }

  logger( email? : string, logEvent? : string ) {

    const hora = new Date();
    const log = new Logger(
      logEvent,
      hora,
      email
    );
    
    this.db.collection('logs').add( {...log} );
  }

}