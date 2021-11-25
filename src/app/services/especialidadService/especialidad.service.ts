import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Especialidad } from 'src/app/models/especialidad/especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  private collection : string = "especialidades";

  constructor(
    private db : AngularFirestore
  ) { }

  async getCategorias () {
    return ( await this.db.collection( this.collection ).get().toPromise() ).docs.map( especialidad =>
      new Especialidad( especialidad.id , (especialidad.data() as any).tipo, (especialidad.data() as any).imagenURL )
    );
  }

  agregarCategoria( categoria : string  ) {
    return this.db.collection(this.collection).add( {tipo: categoria} );
  }

  getCategoria ( categoria : string ) {
    return this.db.collection( this.collection )
                    .ref
                    .where( "tipo", "==", categoria )
                    .get()
                    .then( (snapshots) => snapshots.docs )
                    .then( (docs) => docs.map( (doc) => doc.data() ) )
                    .then( (data : any) => data.tipo );
  }
  
}
