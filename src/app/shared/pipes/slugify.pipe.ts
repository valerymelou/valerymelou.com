import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slugify'
})
export class SlugifyPipe implements PipeTransform {

  transform(value: string): string {
    return value.split(' ').filter(s => s !== '').join('-').toLowerCase();
  }

}
