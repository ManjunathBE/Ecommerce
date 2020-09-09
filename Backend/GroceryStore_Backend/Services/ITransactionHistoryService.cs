using GroceryStore_Backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GroceryStore_Backend.Services
{
    public interface ITransactionHistoryService
    {
        public Task<List<TransactionHistory>> GetTransactionsasync(int UserId);
    }
}
