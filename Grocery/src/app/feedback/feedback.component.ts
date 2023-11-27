import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { FeedbackserviceService } from '../feedbackservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  constructor(private route:ActivatedRoute,private form:FormBuilder,private feedback:FeedbackserviceService,private router:Router) {
   }
   user:any=localStorage.getItem('user');
   loggedinuser:any=JSON.parse(this.user);
   paymentid:any=this.route.snapshot.params['paymentid'];
   userid=this.loggedinuser.id;

   feedbackForm=this.form.group
   ({
       paymentid:[this.paymentid,[Validators.required]],
       userid:[this.userid,[Validators.required]],
       username:[this.loggedinuser.firstname],
       comment:['',[Validators.required]],
       orderRating:['',[Validators.required]]
   })
  ngOnInit() {
  }
  
  postFeedback(feedbackForm:any)
  {
     this.feedback.postOrderFeedback(feedbackForm).subscribe((res:any)=>{
      Swal.fire({
          icon:'success',
          text:'Posted'
      });
      this.router.navigate(['myorder'])
     })
  }
}
