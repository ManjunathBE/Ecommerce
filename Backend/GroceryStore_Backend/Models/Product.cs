using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryStore_Backend.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public string ImagePath { get; set; }
        public string Price { get; set; }
        public string Descrption { get; set; }
        public string Category { get; set; }
    }
}
