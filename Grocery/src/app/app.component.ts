
import { Component } from '@angular/core';
import { AuthserviceService } from './authservice.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Grocery';
  mailid=localStorage.getItem('loggedInMailid');
  data:any;
  count:any;
  constructor(public service:AuthserviceService,private http:HttpClient)
  {
  }
}

