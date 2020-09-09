using GroceryStore_Backend.Models;
using GroceryStore_Backend.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryStore_Backend.Services
{
    public class TransactionHistoryService : ITransactionHistoryService
    {
        private readonly IGroceryStoreRepository _groceryStoreRepository;
        public TransactionHistoryService(IGroceryStoreRepository groceryStoreRepository)
        {
            _groceryStoreRepository = groceryStoreRepository;
        }
        public Task<List<TransactionHistory>> GetTransactionsasync(int UserId)
        {
            return _groceryStoreRepository.GetTransactionHistory(UserId);
        }
    }
}
