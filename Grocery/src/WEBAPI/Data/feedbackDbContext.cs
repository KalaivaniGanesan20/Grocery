using Microsoft.EntityFrameworkCore;
#nullable disable
namespace Feedback
{
    public class feedbackDbContext:DbContext
    {
        public feedbackDbContext(DbContextOptions<feedbackDbContext> options):base (options)
        {

        }
       public DbSet<OrderFeedback> orderFeedbacks{get;set;}
       public DbSet<ProductFeedback> productFeedbacks{get;set;}

       protected override void OnModelCreating(ModelBuilder modelbuilder)
       {
          base.OnModelCreating(modelbuilder);
          modelbuilder.Entity<OrderFeedback>().HasKey(feedback=>feedback.id);
          modelbuilder.Entity<ProductFeedback>().HasKey(feedback=>feedback.id);
       }

    }
}
