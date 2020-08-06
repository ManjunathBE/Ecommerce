using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GroceryStore_Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace GroceryStore_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : Controller
    {
        private readonly IGroceryStoreService _groceryStoreService;

        public ProductController(IGroceryStoreService groceryStoreService)
        {
            _groceryStoreService = groceryStoreService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProductsAsync()
        {
            var products = await _groceryStoreService.GetProductsAsync();
            return Ok(products);
        }
    }
}