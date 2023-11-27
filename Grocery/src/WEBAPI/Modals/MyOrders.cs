#nullable disable
using ProductModal;
using Userdata;

namespace MyorderModule
      {
        public class MyOrders
        {
            public Guid id { get; set; }
            public string paymentid { get; set; }
            public string userid { get; set; }
            public string paymentmode{get;set;}
            public string cardnumber { get; set; }
            public string cvvnumber { get; set; }
            public string upicode{get;set;}
            public string TotalAmount { get; set; }
            public string paiddate { get; set; }
            public string deliverydate { get; set; }
             public string status{get;set;}

            public  List<FinalCart> product { get; set; }
            public List<Address>address{get;set;}
        }

        public class FinalCart
        {
          public int orderid{get;set;}
          public int id{get;set;}
          public string productid{get;set;}
          public string productname{get;set;}
          public string quantity{get;set;}
          public string imageurl{get;set;}
          public string price{get;set;}
          public string productcount{get;set;}
        }
      }
