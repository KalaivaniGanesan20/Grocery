using Microsoft.EntityFrameworkCore;
using Myimages;
#nullable disable
namespace MyorderDatabase
{
    public class imageDbContext:DbContext
    {
       public imageDbContext(DbContextOptions<imageDbContext> options):base(options)
        {

        }
        public DbSet<Originalimage>Myimage{get;set;}
        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
                base.OnModelCreating(modelbuilder);
                modelbuilder.Entity<Originalimage>().HasKey(order=>order.id);

        }
    }
}
