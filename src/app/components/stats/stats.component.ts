import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Label } from 'ng2-charts';
import { EspecialidadService } from 'src/app/services/especialidadService/especialidad.service';
import { GenerarExcelLogsService } from 'src/app/services/generarExcelLogs/generar-excel-logs.service';
import { TurnoService } from 'src/app/services/turnoService/turno.service';
import { UsuarioDAOService } from 'src/app/services/usuarioDAO/usuario-dao.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  public lineChartDataTurnosXCategoria? : ChartDataSets[]; 
  public lineChartLabelsTurnosXCategoria?: Label[];

  public lineChartDataTurnosXMedicoSF? : ChartDataSets[];
  public lineChartLabelsTurnosXMedicoSF? : Label[];

  public lineChartDataTurnosXMedicoF? : ChartDataSets[];
  public lineChartLabelsTurnosXMedicoF? : Label[];

  public xAxisCategoriesTurnosXDia : string[] = [];
  public series : any = {};

  public fechasTurnos : string[] = [];
  public fechasMaxTurnos : string[] = [];

  public diasTurnos : string[] = [];

  public logs : any[] = [];

  public fechaMin : string = "";
  public fechaMax : string = "";

  constructor(
    private especialidadService : EspecialidadService,
    private turnoService : TurnoService,
    private generarExcel : GenerarExcelLogsService,
    private usuarioDAOService : UsuarioDAOService
  ) {}

  async ngOnInit() {
    const categorias = await this.especialidadService.getCategorias();
    const dataTurnos = []
    const lineChartLabels = [];
    
    for ( let categoria of categorias ){

      if( !categoria.tipo  || !categoria.id ) continue
      lineChartLabels.push( categoria.tipo );
      dataTurnos.push ( (await this.turnoService.getTurnosPorCampo( 'especialidad', categoria.tipo  )).length );
    }

    const lineChartData = [{
      data: dataTurnos,
      label: 'Cantidad de Turnos Por Categoria'
    }];

    this.lineChartLabelsTurnosXCategoria = lineChartLabels;
    this.lineChartDataTurnosXCategoria = lineChartData;
    
    const cantTurnosXDias = await this.turnoService.getCantidadTurnosPorDias();
    const dataTurnosXDias : number[] = Object.values( cantTurnosXDias );
    const labelTurnosXDias : string[] = Object.keys( cantTurnosXDias );

    this.series = [{
      data: dataTurnosXDias,
      name: 'Cantidad de Turnos Por Dias'
    }]
    this.xAxisCategoriesTurnosXDia = labelTurnosXDias;
    const logs = (await this.usuarioDAOService.getLogs());

    logs.forEach( (log : any) => {
      const date = log.hora.toDate();
      const fecha = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
      const hora = date.getHours() + ":" + date.getMinutes();
      const usuario = log.usuario;

      this.logs.push( {fecha, hora, usuario} );
    } );

    this.diasTurnos = Object.keys( cantTurnosXDias );
  }

  seleccionarFechaMinima( fechaMin : string ) {
    this.fechaMin = fechaMin;
    this.fechasMaxTurnos = this.filtrarFechasMax( fechaMin );
    this.fechaMax = "";
    this.lineChartDataTurnosXMedicoF = undefined;
    this.lineChartLabelsTurnosXMedicoF = undefined;
    this.lineChartDataTurnosXMedicoSF = undefined;
    this.lineChartDataTurnosXMedicoSF = undefined;
  }

  private filtrarFechasMax( fechaMin : string ) {
    const arrSplittedFechas = this.diasTurnos.map( (fecha) => fecha.split( ("-") ) ).map( (fechaSplitted) => fechaSplitted.map( (valor) => parseInt(valor) ) );
    const splittedFechaMin = fechaMin.split("-").map( (valor) => parseInt(valor) );
    
    const ordenados = arrSplittedFechas.filter( (fechaSplitted) => fechaSplitted[0] >= splittedFechaMin[0] ||
                                                          (fechaSplitted[1] >= splittedFechaMin[1] &&
                                                          fechaSplitted[2] > splittedFechaMin[2]) );
    return ordenados.map( (valores) => valores.join("-") );
  }

  async seleccionarFechaMaxima( fechaMax : string ) {
    this.fechaMax = fechaMax;

    const turnosSinFinalizar = await this.turnoService.getCantidadTurnosPorMedicoEntre( this.fechaMin, this.fechaMax );
    const turnosFinalizados = await this.turnoService.getCantidadTurnosPorMedicoEntre( this.fechaMin, this.fechaMax, true );
    
    const dataTurnosSinFinalizar : number[] = Object.values( turnosSinFinalizar );
    const labelTurnosSinFinalizar : any[] = Object.keys( turnosSinFinalizar );
    this.lineChartLabelsTurnosXMedicoSF = labelTurnosSinFinalizar;
    this.lineChartDataTurnosXMedicoSF = [{
      data: dataTurnosSinFinalizar,
      label: 'Cantidad de Turnos Por Medico entre ' + this.fechaMin + " " + this.fechaMax + " sin finalizar"
    }];

    const dataTurnosFinalizados : number[] = Object.values( turnosFinalizados );
    const labelTurnosFinalizados : any[] = Object.keys( turnosFinalizados );
    this.lineChartLabelsTurnosXMedicoF = labelTurnosFinalizados;
    this.lineChartDataTurnosXMedicoF = [{
      data: dataTurnosFinalizados,
      label: 'Cantidad de Turnos Por Medico entre ' + this.fechaMin + " " + this.fechaMax + " finalizados"
    }];
  }

  descargarPDF( id : string, nombre : string ) {
     // printDiv is the html element which has to be converted to PDF
    const element = document.querySelector("#" + id) as HTMLElement;

    if( !element ) return

    html2canvas( element ).then((canvas : any) => {
      var pdfFile = new jsPDF('l', 'px', "a4");
      var imgData  = canvas.toDataURL("image/jpeg", 1.0);
      pdfFile.addImage(imgData,0,0,canvas.width, canvas.height);
      pdfFile.save(nombre + '.pdf');
    });
     
  }
  
  async descargarExcel() {
    const blobFile = await this.generarExcel.generarExcel( this.logs.map( (log) => Object.values(log) ) );

    const url = window.URL.createObjectURL(blobFile);
    const anchor = document.createElement("a");
    anchor.download = "Logs" + ".xlsx";
    anchor.href = url;
    anchor.click();
  }

}