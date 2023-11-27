import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductserviceService } from '../productservice.service';
import { HttpClient } from '@angular/common/http';
import { OfferserviceService } from '../offerservice.service';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';
import { Cart, Product } from '../Datatype';
import { TreeSelectModule } from 'primeng/treeselect';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private auth:AuthserviceService,private service:ProductserviceService,private http:HttpClient,public myoffer:OfferserviceService,private route:Router)
  { }
  ngOnInit() {
    this.getMyProduct();
    this.getcart();
    this.myoffer.countertime();
    this.myoffer.startCountdown();
    this.getofferdata();
    this.service.getBrand().subscribe((result:any)=>{
      let value=result;
      for(const key in value)
      this.brands.push(
    {
      id:key,
      name:value[key].brandName
    });
    });
  }

user:any=localStorage.getItem('user');
currentuser=JSON.parse(this.user);
Product:Product|any;
usercart:Cart|any;
filteredProduct:Product|undefined;
click:any=false;

ProductToPay:any;
searchtext:string="";
offerexit:any=this.myoffer.getOfferstatus();
selectedProduct:Product|any;
chosenproduct:any;

category:any="";
count:any;Myproduct:any;

searchvalue:any='';

offerdata:any;

filter:any=false;

Totalproducts:any;
pageNumber:number=1;

brands:any[]=[];
selectedbrands:any[]=[];
@Output()
searchemit:EventEmitter<string>=new EventEmitter<string>();

Mysearch()
{
  this.searchemit.emit(this.searchvalue);
  this.filter=true;
  this.Myproduct=" ";
  this.selectedbrands=[];
  this.getMyProduct();

}
FilterProduct(category:any)
{
  this.selectedbrands=[];
   this.category=category;
   this.filter=true;
   this.service.getproduct().subscribe((res)=>{
    this.Product=res;
   this.Product=this.Product.filter((product:any)=>{
    const categoryfilter= product.category===category;
    this.Myproduct=" ";
    return categoryfilter;
  })
  this.checkProduct(this.Product);
})
}

applyBrandFilter()
{
  this.filter=true;
  this.service.getproduct().subscribe((res)=>{
    this.Product=res;
    this.Product=this.Product.filter((product:any)=>{
      const brandfilter=!this.selectedbrands.length||this.selectedbrands.some(brand=>brand.name===product.brand);
      this.Myproduct="";
      return brandfilter;
    })
    this.checkProduct(this.Product);
  })
}
getcart()
{
   this.auth.getuser(this.currentuser.id).subscribe(
    res=>{
      let userdata=res;
      this.usercart=userdata.mycart;
      this.count=this.usercart.length;
    }
   )
}
getfilter()
{
  if(this.filter)
  {
    this.searchvalue='';
    this.selectedbrands=[];
    this.getMyProduct();
    this.Myproduct="null";
  }
}

getMyProduct()
{
  this.category='';
  this.Myproduct="";
  this.service.getproduct().subscribe((res)=>{this.Product=res;
    this.Totalproducts=this.Product.length;
  },(err)=>{console.log(err)});
}

getofferdata()
{
  this.myoffer.getoffer().subscribe((res:any)=>{this.offerdata=res;})
}

checkProduct(product:any)
{
   if(product.length===0)
   {
      this.Myproduct="null";
   }
}
addtocart(myproduct:any)
{
  if(this.myoffer.isofferexit===true)
  {
    var offerprice=this.myoffer.rate;
    const offervalue=parseInt(myproduct.price)*(offerprice/100);
    const discountvalue=myproduct.price-offervalue;

    this.Product=
    {
      productid:myproduct.productid,
      productname:myproduct.productname,
      quantity:myproduct.quantity,
      imageurl:myproduct.imageurl,
      price:discountvalue,
      productcount:"1",
    }
  }
  else{
  this.Product=
  {
    productid:myproduct.productid,
    productname:myproduct.productname,
    quantity:myproduct.quantity,
    imageurl:myproduct.imageurl,
    price:myproduct.price,
    productcount:"1",
  }
  }
  this.service.addtoCart(this.currentuser.id,myproduct,this.Product);
}

updatecart(value:any,myproduct:any)
 {
  if(this.myoffer.isofferexit===true)
  {
      var offerprice=this.myoffer.rate;
      const offervalue=parseInt(this.Product.price)*(offerprice/100);
      const discountvalue=this.Product.price-offervalue;
      this.chosenproduct=
      {
        productid:myproduct.productid,
        productname:myproduct.productname,
        quantity:myproduct.quantity,
        imageurl:myproduct.imageurl,
        price:discountvalue,
        productcount:1,
        offerstatus:'valid'
      }
  }
    else
    {
      this.chosenproduct=
      {
        productid:myproduct.productid,
        productname:myproduct.productname,
        quantity:myproduct.quantity,
        imageurl:myproduct.imageurl,
        price:myproduct.price,
        productcount:1,
        offerstatus:'valid'
      }
    }
    this.service.updateToCart(value,this.currentuser.id,myproduct);
 }

}
