
export interface User
{

  firstname:string,
  lastname:string,
  emailid:string,
  phonenumber:string,
  password:string,
  cpassword:string,
  mywallet:string,
  mycart:Cart,
  address:Myaddress
}
export interface Cart{
  productid:string,
  productname:string,
  quantityt:string,
  price:string,
  imageurl:string,
  productcount:string,
  offerstatus:string
}
export interface Myaddress
{
    ApartmentNo:string,
    ApartmentName:string,
    Area:string,
    street:string,
    state:string,
    Pincode:string
}
export interface Product{
  productid:string,
  productname:string,
  quantity:string,
  imageurl:string,
  price:string,
  productcount:string,
  offerstatus:string,
  category:string,
  details:string,
  stock:string,

}

