import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Turno } from 'src/app/models/turno/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  private collection : string = "turnos";

  constructor(
    private db : AngularFirestore
  ) { }

  addTurno ( turno : Turno ) {
    return this.db.collection( this.collection ).add( {...turno} );
  }

  actualizarTurno ( turno : any ) {
    return this.db.collection( this.collection ).doc( turno.id ).update ( {...turno} );
  }

  async averiguarSiHayTurnoEnHorario ( especialista : string, fecha : string ) {
    const turnos = await this.getTurnosByEspecialista( especialista );
    if ( turnos.length === 0 ) return 
    
    const MIN30 = (30*60*1000);
    const fechaParsed = Date.parse( fecha );
    const fechaMinus30Min = fechaParsed - MIN30;
    const fechaPlus30Min = fechaParsed + MIN30; 
    
    return turnos.filter( (turno : any) => {
      const fechaOfTurnoParsed = Date.parse( turno.fecha );
      
      return (  (fechaOfTurnoParsed > fechaMinus30Min && 
            fechaOfTurnoParsed < fechaPlus30Min ||
            fechaOfTurnoParsed === fechaParsed) && 
            !turno.cancelado ) 
    } );
  }

  getTodosLosTurnos () {
    return this.db.collection( this.collection )
            .get()
            .toPromise()
            .then( (querySnapshot) => querySnapshot.docs )
            .then( (docs) => docs.map( (doc) => {
              const ret : any = doc.data();
              ret.id = doc.id;
              return ret;
            } ) );
  }

  getTurnosByPaciente ( paciente? : string ) {
    return this.db.collection( this.collection ).ref.where( "paciente", "==", paciente )
            .get()
            .then( snapshots => snapshots.docs.map( doc => {
              const ret : any = doc.data();
              ret.id = doc.id;
              return ret;
            } ) ); 
  }

  getTurnosByEspecialista ( especialista? : string ) {
    return this.db.collection( this.collection ).ref.where( "especialista", "==", especialista )
            .get()
            .then( snapshots => snapshots.docs.map( doc => {
              const ret : any = doc.data();
              ret.id = doc.id;
              return ret;
            } ) );
  }

  getTurnosByPacienteAndEspecialista ( especialista : string, paciente : string ) {
    return this.db.collection( this.collection ).ref
            .where( 'especialista', '==', especialista )
            .get()
            .then( snapshots => snapshots.docs.map( doc => {
              const ret : any = doc.data();
              ret.id = doc.id;
              return ret;
            } ) )
            .then( turnos => turnos.filter( (turno) => turno.paciente === paciente ) );
  }

  getTurnosPorCampo ( campo : string, valor : string|number ) {
    return this.db.collection( this.collection ).ref.where( campo, "==", valor )
            .get()
            .then( snapshots => snapshots.docs.map( doc => {
              const ret : any = doc.data();
              ret.id = doc.id;
              return ret;
            } ) );
  }

  async getCantidadTurnosPorDias () {
    const turnos = await this.getTodosLosTurnos();
    const turnosPorFecha : any = {};

    turnos.forEach( (turno) => turno.fecha = turno.fecha.substring( 0, turno.fecha.indexOf('T') ) );

    turnos.forEach( (turno) => {
      if ( !(turno.fecha in turnosPorFecha) ) turnosPorFecha[turno.fecha] = [];
      
      turnosPorFecha[turno.fecha].push( turno );
    } );
    
    for ( let fecha in turnosPorFecha ) {
      turnosPorFecha[fecha] = turnosPorFecha[fecha].length;
    }
    
    return turnosPorFecha;
  }

}
