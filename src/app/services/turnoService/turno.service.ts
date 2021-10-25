import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  private collection : string = "turnos";

  constructor(
    private db : AngularFirestore
  ) { }

  getTodosLosTurnos () {
    return this.db.collection( this.collection ).get();
  }

  getTurnosByPaciente ( paciente : string ) {
    return this.db.collection( this.collection ).ref.where( "paciente", "==", paciente );  
  }

  getTurnosByEspecialista ( especialista : string ) {
    return this.db.collection( this.collection ).ref.where( "especialista", "==", especialista );
  }

}
