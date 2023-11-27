import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductserviceService } from '../productservice.service';
import { OfferserviceService } from '../offerservice.service';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-AddToCart',
  templateUrl: './AddToCart.component.html',
  styleUrls: ['./AddToCart.component.css']
})
export class AddToCartComponent implements OnInit {
productcount:any;

myusers:any=localStorage.getItem('user');
loggedinuser=JSON.parse(this.myusers);

emailid=this.loggedinuser.emailid;

index:any;
usercart:any;
usercartcount:any;

data:any;
productdata:any;
amount:number=0;
SelectedProduct:any;

showstatus=false;//if offerend and product still having same price it should show offerended status

httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })
};
  constructor(private http:HttpClient,private service:AuthserviceService,
    private productservice:ProductserviceService,private myoffer:OfferserviceService,private router:Router)
   {
    }
  ngOnInit()
  {
    this.getcart();
    this.settimer();
  }
 getcart()
 {
  this.service.getuser(this.loggedinuser.id).subscribe(result=>
    {
      this.data=result;
      this.usercart=this.data.mycart;
      this.amount=0;
      this.usercartcount=this.usercart.length;
      for(let i=0;i<this.usercartcount;i++)
      {
        this.amount+=parseInt(this.usercart[i].price);
      }

      if(this.myoffer.isofferexit===false)
      {
        this.productservice.updateOffercart(this.data);
      }
    })

 }

 updatecart(value:any,myproduct:any)
 {
  if(this.myoffer.isofferexit===true)
  {
      var offerprice=this.myoffer.rate;
      const offervalue=parseInt(this.productdata.price)*(offerprice/100);
      const discountvalue=this.productdata.price-offervalue;
      this.SelectedProduct=
      {
        productid:myproduct.productid,
        productname:myproduct.productname,
        quantity:myproduct.quantity,
        imageurl:myproduct.imageurl,
        price:discountvalue,
        productcount:1,
        offerstatus:'valid'
      }
  }
    else
    {
      this.SelectedProduct=
      {
        productid:myproduct.productid,
        productname:myproduct.productname,
        quantity:myproduct.quantity,
        imageurl:myproduct.imageurl,
        price:myproduct.price,
        productcount:1,
        offerstatus:'valid'
      }

    }
    this.productservice.updateToCart(value,this.loggedinuser.id,myproduct);
 }

 deleteproduct(id:any)
 {
  this.productservice.deleteCartProduct(id,this.loggedinuser.id);
  this.getcart();
 }

settimer()
{
  setInterval(()=>{
    this.getcart()},1000)
}
}

