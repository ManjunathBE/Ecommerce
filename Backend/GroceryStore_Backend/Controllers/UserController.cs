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
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUsersService _userService;
        public UserController (IUsersService usersService)
	{
        _userService = usersService;

	}
        [HttpGet]
        public async Task<IActionResult> GetUserAsync (long phoneNumber )
        {
            var user = await _userService.GetUsersasync(phoneNumber);
            return Ok(user);
        }
        
        [HttpPut]
        public async Task<IActionResult> Edit(int userId, User updatedUserData)
        {
            await _userService.EditUsersasync(userId, updatedUserData);
            return Created($"api/user", updatedUserData);
        }
        
    }
}