import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public readonly EDAD_MAXIMA = 120;
  public readonly EDAD_MINIMA = 18;

  public categorias : Categoria[] = [];
  public especialidades : Especialidad[] = [];

  public form : FormGroup;

  constructor(
    private categoriasService : CategoriasService,
    private especialidadesService : EspecialidadService,
    private formBuilder : FormBuilder
  ) {
    this.form = this.formBuilder.group({
      razon: [null, [Validators.required]],
      especialidad: [null, [Validators.required]],
      nombre: [null, [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      apellido: [null, [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      edad: [null, [Validators.required, Validators.min(this.EDAD_MINIMA), Validators.max(this.EDAD_MAXIMA)]],
      dni: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      obraSocial: [null, [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      email: [null, [Validators.required, Validators.email]],
      contrasenia: [null, [Validators.required, Validators.pattern(/^[A-Za-z0-9]+$/i)]],
      imagenUno: [null, [Validators.required]],
      imagenDos: [null, [Validators.required]]
    });
    this.setValidatorsSegunEspecialidad();
  }

  async ngOnInit() {
    this.categorias = await this.categoriasService.getCategorias();
    this.categorias = this.categorias.filter( categoria => categoria.id !== 0 );
    this.especialidades = await this.especialidadesService.getCategorias();
  }

  isRequiredField(field: string) {
    const form_field = this.form.get(field);
    if (form_field === null || form_field === undefined || !form_field.validator) {
        return false;
    }

    const validator = form_field.validator({} as AbstractControl);
    return (validator && validator.required);
  }

  setValidatorsSegunEspecialidad() {
    const razon = this.form.controls.razon;
    const especialidad = this.form.controls.especialidad;
    const nombre = this.form.controls.nombre;
    const apellido = this.form.controls.apellido;
    const edad = this.form.controls.edad;
    const dni = this.form.controls.dni;
    const obraSocial = this.form.controls.obraSocial;
    const email = this.form.controls.email;
    const contrasenia = this.form.controls.contrasenia;
    const imagenUno = this.form.controls.imagenUno;
    const imagenDos = this.form.controls.imagenDos;

    razon.valueChanges.subscribe( razonId => {

      if ( razonId === "1" /*ESPECIALISTA*/ ) {
        obraSocial.setValidators(null);
        imagenDos.setValidators(null);
        return;
      }

      if ( razonId === "2" /* PACIENTE */ ) {
        obraSocial.setValidators([Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]);
        imagenDos.setValidators([Validators.required]);
      }

    });
  }

}
