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
        public UserController(IUsersService usersService)
        {
            _userService = usersService;

        }
        [HttpGet]
        public async Task<IActionResult> GetUserAsync(long phoneNumber)
        {

            var user = await _userService.GetUserAsync(phoneNumber);
            return Ok(user);
        }

        [HttpPut]
        public async Task<IActionResult> Edit(Guid userId, User updatedUserData)
        {
            await _userService.EditUserAsync(userId, updatedUserData);
            return Created($"api/user", updatedUserData);
        }

        [HttpPost("Address")]   
        
        public async Task<IActionResult> AddAddress(Address address)
        {
            var addedAddress = await _userService.AddAddressAsync(address);
            return Created($"api/user, added address", addedAddress);
        }

        [HttpPost]
        public async Task<IActionResult> Add(User userData)
        {
           var addedUser = await _userService.AddUserAsync(userData);
            return Created($"api/user", addedUser);
        }

    }
}