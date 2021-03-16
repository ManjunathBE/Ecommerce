using GroceryStore_Backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace GroceryStore_Backend.Services
{
    public interface IOrderHistoryService
    {
        public Task<List<OrderHistory>> GetTransactionsasync(Guid UserId);
        Task<OrderHistory> AddTransactionsasync(OrderHistory transaction);
    }
}
