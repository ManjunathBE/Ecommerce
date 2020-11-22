using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
    }
    public class TransactionHistory
    {
        [Key]
        public int TransactionId { get; set; }
        public DateTime TransactionDateTime { get; set; }
        public string Status { get; set; }
        public Guid UserId { get; set; }     
        public List<OrderedProducts> OrderedProducts { get; set; }
        
    }
}
