import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-Checkout_Page',
  templateUrl: './Checkout_Page.component.html',
  styleUrls: ['./Checkout_Page.component.css']
})
export class Checkout_PageComponent implements OnInit {
user:any=localStorage.getItem('user');
Loggedinuser:any=JSON.parse(this.user);
userdata:any;
amount:any=0;
body:any;
apartmentno:any;
apartmentName:any;
area:any;
street:any;
state:any
pincode:any;

cart:any;
cartcount:any;

  show:any='delivery';
  constructor(private auth:AuthserviceService) { }

  ngOnInit()
  {
    this.auth.getuser(this.Loggedinuser.id).subscribe(res=>{
      this.userdata=res;
      this.cartcount=this.userdata.mycart.length;
      this.cart=this.userdata.mycart.slice(0,2);
      for(let i=0;i<this.cartcount;i++)
      {
        this.amount+=parseInt(this.userdata.mycart[i].price);
      }
      if(this.userdata.address.length!=0)
      {
        this.apartmentno=this.userdata.address[0].apartmentNo;
        this.apartmentName=this.userdata.address[0].apartmentName;;
        this.area=this.userdata.address[0].area;
        this.street=this.userdata.address[0].street;
        this.state=this.userdata.address[0].state;
        this.pincode=this.userdata.address[0].pincode;
      }
    })
  }
updateAddress()
{
  this.show='address';
}
updateDeliveryOption()
{
  this.show='delivery';
}
updatePaymentOption()
{
  this.show='payment';
}
postAddress()
{
  this.auth.getuser(this.Loggedinuser.id).subscribe(res=>{
    this.userdata=res;
  const deliveryaddress={
    apartmentNo:this.apartmentno,
    apartmentName:this.apartmentName,
    area:this.area,
    street:this.street,
    state:this.state,
    pincode:this.pincode
  };
  if(this.userdata.address.length===0)
  {
   this.body=[{op:'add',path:'/address/-',value:deliveryaddress}];
  }
  else
  {
    this.body=[{op:'replace',path:'/address/0',value:deliveryaddress}];
  }
   this.auth.UpdateUserAddress(this.body,this.Loggedinuser.id).subscribe(res=>{
     Swal.fire({
      icon:'success',
      text:'Address updated successfully'
     });
     this.show='delivery';
  });});
}

}
