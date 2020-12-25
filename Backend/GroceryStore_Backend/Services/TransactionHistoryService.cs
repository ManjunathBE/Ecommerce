using GroceryStore_Backend.Models;
using GroceryStore_Backend.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryStore_Backend.Services
{
    public class OrderHistoryService : IOrderHistoryService
    {
        private readonly IGroceryStoreRepository _groceryStoreRepository;
        public OrderHistoryService(IGroceryStoreRepository groceryStoreRepository)
        {
            _groceryStoreRepository = groceryStoreRepository;
        }

        public async Task<OrderHistory> AddTransactionsasync(OrderHistory transaction)
        {
             return await _groceryStoreRepository.AddTrnsaction(transaction);
        }

        public Task<List<OrderHistory>> GetTransactionsasync(Guid UserId)
        {
            return _groceryStoreRepository.GetOrderHistory(UserId);
        }
    }
}
