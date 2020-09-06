using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryStore_Backend.Models
{
    public class Address
    {
        [Key]
        public int Id { get; set; }
        public string HouseName { get; set; }
        public string AreaName { get; set; }
        public string City { get; set; }
        public string PinCode { get; set; }
    }
}
