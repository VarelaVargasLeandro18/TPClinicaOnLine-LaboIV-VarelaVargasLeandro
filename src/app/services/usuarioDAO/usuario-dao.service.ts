import { Injectable, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario/usuario';
import { UsuarioService } from '../usuarioService/usuario.service';
import { Logger } from 'src/app/models/logger/logger';
import { AngularFirestore, DocumentReference} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { async } from '@firebase/util';

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

    if ( usuarioDB.aprobado != undefined && !usuarioDB.aprobado ) return false;
    if ( usuarioDB.contrasenia != usuario.contrasenia ) return false;

    usuarioDB.email = usuario.email;
    this.usuarioService.iniciarSesion( usuarioDB );
    this.logger( usuarioDB.email, 'Inicio de Sesion' );
    return true;
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
    } */

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

  getLogs() {
    return this.db.collection('logs')
            .get()
            .toPromise()
            .then( (snapshots) => snapshots.docs ).then( (docs) => docs.map( (doc) => doc.data() ) );
  }

  async getAdmins() {
    return await this.getUsuariosPorRazon("0");
  }

  async getEspecialistas() {
    return await this.getUsuariosPorRazon("1");
  }

  async getPacientes() {
    return await this.getUsuariosPorRazon("2");
  }

  getEspecialistasPorEspecialidad( especialidad : string ) {
    return this.db.collection( this.collectionUsr ).ref.where( "especialidad", "==", especialidad )
              .get()
              .then( snapshots => snapshots.docs.map( snapshot => snapshot.data() ) );
  }

  getUsuario ( email : string ) {
    return this.db.collection( this.collectionUsr ).doc( email )
              .get()
              .toPromise()
              .then( snapshot => snapshot.data() );
  }  

  async getUsuariosAtendidosPorEspecialista ( especialistaEmail : string ) {
    const collectionTurnos = "turnos";
    const pacientesMails = await this.db.collection( collectionTurnos ).ref
                                .where( "especialista", "==", especialistaEmail )
                                .get()
                                .then( snapshots => snapshots.docs.map( snapshot => snapshot.data() ) )
                                .then( (allData) => allData.map( (data : any) => data.paciente ) )
                                .then( (pacientes) => pacientes.filter( (value, index, array) => array.indexOf(value) === index ) );
    
    const pacientes = [];

    for ( let pacienteMail of pacientesMails )
      pacientes.push( await this.getUsuario( pacienteMail ) );
  
    return pacientes;
  }

  getEspecialistasQueAtendieronAUsuario ( usuarioEmail : string ) {
    const collectionTurnos = "turnos";
    return this.db.collection( collectionTurnos ).ref
                        .where( 'paciente', "==", usuarioEmail )
                        .get()
                        .then( snapshots => snapshots.docs.map( snapshot => snapshot.data() ) )
                        .then( (datas: any) => datas.map( (data : any) => data.especialista ) );
  }

  private getUsuariosPorRazon( razon : string ) {
    return this.db.collection( this.collectionUsr ).ref.where( 'razon', '==', razon )
              .get()
              .then( snapshots => snapshots.docs.map( snapshot => snapshot.data() ) );
  }

}