import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contrasenia'
})
export class ContraseniaPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    return value.split('').map( value => "*" ).join('');
  }

}
