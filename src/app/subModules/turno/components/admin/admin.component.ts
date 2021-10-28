import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/models/turno/turno';
import { TurnoService } from 'src/app/services/turnoService/turno.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public turnos : any[] = [];

  constructor(
    private turnosService : TurnoService
  ) { }

  ngOnInit(): void {
    console.log("Entro")
  }

  public async elegidoEspecialista ( especialistaMail : string ) {
    this.turnos = await this.turnosService.getTurnosByEspecialista( especialistaMail );
  }

}
