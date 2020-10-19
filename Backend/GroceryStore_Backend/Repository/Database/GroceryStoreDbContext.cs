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

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<TransactionHistory>().HasData(new TransactionHistory
        //    {
        //        TransactionId = 1,
        //        Status = "Executed",
        //        TransactionDateTime = DateTime.Now.Subtract(TimeSpan.FromDays(1).Subtract(TimeSpan.FromHours(6))),
        //        UserId = 1,
        //        OrderedProducts = { new OrderedProducts {ProductName="Arbi", Units=2, Weight=500, Price=90 }, 
        //                            new OrderedProducts {ProductName="Amla", Units=1, Weight=1000, Price=80 } 
        //                          }



        //    }, new TransactionHistory
        //    {
        //        TransactionId = 2,
        //        Status = "Processing",
        //        TransactionDateTime = DateTime.Now.Subtract(TimeSpan.FromDays(4)),
        //        UserId = 2,
        //        OrderedProducts = { new OrderedProducts {ProductName="Baby Corn", Units=2, Weight=500, Price=90 },
        //                            new OrderedProducts {ProductName="Amla", Units=1, Weight=1000, Price=80 }
        //                          }

        //    },new TransactionHistory
        //    {
        //        TransactionId = 3,
        //        Status = "Validating",
        //        TransactionDateTime = DateTime.Now.Subtract(TimeSpan.FromDays(3)),
        //        UserId = 1,
        //        OrderedProducts = { new OrderedProducts {ProductName="Arbi", Units=2, Weight=500, Price=90 },
        //                            new OrderedProducts {ProductName="Baby Corn", Units=1, Weight=1000, Price=80 }
        //                          }

        //    },new TransactionHistory
        //    {
        //        TransactionId = 4,
        //        Status = "Finished",
        //        TransactionDateTime =DateTime.Now.Subtract(TimeSpan.FromDays(1)),               
        //        UserId = 2,
        //        OrderedProducts = { new OrderedProducts {ProductName="Arbi", Units=4, Weight=500, Price=90 },
        //                            new OrderedProducts {ProductName="Amla", Units=1, Weight=1000, Price=80 }
        //                          }
        //    },new TransactionHistory
        //    {
        //        TransactionId = 5,
        //        Status = "Finished",
        //        TransactionDateTime = DateTime.Now.Subtract(TimeSpan.FromDays(2)),
        //        UserId = 1,
        //        OrderedProducts = { new OrderedProducts {ProductName="Arbi", Units=2, Weight=500, Price=90 },
        //                            new OrderedProducts {ProductName="Amla", Units=6, Weight=1000, Price=80 }
        //                          }
        //    }
        //    );
        //}
    }
}
