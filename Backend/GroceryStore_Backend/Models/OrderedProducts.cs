using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryStore_Backend.Models
{
    public class OrderedProducts
    {
        [Key]
        public int ItemNumber { get; set; }
        public string ProductName { get; set; }
        public double Price { get; set; }
        public string Unit { get; set; }
        public double Quantity { get; set; }
        public double ProcessedQuantity { get; set; }
        public double ProcessedPrice { get; set; }

        [ForeignKey("OrderHistory")]
        public Guid OrderId { get; set; }
    }
}
