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
        public DbSet<TransactionHistory> TransactionHistory { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TransactionHistory>().HasData(new TransactionHistory
            {
                TransactionId = 1,
                OrderId = 1,
                Status = "Executed",
                TransactionDate = "06-09-2020",
                TransactionTime = "01:00:00 AM",
                UserId = 1


            }, new TransactionHistory
            {
                TransactionId = 2,
                OrderId = 1,
                Status = "Processing",
                TransactionDate = "06-09-2020",
                TransactionTime = "02:00:00 AM",
                UserId = 2
                
            },new TransactionHistory
            {
                TransactionId = 3,
                OrderId = 2,
                Status = "Validating",
                TransactionDate = "07-09-2020",
                TransactionTime = "03:00:00 AM",
                UserId = 1


            },new TransactionHistory
            {
                TransactionId = 4,
                OrderId = 3,
                Status = "Finished",
                TransactionDate = "07-09-2020",
                TransactionTime = "04:00:00 AM",
                UserId = 2
            },new TransactionHistory
            {
                TransactionId = 5,
                OrderId = 4,
                Status = "Finished",
                TransactionDate = "08-09-2020",
                TransactionTime = "05:00:00 AM",
                UserId = 1
            }
            );
        }
    }
}
