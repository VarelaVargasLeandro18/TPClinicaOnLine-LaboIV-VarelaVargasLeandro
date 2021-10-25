import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabla-turnos',
  templateUrl: './tabla-turnos.component.html',
  styleUrls: ['./tabla-turnos.component.css']
})
export class TablaTurnosComponent implements OnInit {
  @Input() public turnos : any[] = [];
  @Input() public filtro? : string;
  @Input() public filtroValor? : string;

  constructor() { }

  ngOnInit(): void {
    console.log("EEE")
  }

}
