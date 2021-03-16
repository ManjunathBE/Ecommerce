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

        public async Task<User> GetUser(long phoneNumber)
        {
            var x =  _groceryStoreDbContext.User.Where(user => user.PhoneNumber == phoneNumber).Include(a => a.Address).FirstOrDefault();
            return x;
        }

        public async Task<User> AddUser(User userData)
        {
            userData.UserId = Guid.NewGuid();
            await _groceryStoreDbContext.AddAsync(userData);

            foreach (var address in userData.Address)
            {
                await _groceryStoreDbContext.AddAsync(address);
            }

            _groceryStoreDbContext.SaveChanges();
            return userData;
        }
        public async Task<User> EditUser(Guid userId, User UpdatedUserData)
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

        public async Task<List<OrderHistory>> GetOrderHistory(Guid userId)
        {

            var orders = _groceryStoreDbContext.OrderHistory.Where(q => q.UserId == userId).Include(y => y.OrderedProducts).ToList();
            return orders;

            //var jsonObj = JObject.Parse(json);
            //List<OrderHistory> transactions = new List<OrderHistory>();
            //JArray TransactionArray = jsonObj.GetValue("Transaction") as JArray;

            //foreach (var obj in TransactionArray)
            //{
            //    OrderHistory transaction = obj.ToObject<OrderHistory>();
            //    if (transaction.UserId == userId)
            //    {
            //        transactions.Add(transaction);
            //    }
            //}
            //return transactions;

            // return _groceryStoreDbContext.OrderHistory.Where( e => e.UserId == UserId).ToList();
        }

        public async Task<OrderHistory> AddTrnsaction(OrderHistory transaction)
        {

            transaction.OrderId = new Guid();
            transaction.TransactionDateTime = DateTime.Now;
            await _groceryStoreDbContext.AddAsync(transaction);

            foreach (var orderItem in transaction.OrderedProducts)
            {
                await _groceryStoreDbContext.AddAsync(orderItem);
            }



            //_groceryStoreDbContext.Add(new OrderHistory()
            //{
            //    OrderedProducts = transaction.OrderedProducts,
            //    Status = transaction.Status,
            //    TransactionDateTime = DateTime.Now,
            //    UserId = transaction.UserId

            //}
            //    );
            _groceryStoreDbContext.SaveChanges();
            return transaction;

        }

        public async Task<Address> AddAddress(Address address)
        {
            await _groceryStoreDbContext.AddAsync(address);
            _groceryStoreDbContext.SaveChanges();
            return address;
        }
    }
}
