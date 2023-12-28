import { Component, OnInit } from '@angular/core';
import { FeedbackserviceService } from '../feedbackservice.service';
import Swal from 'sweetalert2';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ViewFeedbacks',
  templateUrl: './ViewFeedbacks.component.html',
  styleUrls: ['./ViewFeedbacks.component.css']
})
export class ViewFeedbacksComponent implements OnInit {

  constructor(private feedback:FeedbackserviceService,private form:FormBuilder) { }

  OrderFeedback:any;
  ProductFeedback:any;
  show:any;
  query:any;
  replyform:any=this.form.group({
   reply:[]
  });
  queryid:any;

  ngOnInit() {
    this.getdata();
  }
  update(id:any)
  {
     this.queryid=id;
  }
updatereply(reply:any)
{
  console.log(reply.reply);
  let body=[{op:"replace",path:"/reply", value:reply.reply}];
  this.feedback.updatequery(this.queryid,body).subscribe((res:any)=>{
    Swal.fire({
      title:'success',
      text:'reply updated!!!',
    });
  })

}
getdata()
{
  this.show="Order";
  this.feedback.getOrderFeedback().subscribe((res:any)=>{
    this.OrderFeedback=res;
  })
}
getproductfeedback()
{
  this.show="Product";
  this.feedback.getproductFeedback().subscribe((res:any)=>{
    this.ProductFeedback=res;
  })
}
getquery()
{
  this.show="Queries";
  this.feedback.getquery().subscribe((res:any)=>{
    this.query=res;
  })
}
}
