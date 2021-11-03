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

  addHistoriaClinica ( pacienteEmail : string, historia : any ) {
    return this.db.collection( this.collection ).doc( pacienteEmail ).set( {...historia} );
  }

  getHistoriaClinica ( pacienteEmail : string ) {
    return this.db.collection( this.collection ).doc( pacienteEmail ).get();
  }

  updateHistoriaClinica ( pacienteEmail : string, historia : any ) {
    return this.db.collection( this.collection ).doc( pacienteEmail ).update( historia );
  }

  getAllHistoriasClinicas () {
    return this.db.collection( this.collection ).get();
  }

}
