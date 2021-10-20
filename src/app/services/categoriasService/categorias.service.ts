import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Categoria } from 'src/app/models/categoria/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private collection : string = "categorias";

  constructor(
    private db : AngularFirestore
  ) { }

  async getCategorias () {
    return ( await this.db.collection<Categoria>( this.collection ).get().toPromise() ).docs.map( categoria => categoria.data() as Categoria );
  }

}
