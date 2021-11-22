import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { EspecialidadService } from 'src/app/services/especialidadService/especialidad.service';
import { TurnoService } from 'src/app/services/turnoService/turno.service';
import { UsuarioDAOService } from 'src/app/services/usuarioDAO/usuario-dao.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  public lineChartDataTurnosXCategoria : ChartDataSets[] = []; 
  public lineChartLabelsTurnosXCategoria: Label[] = [];

  public lineChartDataTurnosXDia : ChartDataSets[] = [];
  public lineChartLabelsTurnosXDia : Label[] = [];

  public fechasTurnos : string[] = [];

  constructor(
    private especialidadService : EspecialidadService,
    private turnoService : TurnoService,
    private usuarioDAOService : UsuarioDAOService
  ) {
    
  }

  async ngOnInit() {
    const categorias = await this.especialidadService.getCategorias();
    const dataTurnos = []
    const lineChartLabels = [];
    
    for ( let categoria of categorias ){

      if( !categoria.tipo  || !categoria.id ) continue
      lineChartLabels.push( categoria.tipo );
      dataTurnos.push ( (await this.turnoService.getTurnosPorCampo( 'especialidad', categoria.id  )).length );
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

    this.lineChartDataTurnosXDia = [{
      data: dataTurnosXDias,
      label: 'Cantidad de Turnos Por Dias'
    }]
    this.lineChartLabelsTurnosXDia = labelTurnosXDias;
    console.log (await this.usuarioDAOService.getLogs());
  }

}
