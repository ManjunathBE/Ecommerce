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
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProductsAsync()
        {
            var products = await _productService.GetProductsAsync();
            return Ok(products);
        }
    }
}