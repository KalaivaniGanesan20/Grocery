using MyorderModule;
using Microsoft.EntityFrameworkCore;
#nullable disable
namespace MyorderDatabase
{
    public class MyOrdersDbContext:DbContext
    {
       public MyOrdersDbContext(DbContextOptions<MyOrdersDbContext> options):base(options)
        {

        }
        public DbSet<MyOrders>Orderdata{get;set;}
        public DbSet<FinalCart>Orderedcart{get;set;}
        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
                base.OnModelCreating(modelbuilder);
                modelbuilder.Entity<MyOrders>().HasKey(order=>order.id);
                modelbuilder.Entity<MyOrders>().HasMany(order=>order.product);
                modelbuilder.Entity<FinalCart>().HasKey(cart=>cart.orderid);
        }
    }
}