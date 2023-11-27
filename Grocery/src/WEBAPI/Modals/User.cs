using System.ComponentModel.DataAnnotations;
#nullable disable

namespace Userdata
{
    public class User
    {
          public int id{get;set;}
          public string firstname{get;set;}
          public string lastname{get;set;}
          public string emailid{get;set;}
          public string phonenumber{get;set;}
          public string password{get;set;}
          public string cpassword{get;set;}
          public byte[] passwordHash{get;set;}
          public byte[] passwordsalt{get;set;}
          public string mywallet{get;set;}
          public List<Cart> mycart{get;set;}
          public List<Address> address{get;set;}

    }
    public class Cart
    {
          public int id{get;set;}
          public string productid{get;set;}
          public string productname{get;set;}
          public string quantity{get;set;}
          public string imageurl{get;set;}
          public string price{get;set;}
          public string productcount{get;set;}
          public string Offerstatus{get;set;}
    }
    public class Address
    {
      public int id{get;set;}
      public string ApartmentNo{get;set;}
      public string ApartmentName{get;set;}
      public string Area { get; set; }
      public string street { get; set; }
      public string state { get; set; }
      public string Pincode { get; set; }
    }

}
