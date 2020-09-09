using GroceryStore_Backend.Models;
using GroceryStore_Backend.Repository.Database;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryStore_Backend.Repository
{
    public class GroceryStoreRepository : IGroceryStoreRepository
    {
        private readonly GroceryStoreDbContext _groceryStoreDbContext;
        public GroceryStoreRepository(GroceryStoreDbContext groceryStoreDbContext)
        {
            _groceryStoreDbContext = groceryStoreDbContext;

        }
        string json = System.IO.File.ReadAllText("database.json");
        public async Task<List<Category>> GetCategorys()
        {
            return _groceryStoreDbContext.Category.ToList();

           
        }

        public async Task<List<Product>> GetProductsAsync(string category)
        {
            var jsonObj = JObject.Parse(json);
            List<Product> ProductList = new List<Product>();
            JArray ProductArray = jsonObj.GetValue("products") as JArray;

            foreach (var obj in ProductArray)
            {
                Product product = obj.ToObject<Product>();
                if (!string.IsNullOrEmpty(category))
                {
                    if (product.Category.ToUpper() == category.ToUpper())
                    {
                        ProductList.Add(product);
                    }
                }
                else
                {
                    ProductList.Add(product);
                }
            }
            return ProductList;
        }

        public async Task<User> GetUser(int userId)
        {
            var jsonObj = JObject.Parse(json);
            User UserList = new User();
            JArray UserArray = jsonObj.GetValue("user") as JArray;

            foreach (var obj in UserArray)
            {
                User user = obj.ToObject<User>();
                if(user.Id == userId)
                {
                    return user;
                }
            }
            return null;
        }
 
        public async Task<List<TransactionHistory>> GetTransactionHistory(int UserId)
        {
            return _groceryStoreDbContext.TransactionHistory.Where( e => e.UserId == UserId).ToList();
        }
 
    }
}
