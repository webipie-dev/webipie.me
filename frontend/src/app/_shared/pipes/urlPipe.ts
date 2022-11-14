import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'url',  pure: false })
export class UrlPipe implements PipeTransform {
  transform(value: any): any {
    if(!value.startsWith('https://')) {
      value = 'https://' + value;
    }
    return value; // .map(key => value[key]);
  }
}
