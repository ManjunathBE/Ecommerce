using GroceryStore_Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryStore_Backend.Repository
{
    public class GroceryStoreRepository : IGroceryStoreRepository
    {
        public async Task<List<Category>> GetCategorys()
        {
            return CreateDepartments();
        }

        public async Task<List<Product>> GetProductsAsync()
        {
            return CreateProduct();
        }

        private List<Product> CreateProduct()
        {
            var productList = new List<Product>();

            var product1 = new Product()
            {
                Id = 1,
                Department = "vegitables",
                Descrption = "Red Onion",
                ProductName = "Red_Onion",
                ImagePath = "",
                Price = "40"
            };

            var product2 = new Product()
            {
                Id = 1,
                Department = "vegitables",
                Descrption = "White Onion",
                ProductName = "White_Onion",
                ImagePath = "",
                Price = "45"
            };

            var product3 = new Product()
            {
                Id = 1,
                Department = "fruits",
                Descrption = "Bananna",
                ProductName = "Bananna",
                ImagePath = "",
                Price = "40"
            };

            var product4 = new Product()
            {
                Id = 1,
                Department = "leafs",
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

        private List<Category> CreateDepartments()
        {
            var departmentList = new List<Category>();

            var department1 = new Category()
            {
                CategoryId = 1,
                Name = "vegitables"
            };

            var department2 = new Category()
            {
                CategoryId = 2,
                Name = "fruits"
            };

            var department3 = new Category()
            {
                CategoryId = 3,
                Name = "leafs"
            };

            var department4 = new Category()
            {
                CategoryId = 4,
                Name = "drinks"
            };

            departmentList.Add(department1);
            departmentList.Add(department2);
            departmentList.Add(department3);
            departmentList.Add(department4);
            return departmentList;
        }
    }
}
