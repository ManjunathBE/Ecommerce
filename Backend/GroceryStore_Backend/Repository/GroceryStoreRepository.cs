using GroceryStore_Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryStore_Backend.Repository
{
    public class GroceryStoreRepository : IGroceryStoreRepository
    {
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
    }
}
