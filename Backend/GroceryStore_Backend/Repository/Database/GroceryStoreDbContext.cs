using GroceryStore_Backend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryStore_Backend.Repository.Database
{
    public class GroceryStoreDbContext : DbContext
    {
        public GroceryStoreDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Address> Address { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>().HasData(new Category
            {
               
                CategoryId=1,
                Name= "Vegetables"

            }, new Category
            {
                CategoryId = 2,
                Name = "Fruits"



            },new Category
            {
                CategoryId = 3,
                Name = "Leafs"



            },new Category
            {
                CategoryId = 4,
                Name = "Bread"



            },new Category
            {
                CategoryId = 5,
                Name = "Eggs"



            },new Category
            {
                CategoryId = 6,
                Name = "Drinks"



            });
        }
    }
}
