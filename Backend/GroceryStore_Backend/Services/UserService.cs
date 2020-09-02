using GroceryStore_Backend.Models;
using GroceryStore_Backend.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryStore_Backend.Services
{
    public class UserService : IUsersService
    {
        private readonly IGroceryStoreRepository _groceryStoreRepository;
        public UserService(IGroceryStoreRepository groceryStoreRepository)
        {
            _groceryStoreRepository = groceryStoreRepository;
        }

        public Task<User> GetUsersasync(int userId)
        {
            return _groceryStoreRepository.GetUser(userId);
        }
    }
}
