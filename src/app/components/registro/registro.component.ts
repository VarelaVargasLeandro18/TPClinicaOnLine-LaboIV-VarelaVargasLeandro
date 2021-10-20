import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria/categoria';
import { Especialidad } from 'src/app/models/especialidad/especialidad';
import { CategoriasService } from 'src/app/services/categoriasService/categorias.service';
import { EspecialidadService } from 'src/app/services/especialidadService/especialidad.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public categorias : Categoria[] = [];
  public especialidades : Especialidad[] = [];

  constructor(
    private categoriasService : CategoriasService,
    private especialidadesService : EspecialidadService
  ) {}

  async ngOnInit() {
    this.categorias = await this.categoriasService.getCategorias();
    this.especialidades = await this.especialidadesService.getCategorias();
  }

}
