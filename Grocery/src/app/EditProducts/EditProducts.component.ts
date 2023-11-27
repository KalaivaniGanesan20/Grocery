import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductserviceService } from '../productservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { imageTypeValidator } from '../imagevalidator';
@Component({
  selector: 'app-EditProducts',
  templateUrl: './EditProducts.component.html',
  styleUrls: ['./EditProducts.component.css']
})
export class EditProductsComponent implements OnInit {

  selectimage!:File;
  selectimage2!:File;
  selectimage3!:File;
  allcategory:any;
  brands:any;
  Myproduct!:FormGroup;

  constructor(private service:ProductserviceService,private http:HttpClient,private formBuilder:FormBuilder) { }
  ngOnInit()
   {
    this.getMyProduct();
    this.Myproduct=this.formBuilder.group({
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
    subcategory:[''],
    imageurl:[''],
    imageurl2:[''],
    imageurl3:[''],

    });
    this.service.getCategory().subscribe(res=>{
      this.allcategory=res;
     })
     this.service.getBrand().subscribe(res=>{
      this.brands=res;
     })
  }


  product:any;

  searchvalue:any='';

  @Output()
  searchemit:EventEmitter<string>=new EventEmitter<string>();

  mySearch()
  {
    this.searchemit.emit(this.searchvalue);
    this.getMyProduct();
  }

 getMyProduct()
  {
    this.service.getproduct().subscribe((res)=>{
      this.product=res;
    });
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

  deleteProduct(productid:any)
  {
    alert(productid)
    const url= 'https://localhost:7250/api/product/'+productid;
    this.http.delete(url).subscribe(res=>
      {
        Swal.fire({
          icon: 'success',
          title: 'Deleted....',
          text: 'product deleted succesfully!',
        })
        this.getMyProduct();
      })
  }

  //To fetch product data to be updated
  update(product:any)
  {
    this.service.getProductById(product.productid).subscribe(res=>{
      this.Myproduct.setValue(res);
    });
  }

  //update data and store in db
  
  updateProduct()
  {
    const formData : FormData = new FormData();
    formData.append('productid',this.Myproduct.value.productid);
    formData.append('productname',this.Myproduct.value.productname);
    formData.append('quantity',this.Myproduct.value.quantity);
    formData.append('price',this.Myproduct.value.price);
    formData.append('details',this.Myproduct.value.details);
    formData.append('stock',this.Myproduct.value.stock);
    formData.append('category', this.Myproduct.value.category);
    formData.append('subcategory', this.Myproduct.value.subcategory);
    formData.append('brand', this.Myproduct.value.brand);
    if(this.selectimage && this.selectimage2 &&this.selectimage3)
    {
      formData.append('image', this.selectimage);
      formData.append('image2', this.selectimage2);
      formData.append('image3', this.selectimage3);

    }

    this.service.updateProduct(this.Myproduct.value.productid,formData).subscribe(res=>{
      alert("updated successfully....");
      this.getMyProduct();
    })
  }
}
