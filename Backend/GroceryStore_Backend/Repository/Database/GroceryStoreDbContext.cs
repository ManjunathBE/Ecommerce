using GroceryStore_Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace GroceryStore_Backend.Repository.Database
{
    public class GroceryStoreDbContext : DbContext
    {
        public GroceryStoreDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Product> Product { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Address> Address { get; set; }
        public DbSet<TransactionHistory> TransactionHistories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TransactionHistory>().HasData(new TransactionHistory
            {
                TransactionId = 1,
                OrderId = 1,
                Status = "Executed",
                TransactionDate = "06-09-2020",

                TransactionTime = "01:00:00 AM"

            }, new TransactionHistory
            {
                TransactionId = 2,
                OrderId = 2,
                Status = "Processing",
                TransactionDate = "06-09-2020",

                TransactionTime = "02:00:00 AM"

            }
            );
        }
    }
}
