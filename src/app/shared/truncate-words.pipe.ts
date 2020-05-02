import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateWords'
})
export class TruncateWordsPipe implements PipeTransform {

  transform(value: string, ...args: number[]): string {
    if (args && args.length === 0) {
      throw new Error('Please provide the number of words to truncate to');
    }

    const numberOfWords = args[0];
    const words = value.split(' ');

    if (words.length <= numberOfWords) {
      return value;
    }

    words.length = numberOfWords;
    const result = words.join(' ') + '...';

    return result;
  }

}
