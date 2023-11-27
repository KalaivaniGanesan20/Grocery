using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PaymentData;
using Microsoft.AspNetCore.JsonPatch;
using ProductModal;
#nullable disable
namespace ProductController
{
     [ApiController]
     [Route("api/[controller]")]
   public class Productcontroller:Controller
   {
    private readonly productDbContext _dbcontext;
    private readonly IWebHostEnvironment _webhost;
    public Productcontroller(productDbContext dbcontext,IWebHostEnvironment webhost)
    {
        _dbcontext=dbcontext;
        _webhost=webhost;
    }
       [HttpGet]
        public ActionResult<IEnumerable<MyProducts>>GetProduct()
        {
            return _dbcontext.Allproducts.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<MyProducts>GetProductById(string id)
        {
            var product=_dbcontext.Allproducts.FirstOrDefault(product=>product.productid==id);
            if(product==null)
            {
                return NotFound();
            }
            else{
              return product;
            }
        }

         [HttpGet]
         [Route("search")]
        public ActionResult GetProductBySerach(string search)
        {
            var product=_dbcontext.Allproducts.Where(searchproduct=>searchproduct.productname.ToLower().Contains(search.ToLower())).ToList();
            if(product.Count<=0)
            {
                return Ok("null");
            }
            else{
              return Ok(product);
            }
        }

         [HttpGet]
         [Route("api/product")]
        public ActionResult<IEnumerable<MyProducts>>GetProductByCategory(string category)
        {
            var product=_dbcontext.Allproducts.Where(product=>product.category==category);
            if(product==null)
            {
                return NotFound();
            }
            else
            {
              return product.ToList();
            }
        }

         [HttpGet]
         [Route("api/productByname")]
        public ActionResult<IEnumerable<MyProducts>>GetProductByName(string name)
        {
            var product=_dbcontext.Allproducts.Where(product=>product.productname==name);
            if(product==null)
            {
                return NotFound();
            }
            else
            {
              return product.ToList();
            }
        }

        [HttpPost]
        public ActionResult<IEnumerable<MyProducts>>PostProduct([FromForm] MyProducts product)
        {
          var myproduct=new MyProducts
          {
            productid=product.productid,
            productname=product.productname,
            quantity=product.quantity,
            price=product.price,
            stock=product.stock,
            details=product.details,
            imageurl=Getpath(product.image),
            imageurl2=Getpath(product.image2),
            imageurl3=Getpath(product.image3),
            category=product.category,
            subcategory=product.subcategory,
            brand=product.brand
          };
            _dbcontext.Allproducts.Add(myproduct);
            _dbcontext.SaveChanges();
           return CreatedAtAction("GetProduct", new{ id= product.productid}, myproduct);

        }

 [NonAction]
           public string Getpath(IFormFile ImageUrl)
           {
             string UniqueFile=null;
            if(ImageUrl!=null)
            {
            string uploadfolder=Path.Combine(_webhost.WebRootPath,"Image");
            string extension = Path.GetExtension(ImageUrl.FileName);
            UniqueFile =ImageUrl.FileName + DateTime.Now.Ticks.ToString() + new Random().Next().ToString() + extension;
            string path=Path.Combine(uploadfolder,UniqueFile);
            using(var Filestream=new FileStream(path,FileMode.Create))
            {
                ImageUrl.CopyTo(Filestream);
            }
            }
            return UniqueFile;
           }

       [HttpPut("{id}")]
        public async Task<IActionResult>UpdateProduct(string id,[FromForm] MyProducts product)
        {
            if (id != product.productid)
            {
                return BadRequest();
            }
         var searchedproduct=_dbcontext.Allproducts.FirstOrDefault(pro=>pro.productid==id);
          searchedproduct.productid=product.productid;
          searchedproduct.productname=product.productname;
          searchedproduct.details=product.details;
          searchedproduct.price=product.price;
          searchedproduct.quantity=product.quantity;
          searchedproduct.category=product.category;
          searchedproduct.stock=product.stock;
          searchedproduct.subcategory=product.subcategory;
          searchedproduct.brand=product.brand;
          searchedproduct.imageurl=Getpath(product.image);
          searchedproduct.imageurl2=Getpath(product.image2);
          searchedproduct.imageurl3=Getpath(product.image3);

          _dbcontext.Allproducts.Update(searchedproduct);
          await _dbcontext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(string id)
      {
        var product = await _dbcontext.Allproducts.FirstOrDefaultAsync(product=>product.productid==id);
        if (product == null)
        {
            return NotFound();
        }

        _dbcontext.Allproducts.Remove(product);
        await _dbcontext.SaveChangesAsync();

        return NoContent();
    }

   [HttpPatch]
   [Route("api/UpdateStock")]
   public async Task<ActionResult>UpdatestockRate(string id,[FromBody] JsonPatchDocument<MyProducts> product)
   {
      if(id == null && product == null)
      {
        return BadRequest();
      }
      var selectedproduct=_dbcontext.Allproducts.FirstOrDefault(data=>data.productid==id);
      if(selectedproduct==null)
      {
        return NotFound();
      }

         product.ApplyTo(selectedproduct);
         await  _dbcontext.SaveChangesAsync();
         return NoContent();
   }




   [HttpPost]
   [Route("api/Category")]
   public ActionResult<IEnumerable<category>>Postcategory(category categories)
   {
      _dbcontext.category.Add(categories);
      _dbcontext.SaveChanges();
      return Ok();
   }

   [HttpGet("Getcategory")]
   public ActionResult<IEnumerable<category>>GetCategory()
   {
    return _dbcontext.category.Include(categories=>categories.subcategory).ToList();
   }

   [HttpPost]
   [Route("api/Brands")]

   public ActionResult<IEnumerable<brand>>PostBrands(brand brands)
   {
      _dbcontext.brands.Add(brands);
      _dbcontext.SaveChanges();
      return Ok();
   }

   [HttpGet("GetBrand")]
   public ActionResult<IEnumerable<brand>>GetBrand()
   {
    return _dbcontext.brands.ToList();
   }

   [HttpPatch]
   [Route("api/subcategory")]
   public async Task<IActionResult>PatchSubcategory(int id,[FromBody]JsonPatchDocument<category> mycategory)
   {
       if(mycategory==null && id<=0)
       {
        return BadRequest();
       }
       var category1=_dbcontext.category.Where(categories=>categories.id==id).FirstOrDefault();
       if(category1==null)
       {
        return NotFound();
       }
       mycategory.ApplyTo(category1);
       await _dbcontext.SaveChangesAsync();
       return NoContent();
   }
   }


  }
