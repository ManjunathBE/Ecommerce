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
        private List<Category> CreateCategory()
        {
            var categoryList = new List<Category>();

            var category1 = new Category()
            {
                CategoryId = 1,
                Name = "vegitables"
            };

            var category2 = new Category()
            {
                CategoryId = 2,
                Name = "fruits"
            };

            var category3 = new Category()
            {
                CategoryId = 3,
                Name = "leafs"
            };

            var category4 = new Category()
            {
                CategoryId = 4,
                Name = "drinks"
            };

            categoryList.Add(category1);
            categoryList.Add(category2);
            categoryList.Add(category3);
            categoryList.Add(category4);
            return categoryList;
        }
    }
}
