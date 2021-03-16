using GroceryStore_Backend.Models;
using Microsoft.Extensions.Configuration;
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

        Task<User> GetUser(long phoneNumber);

        Task<User> EditUser(Guid userId, User UpdatedUserData);

        Task<User> AddUser(User userData);
        
        Task<List<OrderHistory>> GetOrderHistory(Guid UserId);
        Task<OrderHistory> AddTrnsaction(OrderHistory transaction);
        Task<Address> AddAddress(Address address);
    }
}
