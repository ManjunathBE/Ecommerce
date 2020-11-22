using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GroceryStore_Backend.Models;
using GroceryStore_Backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GroceryStore_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransactionController : Controller
    {
        private readonly ITransactionHistoryService _transactionHistoryService; 
        public TransactionController(ITransactionHistoryService transactionHistoryService)
        {
            _transactionHistoryService = transactionHistoryService;
        }
        [HttpGet]
        public async Task<IActionResult> GetTransactionsasync(Guid UserId)
        {       
            return Ok(await _transactionHistoryService.GetTransactionsasync(UserId));
        }
        [HttpPost]
        public async Task<IActionResult> AddTransaction(TransactionHistory transaction)
        {
            await _transactionHistoryService.AddTransactionsasync(transaction);
            return Created("$transaction", transaction);
        }
    }
}
