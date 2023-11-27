using System.ComponentModel.DataAnnotations.Schema;

namespace Myimages
{
    public class image
    {
        public int id{get;set;}
        public string? name{get;set;}
        public string? imageurl {get;set;}
        public IFormFile? uploadedimage {get;set;}
    }
    public class Originalimage
    {
      public int id{get;set;}
      public string? name{get;set;}
      public string? imageurl{get;set;}
    }
}
