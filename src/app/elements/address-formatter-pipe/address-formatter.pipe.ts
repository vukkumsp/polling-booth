import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addressFormatter',
  standalone: true
})
export class AddressFormatterPipe implements PipeTransform {
  transform(value: string | null): unknown {
    if(value){
      let startValue = value.substring(0, 4);
      let endValue = value.substring(value.length-4,value.length);
      return startValue.concat("...", endValue);
    }
    return null;
  }
}
