using GroceryStore_Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryStore_Backend.Repository
{
    public interface IGroceryStoreRepository
    {
            
        Task<List<Product>> GetProductsAsync(string category);

        Task<List<Category>> GetCategorys();
    }
}
