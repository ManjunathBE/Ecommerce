using GroceryStore_Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryStore_Backend.Services
{
	public interface IUsersService
	{
		Task<User> GetUserAsync (long userId);

		Task<User> EditUserAsync(Guid userId, User UpdatedUserData);
		Task<User> AddUserAsync(User UserData);
        Task<Address> AddAddressAsync( Address address);
    }
}
