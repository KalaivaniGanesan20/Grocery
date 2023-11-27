import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductserviceService } from '../productservice.service';
import { AuthserviceService } from '../authservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpDatevalidation } from '../ExpDatevalidation';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private formbuilder:FormBuilder,public product:ProductserviceService,private auth:AuthserviceService,
    private route:ActivatedRoute,private router:Router) { }

paymentid:any;

myusers:any=localStorage.getItem('user');
loggedinuser=JSON.parse(this.myusers);

userid=this.loggedinuser.id;

phonenumber=this.loggedinuser.phonenumber;
paymentdata:any;
userdata:any;
amount:any=0;
paymentmode:any='card';

paytm:any;

date:any=new Date();
  ngOnInit() {
   this.getdata();
  }
  getdata()
  {
    this.auth.getuser(this.loggedinuser.id).subscribe(res=>{
      this.userdata=res;
      let cartcount=this.userdata.mycart.length;
      for(let i=0;i<cartcount;i++)
      {
        this.amount+=parseInt(this.userdata.mycart[i].price);
      }
    });
  }
payment=this.formbuilder.group
({
   paymentid:[Math.floor(Math.random()*1000000)+1,[Validators.required]],
   userid:[this.userid,[Validators.required]],
   cardnumber:['',[Validators.required,Validators.maxLength(19),Validators.minLength(8),Validators.pattern('^[0-9]+$')]],
   Expdate:['',[Validators.required]],
   cvvnumber:['',[Validators.required,Validators.maxLength(4),Validators.pattern('^[0-9]+$')]],
   TotalAmount:[this.amount],
   paiddate:this.date,
   deliverydate:new Date(new Date(this.date).getTime() +(24*60*60*1000))
},{validator:ExpDatevalidation('Expdate')});

upi=this.formbuilder.group({
  paymentid:[Math.floor(Math.random()*1000000)+1,[Validators.required]],
   userid:[this.userid,[Validators.required]],
   upicode:[],
   TotalAmount:[this.amount],
   paiddate:this.date,
   deliverydate:new Date(new Date(this.date).getTime() +(24*60*60*1000))
});

payNow(payment:any,userid:any)
{
  let paymentdetails={
    paymentid:payment.paymentid,
    paymentmode:this.paymentmode,
    userid:payment.userid,
    cardnumber:payment.cardnumber,
    Expdate:payment.Expdate,
    upicode:payment.upicode,
    cvvnumber:payment.cvvnumber,
    TotalAmount:this.amount,
    paiddate:payment.paiddate,
    deliverydate:payment.deliverydate
  }
  this.product.payProduct(paymentdetails,userid);
}

paymentview(mode:any)
{
  this.paymentmode=mode;
}

}
