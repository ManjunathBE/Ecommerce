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
    public class DepartmentController : Controller
    {
        private readonly IProductService _groceryStoreService;

        public DepartmentController(IProductService groceryStoreService)
        {
            _groceryStoreService = groceryStoreService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProductsAsync()
        {
            var products = await _groceryStoreService.GetDepartments();
            return Ok(products);
        }
    }
}