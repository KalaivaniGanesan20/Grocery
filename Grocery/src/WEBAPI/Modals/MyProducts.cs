using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
#nullable disable
namespace ProductModal
{
    public class MyProducts
    {

      public string productid{get;set;}
      public string productname{get;set;}
      public string quantity{get;set;}
      public string price{get;set;}

      public string imageurl{get;set;}
      public string imageurl2{get;set;}
      public string imageurl3{get;set;}

      [NotMapped]
      public IFormFile image{get;set;}
       [NotMapped]
      public IFormFile image2{get;set;}
      [NotMapped]
      public IFormFile image3{get;set;}
      
      public string category{get;set;}
      public string subcategory{get;set;}
      public string brand{get;set;}
      public string details{get;set;}
      public string stock{get;set;}
    }
    public class category{
      public int id{get;set;}
      public string categoryName{get;set;}

      public List<subcategory>subcategory{get;set;}
    }

    public class subcategory{
      public int id{get;set;}
      public string subcategoryname{get;set;}
    }

    public class brand{
      public int id{get;set;}
      public string brandName{get;set;}
    }
}
