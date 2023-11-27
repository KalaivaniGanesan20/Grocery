import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { ProductserviceService } from '../productservice.service';
import { HttpClient } from '@angular/common/http';
import { interval, map } from 'rxjs';
import { OfferserviceService } from '../offerservice.service';
import { FeedbackserviceService } from '../feedbackservice.service';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})

export class HomeComponent implements OnInit {
  constructor(public http:HttpClient,public service:AuthserviceService,
    public offer:OfferserviceService,private feedback:FeedbackserviceService) { }

data:any;
time:any;

day:any;
hours:any;
minutes:any;
seconds:any;

Orderfeedack:any;

errormessage:any;

id:any;

uniqueFeedback :any;

  ngOnInit() {
    this.getquotes();
    this.offer.countertime();
    this.offer.startCountdown();
    this.getFeedback();
  }

iscontentdisplay:any=false;

getquotes()
{
  this.offer.getquotes().subscribe(
    res=>{
      this.data=res;
      localStorage.setItem('quoteexit','true')
      this.offer.displayContentWithTimer(this.data.timelimit);
    });
}
getFeedback()
{
  this.feedback.getOrderFeedback().subscribe(res=>{
    this.Orderfeedack=res.splice(0,4);
  });
}
}
