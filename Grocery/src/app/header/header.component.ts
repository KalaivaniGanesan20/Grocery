import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductserviceService } from '../productservice.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Grocery';
  constructor(public service:AuthserviceService,private http:HttpClient,private route:Router,private product:ProductserviceService)
  {
  }
  cartcount:any;
  searchtext:any='';
  mysearch:string="";
  user:any

  Product:any;
SearchProduct(event:string)
{
  this.searchtext=event;
}

  ngOnInit() {
    this.setcarttimer();
  }

  getCartData()
  {
    if(this.service.loggedin()===false)
    {
        this.cartcount='0';
    }
    else
    {
    let myusers:any=localStorage.getItem('user');
    let loggedinuser=JSON.parse(myusers);
    this.http.get('https://localhost:7250/api/User/'+loggedinuser.id).subscribe(
      res=>{
        this.user=res;
        this.cartcount=this.user.mycart.length;
      }
    )
    }
    return  this.cartcount;

  }
  setcarttimer()
  {
    setInterval(()=>
    {
      this.getCartData()
    },500)
  }
}
