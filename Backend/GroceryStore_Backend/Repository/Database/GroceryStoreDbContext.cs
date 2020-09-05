using GroceryStore_Backend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryStore_Backend.Repository.Database
{
    public class GroceryStoreDbContext : DbContext
    {
        public GroceryStoreDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Product> Product { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Address> Address { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().HasData(new Product
            {
               Id= 1,
               Descrption= "amla",
               ProductName= "amla",
               ImagePath= "../../src/assets/products/amla.jpg",
               Price= "0.50",
               Category= "Vegetables"
            },new Product
            {
               Id= 2,
               Descrption= "arbi(sham_root)",
               ProductName= "arbi(sham_root)",
               ImagePath= "../../src/assets/products/arbi(sham_root).jpg",
               Price= "0.50",
               Category= "Vegetables"
            
            },new Product
            {
               Id= 3,
               Descrption= "baby_corn",
               ProductName= "baby_corn",
               ImagePath= "../../src/assets/products/baby_corn.jpg",
               Price= "0.50",
               Category= "Vegetables"
            
            },new Product
            {
               Id= 4,
               Descrption= "baby_jackfruit",
               ProductName= "baby_jackfruit",
               ImagePath= "../../src/assets/products/baby_jackfruit.jpg",
               Price= "0.50",
               Category= "Vegetables"
            
            },new Product
            {
               Id= 5,
               Descrption= "banana_flower",
               ProductName= "banana_flower",
               ImagePath= "../../src/assets/products/banana_flower.jpg",
               Price= "0.50",
               Category= "Vegetables"
            
            },new Product
            {
               Id= 6,
               Descrption= "banana_stem",
               ProductName= "banana_stem",
               ImagePath= "../../src/assets/products/banana_stem.jpg",
               Price= "0.50",
               Category= "Vegetables"
            
            },new Product
            {
               Id= 7,
               Descrption= "beans_long",
               ProductName= "beans_long",
               ImagePath= "../../src/assets/products/beans_long.jpg",
               Price= "0.50",
               Category= "Vegetables"
            
            },new Product
            {
               Id= 8,
               Descrption= "beans_natti",
               ProductName= "beans_natti",
               ImagePath= "../../src/assets/products/beans_natti.jpg",
               Price= "0.50",
               Category= "Vegetables"
            
            },new Product
            {
               Id= 9,
               Descrption= "beans_ring",
               ProductName= "beans_ring",
               ImagePath= "../../src/assets/products/beans_ring.jpg",
               Price= "0.50",
               Category= "Vegetables"
            
            },new Product
            {
               Id= 10,
               Descrption= "beetroot",
               ProductName= "beetroot",
               ImagePath= "../../src/assets/products/beetroot.jpg",
               Price= "0.50",
               Category= "Vegetables"
            
            },new Product
            {
               Id= 11,
               Descrption= "bitter_gourd",
               ProductName= "bitter_gourd",
               ImagePath= "../../src/assets/products/bitter_gourd.jpg",
               Price= "0.50",
               Category= "Vegetables"
            
            },new Product
            {
               Id= 12,
               Descrption= "bottle_brinjal",
               ProductName= "bottle_brinjal",
               ImagePath= "../../src/assets/products/bottle_brinjal.jpg",
               Price= "0.50",
               Category= "Vegetables"
            
            },new Product
            {
               Id= 13,
               Descrption= "bottle_gourd",
               ProductName= "bottle_gourd",
               ImagePath= "../../src/assets/products/bottle_gourd.jpg",
               Price= "0.50",
               Category= "Vegetables"
            
            },new Product
            {
               Id= 14,
               Descrption= "brinjal_green",
               ProductName= "brinjal_green",
               ImagePath= "../../src/assets/products/brinjal_green.jpg",
               Price= "0.50",
               Category= "Vegetables"
            
            },new Product
            {
               Id= 15,
               Descrption= "brinjal_round",
               ProductName= "brinjal_round",
               ImagePath= "../../src/assets/products/brinjal_round.jpg",
               Price= "0.50",
               Category= "Vegetables"
            
            },new Product
            {
               Id= 16,
               Descrption= "broccoli",
               ProductName= "broccoli",
               ImagePath= "../../src/assets/products/broccoli.jpg",
               Price= "0.50",
               Category= "Vegetables"
            
            },new Product
            {
               Id= 17,
               Descrption= "cabbage",
               ProductName= "cabbage",
               ImagePath= "../../src/assets/products/cabbage.jpg",
               Price= "0.50",
               Category= "Vegetables"
            
            },new Product
            {
               Id= 18,
               Descrption= "capsicum_green",
               ProductName= "capsicum_green",
               ImagePath= "../../src/assets/products/capsicum_green.jpg",
               Price= "0.50",
               Category= "Vegetables"
            
            },new Product
            {
               Id= 19,
               Descrption= "capsicum_red",
               ProductName= "capsicum_red",
               ImagePath= "../../src/assets/products/capsicum_red.jpg",
               Price= "0.50",
               Category= "Vegetables"
            
            },new Product
            {
               Id= 20,
               Descrption= "capsicum_yellow",
               ProductName= "capsicum_yellow",
               ImagePath= "../../src/assets/products/capsicum_yellow.jpg",
               Price= "0.50",
               Category= "Vegetables"
            
            },new Product
            {
               Id= 21,
               Descrption= "carrot_ooty",
               ProductName= "carrot_ooty",
               ImagePath= "../../src/assets/products/carrot_ooty.jpg",
               Price= "0.50",
               Category= "Vegetables"
            
            },new Product
            {
               Id= 22,
               Descrption= "cauli_flower",
               ProductName= "cauli_flower",
               ImagePath= "../../src/assets/products/cauli_flower.jpg",
               Price= "0.50",
               Category= "Vegetables"
            
            },new Product
            {
               Id= 23,
               Descrption= "chilli_green",
               ProductName= "chilli_green",
               ImagePath= "../../src/assets/products/chilli_green.jpg",
               Price= "0.50",
               Category= "Vegetables"
            
            },new Product
            {
               Id= 24,
               Descrption= "chow_chow",
               ProductName= "chow_chow",
               ImagePath= "../../src/assets/products/chow_chow.jpg",
               Price= "0.50",
               Category= "Vegetables"
            
            },new Product
            {
               Id= 25,
               Descrption= "cluster_beans",
               ProductName= "cluster_beans",
               ImagePath= "../../src/assets/products/cluster_beans.jpg",
               Price= "0.50",
               Category= "Vegetables"
            
            },new Product
            {
               Id= 26,
               Descrption= "coconut",
               ProductName= "coconut",
               ImagePath= "../../src/assets/products/coconut.jpg",
               Price= "0.50",
               Category= "Vegetables"
            
            },new Product
            {
               Id= 27,
               Descrption= "flat_beans",
               ProductName= "flat_beans",
               ImagePath= "../../src/assets/products/flat_beans.jpg",
               Price= "0.50",
               Category= "Vegetables"
            
            });
        }
    }
}
