using Microsoft.EntityFrameworkCore;
using ProductModal;
#nullable disable
namespace PaymentData
{
    public class productDbContext:DbContext
    {
        public productDbContext(DbContextOptions<productDbContext> options):base(options)
        {

        }
        public DbSet<MyProducts>Allproducts{get;set;}
        public DbSet<category>category{get;set;}
        public DbSet<subcategory>subcategories{get;set;}
        public DbSet<brand>brands{get;set;}
        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
                base.OnModelCreating(modelbuilder);
                modelbuilder.Entity<MyProducts>().HasKey(product=>product.productid);
                modelbuilder.Entity<category>().HasKey(category=>category.id);
                modelbuilder.Entity<brand>().HasKey(brand=>brand.id);
                modelbuilder.Entity<subcategory>().HasKey(subcategory=>subcategory.id);
                modelbuilder.Entity<category>().HasMany(category=>category.subcategory);
        }
    }
}
