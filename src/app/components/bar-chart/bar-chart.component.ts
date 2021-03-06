import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()lineChartData: ChartDataSets[] = [];

  @Input()lineChartLabels: Label[] = [];

  lineChartOptions : any = {
    maintainAspectRatio: false,
    responsive: true,
    scales : {
        yAxes: [{
            ticks: {
            beginAtZero: true,
                stepValue: 1,
                steps: 10,
              max : 10,
            }
        }]
      }
};

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType : ChartType = 'line';

}
