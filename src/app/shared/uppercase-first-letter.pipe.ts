import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercaseFirstLetter',
})
export class UppercaseFirstLetterPipe implements PipeTransform {
  transform(str: string) {
    return str.charAt(0).toUpperCase() + str.substring(1);
  }
}
