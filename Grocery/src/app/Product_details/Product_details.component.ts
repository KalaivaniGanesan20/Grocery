import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductserviceService } from '../productservice.service';
import { Product } from '../Datatype';
import { OfferserviceService } from '../offerservice.service';
import { FeedbackserviceService } from '../feedbackservice.service';

@Component({
  selector: 'app-Product_details',
  templateUrl: './Product_details.component.html',
  styleUrls: ['./Product_details.component.css']
})
export class Product_detailsComponent implements OnInit {

  constructor(private aroute:ActivatedRoute,private service:ProductserviceService,private myoffer:OfferserviceService,private feedback:FeedbackserviceService) { }
  productname:any;
  type:any='product';


  currentImage:any='';

  Product:Product|any;

  selectedProduct:Product|any;
  productfeedback:any;

  user:any=localStorage.getItem('user');
currentuser=JSON.parse(this.user);

  ngOnInit() {
    this.GetProduct();
    this.aroute.params.subscribe(params => {
      this.productname = params['mysearch'];
      this.GetProduct();
    });
  }
  GetProduct()
  {
    this.productname=this.aroute.snapshot.params['mysearch'];
    this.service.getProductbyName(this.productname).subscribe((res:any[])=>{
      this.selectedProduct=res;
      this.getFeedback(this.selectedProduct[0].productid)
      this.currentImage=this.selectedProduct.imageUrl;

      if(this.selectedProduct == "")
      {
        this.type='category';
        this.service.getProductbyCategory(this.productname).subscribe(res=>{
          this.selectedProduct=res;
        })
      }
      else{
        this.type='product'
      }
    });
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
      imageurl:myproduct.imageurl,
      price:discountvalue,
      quantity:myproduct.quantity,
      productcount:"1"
    }
  }
  else
  {

    this.Product=
  {
    productid:myproduct.productid,
    productname:myproduct.productname,
    imageurl:myproduct.imageurl,
    price:myproduct.price,
    quantity:myproduct.quantity,
    productcount:"1",
  }
  }
  this.service.addtoCart(this.currentuser.id,myproduct,this.Product);
}
changeImage(imageUrl: string)
{
  this.currentImage=imageUrl;
}

getFeedback(productid:any)
{
  this.feedback.getproductFeedbackById(productid).subscribe(res=>{this.productfeedback=res;})
}

}
