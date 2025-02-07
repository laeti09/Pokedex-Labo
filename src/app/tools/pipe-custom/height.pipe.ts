import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'height',
  standalone: false
})
export class HeightPipe implements PipeTransform {

  transform(value: number): string {
    return `${value / 10} m`;
  }

}
