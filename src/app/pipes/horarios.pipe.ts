import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horarios'
})
export class HorariosPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    const hora = parseInt(value.substring(0, 2))    
    return value + ' ' + ( (hora > 12) ? 'PM' : 'AM' );
  }

}
