#nullable disable

namespace Feedback
{
    public class  OrderFeedback
    {
        public Guid id { get; set; }
        public string paymentid{get;set;}
        public string userid { get; set; }
        public string username{get;set;}
        public string  comment { get; set; }
        public int orderRating { get; set; }
    }
    public class ProductFeedback
    {
       public Guid id { get; set; }
       public string userid { get; set; }
       public string username{get;set;}
       public string productid{get;set;}
       public string  feedback { get; set; }
       public int productRating { get; set; }
    }
}
