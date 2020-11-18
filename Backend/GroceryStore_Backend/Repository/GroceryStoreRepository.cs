using GroceryStore_Backend.Models;
using GroceryStore_Backend.Repository.Database;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryStore_Backend.Repository
{
    public class GroceryStoreRepository : IGroceryStoreRepository
    {
        private readonly GroceryStoreDbContext _groceryStoreDbContext;
        public GroceryStoreRepository(GroceryStoreDbContext groceryStoreDbContext)
        {
            _groceryStoreDbContext = groceryStoreDbContext;

        }
        string json = System.IO.File.ReadAllText("database.json");
        public async Task<List<Category>> GetCategorys()
        {
            var jsonObj = JObject.Parse(json);
            List<Category> CategoryList = new List<Category>();
            JArray CategoryArray = jsonObj.GetValue("category") as JArray;

            foreach (var obj in CategoryArray)
            {
                Category category = obj.ToObject<Category>();
                CategoryList.Add(category);
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

        public async Task<User> GetUser(int userId)
        {
            var x = _groceryStoreDbContext.User.Where(user => user.UserId == userId).Include(a => a.Address).FirstOrDefault();
            return x;
            //var jsonObj = JObject.Parse(json);
            //User UserList = new User();
            //JArray UserArray = jsonObj.GetValue("user") as JArray;

            //foreach (var obj in UserArray)
            //{
            //    User user = obj.ToObject<User>();
            //    if (user.Id == userId)
            //    {
            //        return user;
            //    }
            //}
            //return null;
        }
        public async Task<User> EditUser(int userId, User UpdatedUserData)
        {
            try
            {
                var user = _groceryStoreDbContext.User.Where(user => user.UserId == userId).Include(a => a.Address).SingleOrDefault();
                
                var userEntry = _groceryStoreDbContext.Entry(user);
                
                userEntry.CurrentValues.SetValues(UpdatedUserData);

                foreach(var address in UpdatedUserData.Address)
                {
                    var existingAddress = user.Address.Where(x => x.Id == address.Id).SingleOrDefault();
                    if(existingAddress!=null)
                    _groceryStoreDbContext.Entry(existingAddress).CurrentValues.SetValues(address);             
                }
                _groceryStoreDbContext.SaveChanges();
                
            }
            catch (Exception ex)
            {
                var x = ex.Message;
                var y = ex.InnerException;
                
            }
            return UpdatedUserData;
        }

        public async Task<List<TransactionHistory>> GetTransactionHistory(int userId)
        {
            // var x = _groceryStoreDbContext.OrderedProducts.Count();
            return _groceryStoreDbContext.TransactionHistory.Where(tran => tran.UserId == userId).Include(d => d.OrderedProducts).ToList();

            //var jsonObj = JObject.Parse(json);
            //List<TransactionHistory> transactions = new List<TransactionHistory>();
            //JArray TransactionArray = jsonObj.GetValue("Transaction") as JArray;

            //foreach (var obj in TransactionArray)
            //{
            //    TransactionHistory transaction = obj.ToObject<TransactionHistory>();
            //    if (transaction.UserId == userId)
            //    {
            //        transactions.Add(transaction);
            //    }
            //}
            //return transactions;

            // return _groceryStoreDbContext.TransactionHistory.Where( e => e.UserId == UserId).ToList();
        }

        public async Task AddTrnsaction(TransactionHistory transaction)
        {
            //_groceryStoreDbContext.Add(transaction.OrderedProducts);

            _groceryStoreDbContext.Add(new TransactionHistory()
            {
                OrderedProducts = transaction.OrderedProducts,
                Status = transaction.Status,
                TransactionDateTime = DateTime.Now,
                UserId = transaction.UserId

            }
                );
            _groceryStoreDbContext.SaveChanges();


        }


    }
}
