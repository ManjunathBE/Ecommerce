using GroceryStore_Backend.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryStore_Backend.Repository
{
    public class GroceryStoreRepository : IGroceryStoreRepository
    {
        string json = System.IO.File.ReadAllText("database.json");
        public async Task<List<Category>> GetCategorys()
        {
            var jsonObj = JObject.Parse(json);
            List<Category> CategoryList = new List<Category>();
            JArray CategoryArray = jsonObj.GetValue("category") as JArray;

            foreach (var obj in CategoryArray)
            {
                Category product = obj.ToObject<Category>();
                CategoryList.Add(product);
            }
            return CategoryList;
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

        public async Task<User> GetUser(string userId)
        {
            return createUser();

        }

        private User createUser()
        {
            User user = new User();
            Address address = new Address();
            address.AreaName = "Sarjapur";
            address.City = "Bengaluru";
            address.HouseName = "163";
            address.PinCode = "566125";

            Address address2 = new Address();
            address2.AreaName = "Sarjapur";
            address2.City = "Bengaluru";
            address2.HouseName = "163";
            address2.PinCode = "566125";

            List<Address> addresses = new List<Address>();
            addresses.Add(address);
            addresses.Add( address2);

            user.Address = addresses;
            user.Email = "user@gmail.com";
            user.FirstName = "First Name";
            user.LastName = "Last name";
            user.Id = 3;
            user.PhoneNumber = "45669";

            return user;
        }
    }
}
