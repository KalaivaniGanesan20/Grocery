import { Component, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { ProductserviceService } from '../productservice.service';
import{BrowserAnimationsModule}from '@angular/platform-browser/animations';
import{AutoCompleteModule}from 'primeng/autocomplete';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private service:ProductserviceService,private route:Router) { }

  searchvalue:string="";
  productList=[];
  empty:any;
  @ViewChild('search') search:any;
@Output()
searchemit:EventEmitter<string>=new EventEmitter<string>();

  ngOnInit() {
  }
Mysearch($event:any)
{
  this.searchvalue=$event.query;
  this.service.getproductBySearch($event.query).subscribe((res)=>{this.productList=res;
    console.log(this.productList)
    if(this.productList===null)
    {
      this.empty=true;
    }
  },(err)=>{console.log(err)});
}
Gotosearch(value:any)
{
  this.route.navigate(['Product_details/'+value.productname])
}
ViewMore()
{
  this.route.navigate(['products']);
  this.search.hide();
}
}
