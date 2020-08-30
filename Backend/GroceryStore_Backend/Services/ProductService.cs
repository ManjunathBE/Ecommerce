using GroceryStore_Backend.Models;
using GroceryStore_Backend.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryStore_Backend.Services
{
    public class ProductService : IProductService
    {
        private readonly IGroceryStoreRepository _groceryStoreRepository;

        public ProductService(IGroceryStoreRepository groceryStoreRepository)
        {
            _groceryStoreRepository = groceryStoreRepository;
        }


        public Task<List<Product>> GetProductsAsync(string category)
        {
            return _groceryStoreRepository.GetProductsAsync(category);
        }

        
    }
}
