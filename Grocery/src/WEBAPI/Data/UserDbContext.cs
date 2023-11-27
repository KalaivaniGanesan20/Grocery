using Userdata;
using Microsoft.EntityFrameworkCore;
#nullable disable
namespace UserDatabase
{
    public class UserDbContext:DbContext
    {
       public UserDbContext(DbContextOptions<UserDbContext> options):base(options)
        {

        }
        public DbSet<User>Userdata{get;set;}
        public DbSet<Cart>cartdata{get;set;}
        public DbSet<Address>Useraddress{get;set;}

        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
                base.OnModelCreating(modelbuilder);
                modelbuilder.Entity<User>().HasKey(user=>user.id);
                modelbuilder.Entity<User>().HasMany(user=>user.mycart);
                modelbuilder.Entity<User>().HasMany(user=>user.address);
                modelbuilder.Entity<Cart>().HasKey(cart=>cart.id);
                modelbuilder.Entity<Address>().HasKey(address=>address.id);
        }
    }
}
