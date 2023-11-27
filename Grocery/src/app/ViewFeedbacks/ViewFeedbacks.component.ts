import { Component, OnInit } from '@angular/core';
import { FeedbackserviceService } from '../feedbackservice.service';

@Component({
  selector: 'app-ViewFeedbacks',
  templateUrl: './ViewFeedbacks.component.html',
  styleUrls: ['./ViewFeedbacks.component.css']
})
export class ViewFeedbacksComponent implements OnInit {

  constructor(private feedback:FeedbackserviceService) { }

  OrderFeedback:any;
  ProductFeedback:any;
  show:any;
  ngOnInit() {
    this.getdata();
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
  this.feedback.getOrderFeedback().subscribe((res:any)=>{
    this.OrderFeedback=res;
  })
}
}
