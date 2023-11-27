import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weight'
})
export class WeightPipe implements PipeTransform {

  transform(value: any): any
   {
      if(value<25)
      {
        return value+'pcs'
      }
      else if(value==500)
      {
        return '1/2kgs'
      }
      else if(value>500)
      {
        value=value/1000;
        return value+'kgs'
      }
      else if(value<500)
      {
        return value+'grams'
      }
      else{
        return value
      }
  }

}
