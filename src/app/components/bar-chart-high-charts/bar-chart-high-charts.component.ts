import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { TurnoService } from 'src/app/services/turnoService/turno.service';
import { EspecialidadService } from 'src/app/services/especialidadService/especialidad.service';

@Component({
  selector: 'app-bar-chart-high-charts',
  templateUrl: './bar-chart-high-charts.component.html',
  styleUrls: ['./bar-chart-high-charts.component.css']
})
export class BarChartHighChartsComponent implements OnInit {

  highcharts : any = {};

  chartOptions : any = {};

  constructor(
    private especialidadService : EspecialidadService,
    private turnoService : TurnoService) {}

  async ngOnInit() {
    const cantTurnosXDias = await this.turnoService.getCantidadTurnosPorDias();
    const dataTurnosXDias : number[] = Object.values( cantTurnosXDias );
    const labelTurnosXDias : string[] = Object.keys( cantTurnosXDias );

    this.chartOptions = {   
      chart: {
         type: 'bar'
      },
      title: {
         text: 'Turnos X Día'
      },
      subtitle : {
         text: ''  
      },
      legend : {
         layout: 'vertical',
         align: 'left',
         verticalAlign: 'bottom',
         x: 250,
         y: 100,
         floating: true,
         borderWidth: 1,
        
         backgroundColor: (
            (Highcharts.theme && Highcharts.theme.legend?.backgroundColor) || 
              '#FFFFFF'), shadow: true
         },
      xAxis:{
          categories: labelTurnosXDias, title: {
          text: null
        } 
      },
      yAxis : {
         min: 0
      },
      tooltip : {},
      plotOptions : {
         bar: {
            dataLabels: {
               enabled: true
            }
         }
      },
      credits:{
         enabled: false
      },
      series: [
        { data: dataTurnosXDias,
          name: 'Cantidad de Turnos Por Dias'  }  
      ]
   };

   this.highcharts = Highcharts;

  }

}
