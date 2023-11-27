using Microsoft.AspNetCore.Mvc;
using Myimages;
using MyorderDatabase;
#nullable disable

namespace MyOrdersModule{
    [ApiController]
    [Route("api/[controller]")]
    public class imageController:Controller
    {
        public imageDbContext dbContext;
        private readonly IWebHostEnvironment webHostEnvironment;

           public imageController(imageDbContext _dbContext,IWebHostEnvironment _webHostEnvironment)
           {
              dbContext=_dbContext;
              webHostEnvironment=_webHostEnvironment;
           }
           [HttpPost]
           public async Task<ActionResult> Postdata([FromForm] image img)
           {
              var imageurl=Getpath(img.uploadedimage);
             var data=new Originalimage{
              name=img.name,
              imageurl=imageurl,
              };
              dbContext.Myimage.Add(data);
              await dbContext.SaveChangesAsync();
               return Ok();
           }
           [NonAction]
           public string Getpath(IFormFile ImageUrl)
           {
             string UniqueFile=null;
            if(ImageUrl!=null)
            {
            string uploadfolder=Path.Combine(webHostEnvironment.WebRootPath,"Image");
            string extension = Path.GetExtension(ImageUrl.FileName);
            UniqueFile = DateTime.Now.Ticks.ToString() + new Random().Next().ToString() + extension;
            string path=Path.Combine(uploadfolder,UniqueFile);
            using(var Filestream=new FileStream(path,FileMode.Create))
            {
                ImageUrl.CopyTo(Filestream);
            }
            }
            return UniqueFile;
           }
    }

}
