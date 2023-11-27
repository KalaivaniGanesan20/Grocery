using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Userdata;
using UserDatabase;
using Microsoft.AspNetCore.JsonPatch;
using System.Security.Cryptography;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
#nullable disable
namespace Usercontroller
{
     [ApiController]
     [Route("api/[controller]")]
   public class UserController:Controller
   {
    private readonly UserDbContext _dbcontext;
    private readonly IConfiguration _config;

    public UserController(UserDbContext dbcontext,IConfiguration config)
    {
        _config=config;
        _dbcontext=dbcontext;
    }

       [HttpGet]
        public ActionResult<IEnumerable<User>>Getuser()
        {
            return _dbcontext.Userdata.Include(user=>user.mycart).Include(user=>user.address).ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<User>GetuserById(int id)
        {
            var userdata= _dbcontext.Userdata.Include(user=>user.mycart).Include(user=>user.address).FirstOrDefault(user=>user.id==id);
            if(userdata==null)
            {
                return NotFound();
            }
            else
            {
             return userdata;
            }
        }


        [HttpPost]
        public ActionResult<IEnumerable<User>>Postuser(User user)
        {
            CreatePasswordHash(user.password,out byte[] passwordhash,out byte[] passwordsalt);
            var myuser=new User{
                id=user.id,
                firstname=user.firstname,
                lastname=user.lastname,
                emailid=user.emailid,
                phonenumber=user.phonenumber,
                password=user.password,
                cpassword=user.cpassword,
                passwordHash=passwordhash,
                passwordsalt=passwordsalt,
                mywallet=user.mywallet,
                mycart=user.mycart,
                address=user.address
            };
            _dbcontext.Userdata.Add(myuser);
            _dbcontext.SaveChanges();
           return CreatedAtAction("Getuser", new{ id= user.id}, user);

        }

        private void CreatePasswordHash(string password,out byte[]passwordhash,out byte[]passwordsalt)
        {
            using(var hmac=new HMACSHA512())
            {
                passwordsalt=hmac.Key;
                passwordhash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool Verify(string password, byte[] passwordhash,byte[] passwprdsalt)
        {
            var hmac=new HMACSHA512(passwprdsalt);
            var computehash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            return computehash.SequenceEqual(passwordhash);
        }

      [HttpPost("Login")]
        public ActionResult<string> Login(Userlogin udata)
        {
            var userexit = _dbcontext.Userdata.FirstOrDefault(user=>user.emailid== udata.emailid);
            if (userexit == null)
            {
                return Unauthorized("Invalid User");
            }
            if(!Verify(udata.password,userexit.passwordHash,userexit.passwordsalt))
            {
               return Unauthorized("Incorrect Password");
            }
            var emp=userexit;
            var Token=CreateToken(emp);
            return Ok(new{message=Token,status="login success"});
        }

       private string CreateToken(User user1)
         {
            if(user1.emailid=="admin2023@gmail.com")
            {
                List<Claim>claims=new List<Claim>()
                {
                    new Claim(ClaimTypes.Name,user1.emailid),
                    new Claim(ClaimTypes.Role,"Admin")
                };
                 var key= new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Tokens").Value));
                var credentials1=new SigningCredentials(key,SecurityAlgorithms.HmacSha512Signature);
                var token=new JwtSecurityToken(claims:claims,expires:DateTime.Now.AddDays(1),signingCredentials:credentials1);
                //Compact serialized format of token
                var jwt=new JwtSecurityTokenHandler().WriteToken(token);
                return jwt;
            }
            else
            {
                List<Claim>claims=new List<Claim>()
                {
                    new Claim(ClaimTypes.Name,user1.emailid),
                    new Claim(ClaimTypes.Role,"User")
                };
                 var key= new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Tokens").Value));
                var credentials1=new SigningCredentials(key,SecurityAlgorithms.HmacSha512Signature);
                var token=new JwtSecurityToken(claims:claims,expires:DateTime.Now.AddDays(1),signingCredentials:credentials1);

                //Compact serialized format of token

                var jwt=new JwtSecurityTokenHandler().WriteToken(token);
                return jwt;
            }


         }

[HttpPatch]
[Route("{id:int}/Patchuser")]
        public async Task<IActionResult>Patchuser(int id, [FromBody]JsonPatchDocument<User> user)
        {
            if (user==null && id<=0)
            {
                return BadRequest();
            }
         var user1=_dbcontext.Userdata.Include(myuser=>myuser.mycart).Include(user=>user.address).Where(myuser=>myuser.id==id).FirstOrDefault();
         if(user1==null)
         {
            return NotFound();
         }

          user.ApplyTo(user1);
          await _dbcontext.SaveChangesAsync();
          return NoContent();
        }


       [HttpPut("{id}")]
        public async Task<IActionResult>Updateuser(int id, User user)
        {
            if (id != user.id)
            {
                return BadRequest();
            }
         var user1=_dbcontext.Userdata.Include(myuser=>myuser.mycart).Include(user=>user.address).FirstOrDefault(pro=>pro.id==id);
          user1.id=id;
          user1.firstname=user.firstname;
          user1.lastname=user.lastname;
          user1.phonenumber=user.phonenumber;
          user1.password=user.password;
          user1.cpassword=user.cpassword;
          user1.emailid=user.emailid;
          user1.mycart=user.mycart;
          user1.address=user.address;

          _dbcontext.Userdata.Update(user1);
          await _dbcontext.SaveChangesAsync();

            return NoContent();
        }

    //     [HttpDelete("{id}")]
    //     public async Task<IActionResult> DeleteProduct(string id)
    //   {
    //     var product = await _dbcontext.Userdata.FirstOrDefaultAsync(product=>product.pid==id);
    //     if (product == null)
    //     {
    //         return NotFound();
    //     }

    //     _dbcontext.Allproducts.Remove(product);
    //     await _dbcontext.SaveChangesAsync();

    //     return NoContent();
    // }
   }
  }
