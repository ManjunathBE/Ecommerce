using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GroceryStore_Backend.Models;
using GroceryStore_Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace GroceryStore_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IUsersService _userService;
        public UserController (IUsersService usersService)
	{
        _userService = usersService;

	}
        [HttpGet]
        public async Task<IActionResult> GetUserAsync (int userId )
        {
            var user = await _userService.GetUsersasync(userId);
            return Ok(user);
        }  
        
    }
}