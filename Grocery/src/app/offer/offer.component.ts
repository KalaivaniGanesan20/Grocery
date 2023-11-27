import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, NgModel } from '@angular/forms';
import { OfferserviceService } from '../offerservice.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

quote:any="";
timelimit:number=0;
date:any="";
url:any="";
offerapplied:any;

offername:any;
time:any;
rate:any;
status:any;
  constructor(public service:OfferserviceService,private http:HttpClient,public myoffer:OfferserviceService) { }


  ngOnInit()
  {
  }

addquotes(quotes:any)
{
   this.service.updatequotes(quotes).subscribe(res=>{
    Swal.fire({
      icon: 'success',
      title: 'Added....',
      text: 'quotes Added succesfully!',
    })
   })
}
applyoffer(offer:any)
{
   this.myoffer.updateoffer(offer).subscribe(res=>{
    Swal.fire({
      icon: 'success',
      title: 'Added....',
      text: 'offer Added succesfully!',
    })
   })
}

// applyoffer()
// {
//   this.myoffer.countertime();
//   localStorage.setItem('offer','true');
//   Swal.fire({
//     icon: 'success',
//     title: 'Added....',
//     text: 'offer Added succesfully!',
//   })

// }
// getofferstatus()
// {
//   this.offerapplied=localStorage.getItem('offer');
// }
}
