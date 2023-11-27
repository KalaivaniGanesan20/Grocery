using Microsoft.EntityFrameworkCore;
namespace query
{
   public class queryDb:DbContext
   {
       public queryDb(DbContextOptions<queryDb> options):base(options)
       {

       }
       public DbSet<querydata> queries{get;set;}

       protected override void OnModelCreating(ModelBuilder modelbuilder)
       {
          base.OnModelCreating(modelbuilder);
          modelbuilder.Entity<querydata>().HasKey(query=>query.queryid);

       }

   }
}
