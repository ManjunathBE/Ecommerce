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
        public DbSet<TransactionHistory> TransactionHistory { get; set; }
        public DbSet<OrderedProducts> OrderedProducts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Address>()
            // .HasKey(e => new { e.UserId});

            modelBuilder.Entity<User>().HasData(new User
            {
                UserId = 1,
                FirstName = "Andrew",
                LastName = "Schmidt",
                Email = "Andrew.schmidt@gmail.com",
                PhoneNumber = "919658963214"
            });

            modelBuilder.Entity<Address>().HasData(
                new Address
                {
                    Id = 1,
                    AddressLine1 = "121B, Bakers Ave",
                    AddressLine2 = "Erlington",
                    City = "Oxford",
                    PinCode = "123456",
                    UserId = 1

                },
                 new Address
                 {
                     Id = 2,
                     AddressLine1 = "121B, Bakers Ave",
                     AddressLine2 = "Erlington",
                     City = "Oxford",
                     PinCode = "123456",
                     UserId = 1

                 });
            
        }
    }
}
