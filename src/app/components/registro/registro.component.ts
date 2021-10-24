import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Categoria } from 'src/app/models/categoria/categoria';
import { Especialidad } from 'src/app/models/especialidad/especialidad';
import { Usuario } from 'src/app/models/usuario/usuario';
import { CategoriasService } from 'src/app/services/categoriasService/categorias.service';
import { EspecialidadService } from 'src/app/services/especialidadService/especialidad.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UsuarioDAOService } from 'src/app/services/usuarioDAO/usuario-dao.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  animations: [
    trigger('openClose', [

      state('open', style({
        opacity: 1
      })),
      state('closed', style({
        opacity: 0
      })),
      transition('open => closed', [
        animate('3s linear')
      ]),
      transition('closed => open', [
        animate('3s linear')
      ]),

    ]),
  ]
})
export class RegistroComponent implements OnInit {
  public readonly EDAD_MAXIMA = 120;
  public readonly EDAD_MINIMA = 18;

  public form : FormGroup;

  public categorias : Categoria[] = [];
  public especialidades : Especialidad[] = [];
  public mensajeRegistro : string = "";
  public mensajeErrorRegistro : string = "";
  public habilitarBoton : boolean = false;
  public mostrarFullScreen : boolean = true;

  private imagenUnoUrl? : string = undefined;
  private imagenDosUrl? : string = undefined;


  constructor(
    private categoriasService : CategoriasService,
    private especialidadesService : EspecialidadService,
    private formBuilder : FormBuilder,
    private uploadService : StorageService,
    private usuarioDAOService : UsuarioDAOService
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
      contrasenia: [null, [Validators.required, Validators.pattern(/^[A-Za-z0-9]+$/i), Validators.minLength(6)]],
      imagenUno: [null, [Validators.required]],
      imagenDos: [null, [Validators.required]],
      especialidadNueva: [null]
    });
    this.setValidatorsSegunEspecialidad();
  }

  elegirRazon ( razonId : string ) {
    this.form.controls.razon.setValue( razonId );
    this.mostrarFullScreen = false;
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
    this.form.controls.razon.valueChanges.subscribe( razonId => {
      if ( razonId === "1" /* ESPECIALISTA */ ) {
        this.form.controls.obraSocial.setValidators(null);
        this.form.controls.imagenDos.setValidators(null);
        this.form.controls.especialidad.setValidators( [Validators.required] );
      }

      if ( razonId === "2" /* PACIENTE */ ) {
        this.form.controls.obraSocial.setValidators([Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]);
        this.form.controls.imagenDos.setValidators([Validators.required]);
        this.form.controls.especialidad.setValidators(null);
      }
      this.form.controls.imagenDos.updateValueAndValidity();
      this.form.controls.obraSocial.updateValueAndValidity();
      this.form.controls.especialidad.updateValueAndValidity();
    });
  }

  subirArchivoUno ( event : any ) {
    const email = this.form.controls.email.value;
    const imagenUno : File = event.target.files[0];
    const imagenUnoNombre = email + "_1";

    const tareaImagenUno = this.uploadService.tareaCloudStorage( imagenUnoNombre, imagenUno );
    tareaImagenUno.then( (termino) => termino.ref.getDownloadURL().then( (URL) => {
      this.imagenUnoUrl = URL;
      
      if ( !this.isRequiredField('imagenDos') ){
        this.habilitarBoton = true;
      }

      if ( this.isRequiredField('imagenDos') && this.imagenDosUrl )
        this.habilitarBoton = true;

    } ) );
  }

  subirArchivoDos ( event : any ) {
    const email = this.form.controls.email.value;
    const razon = this.form.controls.razon.value;
    const imagenDos : File = event.target.files[0];
    const imagenDosNombre = email + "_2";

    if ( razon === "2" /* PACIENTE */ ) {
      const tareaImagenDos = this.uploadService.tareaCloudStorage( imagenDosNombre, imagenDos );
      tareaImagenDos.then( (termino) => termino.ref.getDownloadURL().then( (URL) => {
        this.imagenDosUrl = URL;

        if ( this.imagenUnoUrl )
          this.habilitarBoton = true;

      } ) );
    }
  }
  
  onSubmit ( event : Event ) {
    this.registro();
  }

  private registro() {
    const razon = this.form.controls.razon.value;
    const especialidad = this.form.controls.especialidad.value;
    const nombre = this.form.controls.nombre.value;
    const apellido = this.form.controls.apellido.value;
    const edad = this.form.controls.edad.value;
    const dni = this.form.controls.dni.value;
    const obraSocial = this.form.controls.obraSocial.value;
    const email = this.form.controls.email.value;
    const contrasenia = this.form.controls.contrasenia.value;
    const especialidadNueva = this.form.controls.especialidadNueva.value;
    const imagenUno = this.imagenUnoUrl;
    const imagenDos = this.imagenDosUrl;

    const usuario = new Usuario();
    usuario.razon = razon;
    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.edad = edad;
    usuario.dni = dni;
    usuario.email = email;
    usuario.contrasenia = contrasenia;
    usuario.imagenUnoUrl = imagenUno;

    if ( razon === "1" /* ESPECIALISTA */ ) {
      usuario.especialidad = especialidad;
      usuario.aprobado = false;
    }
    
    if ( razon === "2" /* PACIENTE */ ) {
      usuario.obraSocial = obraSocial;
      usuario.imagenDosUrl = imagenDos;
    }
    
    this.usuarioDAOService.register( usuario )
      .then( () => {
        this.mensajeRegistro = "USUARIO REGISTRADO!";
        this.usuarioDAOService.login( usuario );
      } )
      .catch( (error) => {this.mensajeErrorRegistro = "ERROR AL REGISTRAR USUARIO!"; console.error(error)} );

    if ( especialidadNueva != null ) {
      this.especialidadesService.agregarCategoria(especialidadNueva).then( () => console.log("Especialidad Agregada!!") );
    }

  }

}
