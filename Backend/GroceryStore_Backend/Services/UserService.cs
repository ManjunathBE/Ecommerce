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

        public Task<User> GetUsersasync(long phoneNumber)
        {
            return _groceryStoreRepository.GetUser(phoneNumber);
        }

        public async Task<User> EditUsersasync(int userId, User UpdatedUserData)
        {
             return await  _groceryStoreRepository.EditUser(userId, UpdatedUserData);
        }
    }
}
