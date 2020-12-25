using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GroceryStore_Backend.Models
{

    public class OrderHistory
    {
        [Key]
        public Guid OrderId { get; set; }
        public DateTime TransactionDateTime { get; set; }
        public string Status { get; set; }
        public Guid UserId { get; set; }

        [ForeignKey("Address")]
        public int AddressId { get; set; }
        public List<OrderedProducts> OrderedProducts { get; set; }
        //public List<OrderedProducts> ProcessedProducts { get; set; }
    }
}
