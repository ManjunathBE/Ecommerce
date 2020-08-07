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
        public DbSet<Product> Products { get; set; }
    }
}
