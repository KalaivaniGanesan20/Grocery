import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private service:AuthserviceService) { }
  userdata:any=localStorage.getItem('user');
  data=JSON.parse(this.userdata);
  loggedinuserdata:any;
  walletamount:number|any;
  ngOnInit() {
this.getloggedinuser(this.data.id);
  }

  getloggedinuser(id:any)
  {
      this.service.getuser(id).subscribe(res=>{
        this.loggedinuserdata=res;
        this.walletamount=parseFloat(this.loggedinuserdata.mywallet);
      })
  }
}
