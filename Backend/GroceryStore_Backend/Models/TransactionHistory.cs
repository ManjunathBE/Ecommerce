using System.ComponentModel.DataAnnotations;

namespace GroceryStore_Backend.Models
{
    public class TransactionHistory
    {
        [Key]
        public int TransactionId { get; set; }
        public string TransactionDate { get; set; }
        public string TransactionTime { get; set; }
        public string Status { get; set; }
        public int OrderId { get; set; }
        public int UserId { get; set; }
    }
}
