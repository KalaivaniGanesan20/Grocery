import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductserviceService } from '../productservice.service';

@Component({
  selector: 'app-Order_details',
  templateUrl: './Order_details.component.html',
  styleUrls: ['./Order_details.component.css']
})
export class Order_detailsComponent implements OnInit {

  constructor(private route:ActivatedRoute,private service:ProductserviceService) { }

  ngOnInit() {
    this.getOrderdata();
  }
  myusers:any=localStorage.getItem('user');
   loggedinuser=JSON.parse(this.myusers);
  id:any=this.route.snapshot.params['id'];
  order:any;
  getstatuswidth(value:any):any
  {
    if(value==='Paid'){return 25;}
    if(value==='Shipped'){return 50;}
    if(value==='Delivered'){return 100;}
  }
  getOrderdata()
  {
    this.service.getOrderById(this.id,this.loggedinuser.id).subscribe(res=>{
      this.order=res;
    })
  }

}
