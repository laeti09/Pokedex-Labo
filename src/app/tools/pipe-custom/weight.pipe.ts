import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weight',
  standalone: false
})
export class WeightPipe implements PipeTransform {


  transform(value: number): string {
    return `${value / 10} Kg`;
  }

}
