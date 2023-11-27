import { Component, OnInit } from '@angular/core';
import { ProductserviceService } from '../productservice.service';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import { FeedbackserviceService } from '../feedbackservice.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {


  constructor(private productservice:ProductserviceService,private form:FormBuilder,private feedback:FeedbackserviceService) { }
   myusers:any=localStorage.getItem('user');
   loggedinuser=JSON.parse(this.myusers);
   myordercount:any;
   myorders:any;
   progressvalue=0;
   Paid:number=25;

   Totrack:any;

   id:any=0;
   productfeedback:any;

   ProductfeedbackForm=this.form.group({
    userid:[this.loggedinuser.id,[Validators.required]],
    username:[this.loggedinuser.fname],
    productid:[this.id,[Validators.required]],
    feedback:['',[Validators.required]],
    productRating:['',[Validators.required]]
      });

  ngOnInit()
  {
     this.getorderdata();
  }

  getorderdata()
  {
    this.productservice.getMyOrders(this.loggedinuser.id).subscribe(
      res=>{
         this.myorders=res;
         this.myordercount=this.myorders.length;
      }
     )
  }

  Track(i:any)
  {
    setInterval(()=>{
    this.productservice.updateOrderstatus(i);},1000);
  }

  getStatusWidth(value:any):any
  {
    if(value==='Paid'){return 25;}
    if(value==='Shipped'){return 50;}
    if(value==='Delivered'){return 100;}
  }

returnProduct(data:any)
{
  this.productservice.productTimer(data);
  if(data.status=='Returned')
  {
    Swal.fire({
      icon:'warning',
      text:"Order is already Returned"
    })
  }
  else
  {
    if(this.productservice.isReturnvalid===false)
    {
      Swal.fire({
        icon:'error',
        text:"Timeout you can't Return your order"
      })
    }
    else
    {
      Swal.fire({
        icon:'success',
        text:"Amount will be refunded to your wallet"
      });
      this.refundAmount(data);
    }
  }
}

refundAmount(data:any)
{
    // alert(data.paymentid +"ordered time "+new Date(data.paiddate).getTime()+" now time is "+new Date().getTime()+"diffrence "+(new Date().getTime()-new Date(data.paiddate).getTime())+"one hour"+60*60*1000)
let difference=(new Date().getTime()-new Date(data.deliverydate).getTime());
let twohour=2*60*60*1000
let sixhours=6*60*60*1000
    if(difference<=twohour && difference>=0)
    {
      // alert(data.totalAmount+""+data.userid+"diff="+difference+"twohours"+twohour+""+sixhours)
      this.productservice.deliveredStatus(data.paymentid,'Returned');
      this.productservice.refundAmountToWallet(data.totalAmount,data.userid);
    }
    else if(difference<=sixhours)
    {
      let updatedamount=data.totalAmount % 2
      this.productservice.refundAmountToWallet(updatedamount,data.userid);
      this.productservice.deliveredStatus(data.paymentid,'Returned');

    }
    else{
      alert("timeout No Refund");
      this.productservice.deliveredStatus(data.paymentid,'Returned');

    }
}

productFeedback(value:any)
    {
      this.id=value.productid;
    }

postData(value:any)
{
  this.productfeedback={
     userid:value.userid,
     productid:this.id,
     feedback:value.feedback,
     productRating:value.productRating
  }
   this.feedback.postproductrFeedback(this.productfeedback).subscribe(res=>{
    Swal.fire({
      icon:'success',
      text:'posted'
    });
   })
}
cancelProduct(data:any)
{
  console.log(data.userid)
  this.productservice.cancelOrder(data.paymentid);
    this.productservice.refundAmountToWallet(data.totalAmount,data.userid)
    Swal.fire({
      icon:'success',
      title:'Order Cancelled Successfully',
      text:'Amount transfered to wallet'
    })
    this.getorderdata();
}

}
