import { Pipe, PipeTransform } from '@angular/core';
import { OfferserviceService } from './offerservice.service';
@Pipe({
  name: 'offerpipe'
})
export class OfferpipePipe implements PipeTransform {

  constructor(private myoffer:OfferserviceService){

  }
  offerprice=this.myoffer.rate;

  transform(value:any): any {
    if(localStorage.getItem('offer')==='true')
    {
      const offervalue=parseInt(value)*(this.offerprice/100);
      const discountvalue=value-offervalue;
      return discountvalue
    }
    else
    {
      return value
    }
  }

}
