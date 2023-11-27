import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Route, Router } from '@angular/router';
import { OfferserviceService } from './offerservice.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProductserviceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  userdata: any;
  originaldata: any;
  mycart: any;
  body: any;
  producttopay: any;
  isReturnvalid: any;

  index:any;

  //const urls from enivronment.ts

producturl=environment.product;
userurl=environment.user;
myorderurl=environment.myorders;


  constructor(private http: HttpClient, private route: Router,private offer:OfferserviceService) {}


  getproduct() {
    return this.http.get(this.producturl);
  }
  getProductById(productid: any) {
    const selectedurl = this.producturl+'/'+ productid;
    return this.http.get(selectedurl);
  }
  updateProduct(id: any, product:FormData) {
    const selectedurl = this.producturl+'/' + id;
    return this.http.put(selectedurl,product);
  }

  getProductbyCategory(category: any) {
    return this.http.get(
      this.producturl+'/api/product?category=' + category
    );
  }

  getProductbyName(name: any) {
    return this.http.get<any>(
      this.producturl+'/api/productByname?name='+name
    );
  }

  getproductBySearch(searchvalue:any)
  {
    return this.http.get<any>(this.producturl+'/search?search='+searchvalue
    );
  }

  postCategory(value:any)
  {
    return this.http.post(this.producturl+'/api/Category',value)
  }
  getCategory()
  {
    return this.http.get(this.producturl+'/Getcategory')
  }

  postBrand(value:any)
  {
    return this.http.post(this.producturl+'/api/Brands',value)
  }
  getBrand()
  {
    return this.http.get(this.producturl+'/GetBrand')
  }

  patchSubcategory(category:any,id:any)
  {
    const subcategory=[{
      subcategoryname:category.subcategoryname
    }];
    console.log(subcategory)
    const body=[{op:'replace',path:'/subcategory',value:subcategory}]
    return this.http.patch(this.producturl+'/api/subcategory?id='+id,body)
  }
  //cart

  checkStock(product:any,stock:any,userid:any)
  {
    console.log(product.productcount,stock)
     if(product.productcount<=stock&& product.productcount!=0)
     {
      return true;
     }
     else if(product.productcount==0)
     {
       alert("product removed")
       this.deleteCartProduct(product.productid,userid)
     }
     return false;
  }

  addtoCart(id: any, myproduct: any, Product: any):any
   {
    this.http.get(this.userurl+'/' + id).subscribe((result) => {
      this.userdata = result;
      this.index = this.userdata.mycart.findIndex((item: any) =>item.productid === myproduct.productid);
      if (this.index != -1 )
      {
        this.index = this.userdata.mycart.findIndex((item: any) => item.productid === myproduct.productid);
        const seleproduct = this.userdata.mycart[this.index];
        const newproduct = {productid: seleproduct.productid,productname: seleproduct.productname,price: parseInt(seleproduct.price) + parseInt(Product.price),quantity: seleproduct.quantity,imageurl: seleproduct.imageurl,offerstatus:seleproduct.offerstatus,productcount: parseInt(seleproduct.productcount) + 1,};
        if(this.checkStock(newproduct,myproduct.stock,id))
        {
          this.body = [{ op: 'replace', path: '/mycart/' + this.index, value: newproduct },];
        }
        else{
          alert("stock Out Of Range");
        }
      }
      else
       {
                const newproduct = {productid: Product.productid,productname: Product.productname,price: parseInt(Product.price),quantity: Product.quantity,imageurl: Product.imageurl,offerstatus:"valid",productcount: parseInt(Product.productcount)};
              if(this.checkStock(newproduct,myproduct.stock,id))
               {
                this.body = [{ op: 'add', path: '/mycart/-', value: newproduct }];
               }
               else{
                alert("stock Out Of Range")
              }
       }

    const producturl = this.userurl+'/' + id + '/Patchuser';
    this.http.patch(producturl, this.body, this.httpOptions).subscribe((res) => {Swal.fire({icon: 'success',title: 'Updated to cart...',text: 'Updateded successfully!',});} );});
  }

  updateToCart(value: any, id: any, myproduct: any)
  {
    this.getProductById(myproduct.productid).subscribe((result) => {this.originaldata = result;});
    this.http.get(this.userurl+'/' + id).subscribe((result) => {
      this.userdata = result;
      const index = this.userdata.mycart.findIndex((item: any) => item.productid === myproduct.productid );
      if (index != -1) {
        if (value === 'max')
        {
          const seleproduct = this.userdata.mycart[index];
          const newproduct = {
            productid: seleproduct.productid,
            productname: seleproduct.productname,
            price: parseInt(seleproduct.price) + parseInt(this.originaldata.price),
            quantity: seleproduct.quantity,
            imageurl: seleproduct.imageurl,
            offerstatus:"valid",
            productcount: parseInt(seleproduct.productcount) + 1,
          };
          if(this.checkStock(newproduct,this.originaldata.stock,id))
          {
          this.body = [{ op: 'replace', path: '/mycart/' + index, value: newproduct },];
          Swal.fire({
            icon: 'success',
            title: 'Updated to cart...',
            text: 'Updateded successfully!',
          });}
          else{
            alert("stock Out Of Range")
          }
        }
        if (value === 'min') {
          const seleproduct = this.userdata.mycart[index];
          const newproduct = {
            productid: seleproduct.productid,
            productname: seleproduct.productname,
            price:parseInt(seleproduct.price) - parseInt(this.originaldata.price),
            quantity: seleproduct.quantity,
            offerstatus:'valid',
            imageurl: seleproduct.imageurl,
            productcount: parseInt(seleproduct.productcount) - 1,
          };
          if(this.checkStock(newproduct,this.originaldata.stock,id))
          {
          this.body = [ { op: 'replace', path: '/mycart/' + index, value: newproduct },];
          Swal.fire({
            icon: 'success',
            title: 'Updated to cart...',
            text: 'Updateded successfully!',
          });}
          else{
            alert("stock Out Of Range")
          }
        }
      }
      const producturl = this.userurl+'/' + id + '/Patchuser';
      this.http.patch(producturl, this.body, this.httpOptions).subscribe((result) => {});});
  }

  deleteCartProduct(id: any, userid: any) {
    this.http.get(this.userurl+'/' + userid).subscribe(
      (result) => {
        this.userdata = result;
        const index = this.userdata.mycart.findIndex(
          (item: any) => item.productid === id
        );
        const myproduct = this.userdata.mycart.splice(index, 1);
        this.body = [{ op: 'remove', path: '/mycart/' + index, value: myproduct },];
        this.http.patch(this.userurl+'/' + userid + '/Patchuser',this.body,this.httpOptions).subscribe(
          (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Product removed...',
              text: 'Removed successfully!',
            });
          });
      }
    );
    return true;
  }

  myCartData(id: any) {
    this.http.get(this.userurl+'/' + id).subscribe((result) => {
      this.userdata = result;
      this.mycart = this.userdata.cart;
    });
  }
  getCartAmount() {
    let cartcount = this.mycart.length;
    let amount = 0;
    cartcount.forEach((element:any) => {
      amount += element.price;

    });
    return amount;
  }

  //payment

  payProduct(payment: any, id: any) {
    this.http.get(this.userurl+'/' + id).subscribe((res) => {
      this.userdata = res;
      const myaddress=[{
        apartmentno:this.userdata.address[0].apartmentNo,
          apartmentName:this.userdata.address[0].apartmentName,
          area:this.userdata.address[0].area,
          street:this.userdata.address[0].street,
          state:this.userdata.address[0].state,
          pincode:this.userdata.address[0].pincode,
      }];
      this.postToPay(id, payment, this.userdata.mycart,myaddress);
    });
  }

  postToPay(id: any, payment: any, usercart: any,address:any) {

    this.producttopay = {
      paymentid: payment.paymentid,
      userid: payment.userid,
      cardnumber: payment.cardnumber,
      cvvnumber: payment.cvvnumber,
      totalAmount: payment.TotalAmount,
      upicode:payment.upicode,
      paiddate: payment.paiddate,
      deliverydate: payment.deliverydate,
      paymentmode:payment.paymentmode,
      product: usercart,
      address:address,
      status: 'Paid',
    };
    usercart.forEach((value:any) => {
      this.getProductById(value.productid).subscribe((res:any)=>{const product=res;
      const stockrate=product.stock-value.productcount;
      console.log("value is"+value.productcount,product.stock)
      this.updateStock(stockrate,value.productid).subscribe(res=>{
      });
    });
    });

    this.http.post(this.myorderurl, JSON.stringify(this.producttopay), this.httpOptions).subscribe(
        (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Product Paid...',
            text: 'Payment successfull!', });
          this.clearCart(payment.userid);
          this.route.navigate(['feedback/' + payment.paymentid]);
        }
      );
  }

  clearCart(userid: any) {
    this.http.get(this.userurl+'/' + userid).subscribe(
      (res) => {
        this.userdata = res;
        // const myproduct = this.userdata.mycart.splice(0);
        this.body=[{op:'replace',path:'/mycart',value:[]}]
        this.http.patch(this.userurl+'/' + userid+'/Patchuser', this.body,this.httpOptions).subscribe();
        });
      }

  //MY order

  getMyOrders(id: any)
  {
    return this.http.get(this.myorderurl+'/' + id);
  }

  getOrders()
  {
    return this.http.get(this.myorderurl);
  }
  getOrderById(id:any,userid:any)
  {
    return this.http.get(this.myorderurl+'/api/Order?orderid=' + id+'&userid='+userid);
  }

  updateOrderstatus(order:any)
  {
    let fromdate=new Date(order.paiddate).getTime();
    let nowdate=new Date().getTime();
    let Todate=new Date(order.deliverydate).getTime();

    let shipped_Time=2*60*60*1000;
    let distance=Todate-nowdate;
    console.log(distance,((Todate-fromdate)-shipped_Time))
      if(distance<=((Todate-fromdate)-shipped_Time) && order.status=='Paid')
      {
             this.deliveredStatus(order.paymentid,'Shipped');
      }
      else if(!(distance>=0) && order.status==='Shipped')
      {
             this.deliveredStatus(order.paymentid,'Delivered');
      }
  }

//cancel order

cancelOrder(paymentid:any)
{
  return  this.deliveredStatus(paymentid,'Cancelled');
}
  //Return Order



  productTimer(data: any)
  {
    let fromdate = new Date().getTime();
    let Todate = new Date(data.deliverydate).getTime();
    let distance =fromdate-Todate;
    setTimeout(() => {
      this.isReturnvalid = false;
    this.deliveredStatus(data.paymentid,'Delivered');}, distance);
    if (distance <= 0) {
      this.isReturnvalid = false;
      return this.isReturnvalid;
    }
    else
    {
      this.isReturnvalid = true;
      return this.isReturnvalid;
    }
  }



  // updatestatus(paymentid: any) {
  //   this.body = [{ op: 'replace', path: '/status', value: 'Returned' }];
  //   this.http.patch(this.myorderurl+'?paymentid=' + paymentid,this.body,this.httpOptions).subscribe( );
  // }

  deliveredStatus(paymentid: any,status:any)
  {
    this.body = [{ op: 'replace', path: '/status', value: status }];
    this.http.patch(this.myorderurl+'?paymentid=' + paymentid,this.body,this.httpOptions).subscribe();
  }


  refundAmountToWallet(amount: any, userid: any)
  {
    this.http.get(this.userurl+'/' + userid).subscribe((res) => {
      this.userdata = res;
    let walletvalue = this.userdata.mywallet;
    let updatedwallet = parseInt(walletvalue) + parseInt(amount);
    this.body = [{ op: 'replace', path: '/mywallet', value: updatedwallet }];
    this.http.patch(this.userurl+'/' + userid + '/Patchuser',this.body,this.httpOptions).subscribe();});
  }




  updateOffercart(data:any)
  {
    let cart:any=data.mycart;
    for(let i=0;i<cart.length;i++)
    {
      this.getProductById(cart[i].productid).subscribe(res=>{
        let originaldata:any=res;
        let price=cart[i].productcount*originaldata.price;
        this.body=[{op:'replace',path:'/mycart/'+i+'/price',value:price}];
        this.http.patch(this.userurl+'/' + data.id + '/Patchuser',this.body).subscribe();
      })
    }
  }

updateStock(stockrate:any,productid:any)
{
  this.body=[{op:'replace',path:'/stock',value:stockrate}]
  return this.http.patch(this.producturl+'/api/UpdateStock?id='+productid,this.body);
}

}
