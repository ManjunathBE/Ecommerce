using GroceryStore_Backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace GroceryStore_Backend.Services
{
    public interface ITransactionHistoryService
    {
        public Task<List<TransactionHistory>> GetTransactionsasync(Guid UserId);
        Task<TransactionHistory> AddTransactionsasync(TransactionHistory transaction);
    }
}
