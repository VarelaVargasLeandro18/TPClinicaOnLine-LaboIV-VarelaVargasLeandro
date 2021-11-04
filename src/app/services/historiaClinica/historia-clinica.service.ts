import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {

  private collection : string = "historiaClinica";

  constructor(
    private db : AngularFirestore
  ) { }

  addHistoriaClinica ( pacienteEmail? : string, historia? : any ) {
    if ( !pacienteEmail || !historia ) return

    return this.db.collection( this.collection ).doc( pacienteEmail ).set( {...historia} );
  }

  getHistoriaClinica ( pacienteEmail? : string ) {
    if ( !pacienteEmail ) return

    return this.db.collection( this.collection ).doc( pacienteEmail )
      .get()
      .toPromise()
      .then( (document) => document.data() );
  }

  updateHistoriaClinica ( pacienteEmail? : string, historia? : any ) {
    if ( !pacienteEmail || !historia ) return

    return this.db.collection( this.collection ).doc( pacienteEmail ).update( historia );
  }

  getAllHistoriasClinicas () {
    return this.db.collection( this.collection )
      .get()
      .toPromise()
      .then( (snapshots) => snapshots.docs )
      .then( (documents) => documents.map( (document) => document.data() ) );
  }

}
