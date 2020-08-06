using GroceryStore_Backend.Models;
using GroceryStore_Backend.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryStore_Backend.Services
{
    public class GroceryStoreService : IGroceryStoreService
    {
        private readonly IGroceryStoreRepository _groceryStoreRepository;

        public GroceryStoreService(IGroceryStoreRepository groceryStoreRepository)
        {
            _groceryStoreRepository = groceryStoreRepository;
        }
        public Task<List<Product>> GetProductsAsync()
        {
            return _groceryStoreRepository.GetProductsAsync();
        }
    }
}
