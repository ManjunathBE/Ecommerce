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
            return CreateCategory();
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

        private List<Product> CreateProduct()
        {
            var productList = new List<Product>();

            Category category1 = new Category();
            category1.CategoryId = 1;
            category1.Name = "vegitables";

            Category category2 = new Category();
            category2.CategoryId = 2;
            category2.Name = "fruits";

            Category category3 = new Category();
            category3.CategoryId = 2;
            category3.Name = "leafs";

            Category category4 = new Category();
            category4.CategoryId = 2;
            category4.Name = "breads";


            var product1 = new Product()
            {
                Id = 1,
                //Category = category1,
                Descrption = "Red Onion",
                ProductName = "Red_Onion",
                ImagePath = "",
                Price = "40"
            };

            var product2 = new Product()
            {
                Id = 1,
                //Category = category1,
                Descrption = "White Onion",
                ProductName = "White_Onion",
                ImagePath = "",
                Price = "45"
            };

            var product3 = new Product()
            {
                Id = 1,
                //Category = category2,
                Descrption = "Bananna",
                ProductName = "Bananna",
                ImagePath = "",
                Price = "40"
            };

            var product4 = new Product()
            {
                Id = 1,
                //Category = category3,
                Descrption = "Coriander",
                ProductName = "Coriander",
                ImagePath = "",
                Price = "40"
            };

            productList.Add(product1);
            productList.Add(product2);
            productList.Add(product3);
            productList.Add(product4);

            return productList;
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
