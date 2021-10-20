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
      new Especialidad( parseInt(especialidad.id) , (especialidad.data() as any).tipo )
    );
  }
  
}
