using GroceryStore_Backend.Models;
using GroceryStore_Backend.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryStore_Backend.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IGroceryStoreRepository _groceryStoreRepository;
        public DepartmentService(IGroceryStoreRepository groceryStoreRepository)
        {
            _groceryStoreRepository = groceryStoreRepository;
        }
        public Task<List<Department>> GetDepartments()
        {
            return _groceryStoreRepository.GetDepartments();
        }
    }
}
