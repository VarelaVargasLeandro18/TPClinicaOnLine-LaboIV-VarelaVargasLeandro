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

  async averiguarSiHayTurnoEnHorario ( especialista : string, fecha : string ) {
    const turnos = await this.getTurnosByEspecialista( especialista );

    if ( turnos.length === 0 ) return
    
    const MIN30 = (30*60*1000);
    const fechaParsed = Date.parse( fecha );
    const fechaMinus30Min = fechaParsed - MIN30;
    const fechaPlus30Min = fechaParsed + MIN30;
    
    return turnos.map( (turno : any) => {
      const fechaOfTurnoParsed = Date.parse( turno.fecha );

      if (  fechaOfTurnoParsed > fechaMinus30Min && 
            fechaOfTurnoParsed < fechaPlus30Min && 
            !turno.cancelado ) return turno;
    } );
  }

  getTodosLosTurnos () {
    return this.db.collection( this.collection ).get();
  }

  getTurnosByPaciente ( paciente : string ) {
    return this.db.collection( this.collection ).ref.where( "paciente", "==", paciente )
            .get()
            .then( snapshots => snapshots.docs.map( doc => doc.data() ) ) 
  }

  getTurnosByEspecialista ( especialista : string ) {
    return this.db.collection( this.collection ).ref.where( "especialista", "==", especialista )
            .get()
            .then( snapshots => snapshots.docs.map( doc => doc.data() ) )
  }

}
