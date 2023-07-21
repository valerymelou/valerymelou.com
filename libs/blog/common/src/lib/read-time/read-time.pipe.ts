import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readTime',
  standalone: true,
})
export class ReadTimePipe implements PipeTransform {
  transform(value: string): number {
    const speed = 225; // 225 words per minute
    const words = value.split(/\s+/).length;
    const time = Math.ceil(words / speed);

    return time;
  }
}
