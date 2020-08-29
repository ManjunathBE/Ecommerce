using GroceryStore_Backend.Models;
using GroceryStore_Backend.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryStore_Backend.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IGroceryStoreRepository _groceryStoreRepository;
        public CategoryService(IGroceryStoreRepository groceryStoreRepository)
        {
            _groceryStoreRepository = groceryStoreRepository;
        }
        public Task<List<Category>> GetCategory()
        {
            return _groceryStoreRepository.GetCategorys();
        }
    }
}
