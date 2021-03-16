using GroceryStore_Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ValueGeneration.Internal;
using System;


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
        public DbSet<OrderHistory> OrderHistory { get; set; }
        public DbSet<OrderedProducts> OrderedProducts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Address>()
            // .HasKey(e => new { e.UserId});

            var userid = Guid.NewGuid();
            var orderId = Guid.NewGuid();
            modelBuilder.Entity<User>().HasData(new User
            {
                UserId = userid,
                FirstName = "Anderson",
                LastName = "Schmidt",
                Email = "Andrew.schmidt@gmail.com",
                PhoneNumber = 0000000000
            });

            modelBuilder.Entity<Address>().HasData(
                new Address
                {
                    Id = 1,
                    AddressLine1 = "121B, Bakers Ave",
                    AddressLine2 = "Erlington",
                    City = "Oxford",
                    PinCode = "123456",
                    UserId = userid

                },
                 new Address
                 {
                     Id = 2,
                     AddressLine1 = "32, East Ave",
                     AddressLine2 = "Acrington",
                     City = "Edinburgh",
                     PinCode = "100456",
                     UserId = userid

                 },
                 new Address
                 {
                     Id = 3,
                     AddressLine1 = "check address",
                     AddressLine2 = "xyz",
                     City = "uio",
                     PinCode = "000012",
                     UserId = new Guid()

                 });

            modelBuilder.Entity<OrderHistory>().HasData(
                new OrderHistory
                {
                    OrderId = orderId,
                    Status = "Executed",
                    UserId = userid,
                    TransactionDateTime = DateTime.Now
                });

            modelBuilder.Entity<OrderedProducts>().HasData(
                new OrderedProducts
                {
                    OrderId = orderId,
                    ItemNumber = 1,
                    Price = 14,
                    ProcessedPrice = 7,
                    Quantity = 2,
                    ProcessedQuantity = 1,
                    ProductName = "test product",
                    Unit = "Numbers"
                },
                 new OrderedProducts
                 {
                     OrderId = orderId,
                     ItemNumber = 2,
                     Price = 140,
                     ProcessedPrice = 70,
                     Quantity = 2,
                     ProcessedQuantity = 1,
                     ProductName = "test product 2",
                     Unit = "Numbers"
                 });
            
        }
    }
}
