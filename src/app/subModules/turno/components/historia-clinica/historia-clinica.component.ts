import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HistoriaClinicaService } from 'src/app/services/historiaClinica/historia-clinica.service';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent implements OnInit {
  @Input() public usuarioMail : any;

  public readonly ALTURA_MINIMA : number = 0;
  public readonly ALTURA_MAXIMA : number = 500;
  public readonly PESO_MINIMO : number = 0;
  public readonly PESO_MAXIMO : number = 300;
  public readonly TEMPERATURA_MINIMA : number = 0;
  public readonly TEMPERATURA_MAXIMA : number = 60;
  public readonly PRESION_MINIMA : number = 0;
  public readonly PRESION_MAXIMA : number = 500;

  public form : FormGroup;

  constructor(
    private formBuilder : FormBuilder,
    private historiaClinicaService : HistoriaClinicaService
  ) {
    
    this.form = this.formBuilder.group( {
      altura: [null, [Validators.required, Validators.min(this.ALTURA_MINIMA), Validators.max(this.ALTURA_MAXIMA), Validators.pattern(/^\d+$/)]],
      peso: [null, [Validators.required, Validators.min(this.PESO_MINIMO), Validators.max(this.PESO_MAXIMO), Validators.pattern(/^\d+$/)]],
      temperatura: [null, [Validators.required, Validators.min(this.TEMPERATURA_MINIMA), Validators.max(this.TEMPERATURA_MAXIMA), Validators.pattern(/^\d+$/)]],
      presion : [null, [Validators.required, Validators.min(this.PRESION_MINIMA), Validators.max(this.TEMPERATURA_MAXIMA), Validators.pattern(/^\d+$/)]],
      datoDinamicoUnoNombre: [null],
      datoDinamicoDosNombre: [null],
      datoDinamicoTresNombre: [null],
      datoDinamicoUnoValor: [null],
      datoDinamicoDosValor: [null],
      datoDinamicoTresValor: [null]
    } );
  }

  private async settearValores() {
    const historia : any = await this.historiaClinicaService.getHistoriaClinica( this.usuarioMail );

    if ( !historia ) return
        
    this.form.controls.altura.setValue( historia.altura );
    this.form.controls.temperatura.setValue( historia.peso );
    this.form.controls.peso.setValue( historia.temperatura );
    this.form.controls.presion.setValue( historia.presion );

    this.form.controls.datoDinamicoUnoNombre.setValue( historia.datoDinamicoUnoNombre );
    this.form.controls.datoDinamicoUnoValor.setValue( historia.datoDinamicoUnoValor );
    this.form.controls.datoDinamicoDosNombre.setValue( historia.datoDinamicoDosNombre );
    this.form.controls.datoDinamicoDosValor.setValue( historia.datoDinamicoDosValor );
    this.form.controls.datoDinamicoTresNombre.setValue( historia.datoDinamicoTresNombre );
    this.form.controls.datoDinamicoTresValor.setValue( historia.datoDinamicoTresValor );
    
    this.deshabilitarForm();
  }

  private deshabilitarForm() {
    this.form.controls.altura.disable( {emitEvent: false} );
    this.form.controls.temperatura.disable( {emitEvent: false} );
    this.form.controls.peso.disable( {emitEvent: false} );
    this.form.controls.presion.disable( {emitEvent: false} );

    this.form.controls.datoDinamicoUnoNombre.disable( {emitEvent: false} );
    this.form.controls.datoDinamicoUnoValor.disable( {emitEvent: false} );
    this.form.controls.datoDinamicoDosNombre.disable( {emitEvent: false} );
    this.form.controls.datoDinamicoDosValor.disable( {emitEvent: false} );
    this.form.controls.datoDinamicoTresNombre.disable( {emitEvent: false} );
    this.form.controls.datoDinamicoTresValor.disable( {emitEvent: false} );
  }

  ngOnInit(): void {
    this.settearValores();
  }

  async submitHistoriaClinica(event : any) {
    if ( !this.usuarioMail || !this.form.valid  ) return

    const historia : any = {};
    historia.altura = this.form.controls.altura.value;
    historia.temperatura = this.form.controls.temperatura.value;
    historia.peso = this.form.controls.peso.value;
    historia.presion = this.form.controls.presion.value;

    this.agregarDatosDinamicos( historia );

    this.historiaClinicaService.addHistoriaClinica( this.usuarioMail, historia );
  }

  private agregarDatosDinamicos ( historia : any ) {
    historia.datoDinamicoUnoNombre = this.form.controls.datoDinamicoUnoNombre.value;
    historia.datoDinamicoUnoValor = this.form.controls.datoDinamicoUnoValor.value;
    historia.datoDinamicoDosNombre = this.form.controls.datoDinamicoDosNombre.value;
    historia.datoDinamicoDosValor = this.form.controls.datoDinamicoDosValor.value;
    historia.datoDinamicoTresNombre = this.form.controls.datoDinamicoTresNombre.value;
    historia.datoDinamicoTresValor = this.form.controls.datoDinamicoTresValor.value;
  }

}
