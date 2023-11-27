import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthserviceService } from '../authservice.service';
import { ProductserviceService } from '../productservice.service';
import { imageTypeValidator } from '../imagevalidator';
import { Product } from '../Datatype';
@Component({
  selector: 'app-Admin',
  templateUrl: './Admin.component.html',
  styleUrls: ['./Admin.component.css']
})

export class AdminComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  }
  selectimage!:File;
  selectimage2!:File;
  selectimage3!:File;

  product!:FormGroup;
  mycategory!:FormGroup;
  subcategory!:FormGroup;
  mybrands!:FormGroup;
  myimage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbdj99NmE9s97Af8k6akwXPx5zs5UqVXzODA&usqp=CAU";
  msg:string="";

  allcategory:any;
  brands:any;


TotalUser:any;
TotalProduct:any;
TotalOrder:any;
imageExtension:any;
  constructor(private http:HttpClient,private formBuilder:FormBuilder,private user:AuthserviceService,private productservice:ProductserviceService)
  {

  }
  ngOnInit() {
    this.Getdetails();
    
    this.product=this.formBuilder.group({
      productid:[''],
      productname:[''],
      quantity:[''],
      price:[''],
      details:[''],
      stock:[''],
      image:['',[Validators.required,imageTypeValidator]],
      image2:['',[Validators.required,imageTypeValidator]],
      image3:['',[Validators.required,imageTypeValidator]],
      brand:[''],
      category:[''],
      subcategory:['']
    });

    this.mycategory=this.formBuilder.group({
      Categoryname:[''],
      subcategory:['']
    });
    this.mybrands=this.formBuilder.group({
      brandname:['']
    });
    this.subcategory=this.formBuilder.group({
      categoryid:[''],
      subcategoryname:['']
    });
   this.productservice.getCategory().subscribe(res=>{
    this.allcategory=res;
   })
   this.productservice.getBrand().subscribe(res=>{
    this.brands=res;
   })

  }

  getfile(event:any,imagename:any)
  {
    if(imagename==='image1')
    { this.selectimage = event.target.files[0];
    }
     if(imagename==='image2')
     {
     this.selectimage2 = event.target.files[0];
     }
     if(imagename==='image3')
     {
      this.selectimage3 = event.target.files[0];
     }
  }

  Addproduct()
   {
    const formData : FormData = new FormData();

    formData.append('productid',this.product.value.productid);
    formData.append('productname', this.product.value.productname);
    formData.append('quantity', this.product.value.quantity);
    formData.append('price', this.product.value.price);
    formData.append('details', this.product.value.details);
    formData.append('stock', this.product.value.stock);
    formData.append('category', this.product.value.category);
    formData.append('subcategory', this.product.value.subcategory);
    formData.append('brand', this.product.value.brand);


    if(this.selectimage && this.selectimage2 &&this.selectimage3)
    {
      formData.append('image', this.selectimage);
      formData.append('image2', this.selectimage2);
      formData.append('image3', this.selectimage3);

    }

    console.log(this.product.value.pid);

    this.http.post<Product>("https://localhost:7250/api/product",formData).subscribe(res=>{
      Swal.fire({
        icon: 'success',
        title: 'Added....',
        text: 'Product Added succesfully!',
      })
    },err=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
      alert(JSON.stringify(err))
    })
  }
  Getdetails()
  {
    this.user.getAllUser().subscribe(res=>{
    const User:any=res;
    this.TotalUser=User.length;
    });
    this.productservice.getproduct().subscribe(res=>{
      const Product:any=res;
      this.TotalProduct=Product.length;
    });
    this.productservice.getOrders().subscribe(res=>{
      const Order:any=res;
      this.TotalOrder=Order.length;
    })
  }

  Addcategory(category:any)
  {
    const subcategory:any=[{
      subcategoryname:category.subcategory
    }]
    const categories={
      categoryName:category.Categoryname,
      subcategory:subcategory
    }
     this.productservice.postCategory(categories).subscribe(res=>{
      Swal.fire({
        icon:'success',
        text:'Posted successfully'
      })
     })
  }
  Addbrands(brands:any)
  {
    this.brands.push(brands)
    this.productservice.postBrand(brands).subscribe(res=>{
      Swal.fire({
        icon:'success',
        text:'Posted successfully'
      })
     })
    console.log(this.brands);
  }
  Patchsubcategory(category:any)
  {
    this.productservice.patchSubcategory(category,category.categoryid).subscribe(res=>{
      Swal.fire({
        icon:'success',
        text:'posted'
      })
    })
  }
}
