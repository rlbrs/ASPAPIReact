using Microsoft.EntityFrameworkCore;

namespace RahulTask1.Model
{
    public class DatabaseContext: DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        public DbSet<Customer> Customer { get; set; }
        public DbSet<Sale> Sales { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Store> Store { get; set; }
    }
}
