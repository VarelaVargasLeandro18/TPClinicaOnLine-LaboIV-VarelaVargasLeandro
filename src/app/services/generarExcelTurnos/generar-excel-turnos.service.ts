import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import { Turno } from 'src/app/models/turno/turno';
import { EspecialidadService } from '../especialidadService/especialidad.service';

@Injectable({
  providedIn: 'root'
})
export class GenerarExcelTurnosService {

  constructor(
    private especialidadService : EspecialidadService
  ) { }

  async generarExcel ( turnos : Turno[], nomApe : string ) {
    const title = nomApe;
    const header = ["Especialidad", "Horario", "Especialista", "Paciente", "Motivo", "Finalizado", "Cancelado"]
    const data = await this.generarData( turnos );

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet( "Turnos" );

    const titleRow = worksheet.addRow( [title] );
    titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true }
    worksheet.mergeCells('A1:F2');

    //Add Header Row
    let headerRow = worksheet.addRow(header);
    
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    })

    worksheet.addRows(data);

    worksheet.columns.forEach( (column) => column.width = 50 );
    worksheet.eachRow( (row, number) => row.eachCell( (cell) => cell.alignment = { horizontal: 'center', vertical: 'middle' } ) );

    return await workbook.xlsx.writeBuffer()
              .then( (data) => new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' } ) )
  }

  async generarData( turnos : Turno[] ) {
    const data = [];

    for ( let turno of turnos ) {
      const turnoData = [];
      
      const especialidad = await this.especialidadService.getCategoria( turno.especialidad );
      const horario = turno.fecha?.replace( 'T', ' ' );
      const especialista = turno.especialista;
      const paciente = turno.paciente;
      const motivo = turno.motivo;
      const finalizado = (turno.finalizado) ? 'X' : '';
      const cancelado = ( !turno.finalizado && turno.cancelado ) ? 'X' : '';
      
      turnoData.push( especialidad );
      turnoData.push( horario );
      turnoData.push( especialista );
      turnoData.push( paciente );
      turnoData.push( motivo );
      turnoData.push( finalizado );
      turnoData.push( cancelado );

      data.push( turnoData );
    }

    return data;
  }

}
