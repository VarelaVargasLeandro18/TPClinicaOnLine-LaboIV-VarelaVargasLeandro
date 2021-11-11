import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class GenerarPDFService {

  constructor() { }

  createTablePDF ( nombre : string, data : any[] ) {
    const doc = new jsPDF( 'landscape', 'px', 'a3' );
    const image = new Image();
    image.src = "/assets/clinica.png";
    const fecha = (new Date()).toLocaleString();
    doc.addImage( image, 'PNG', 0, 10, 50, 50 );
    doc.text( "Fecha Emisión: " + fecha, 60, 35 );

    doc.table( 10, 70, data, Object.keys( data[0] ), { autoSize: false, margins: 10 } );
    doc.save( nombre );
  }

}
