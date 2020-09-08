﻿// <auto-generated />
using System;
using GroceryStore_Backend.Repository.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace GroceryStore_Backend.Migrations
{
    [DbContext(typeof(GroceryStoreDbContext))]
    partial class GroceryStoreDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("GroceryStore_Backend.Models.Address", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("Address")
                        .HasColumnType("int");

                    b.Property<string>("AreaName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HouseName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PinCode")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("Address");

                    b.ToTable("Address");
                });

            modelBuilder.Entity("GroceryStore_Backend.Models.Category", b =>
                {
                    b.Property<int>("CategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CategoryId");

                    b.ToTable("Category");
                });

            modelBuilder.Entity("GroceryStore_Backend.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Category")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Descrption")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImagePath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Price")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProductName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Product");
                });

            modelBuilder.Entity("GroceryStore_Backend.Models.TransactionHistory", b =>
                {
                    b.Property<int>("TransactionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("OrderId")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TransactionDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TransactionTime")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("TransactionId");

                    b.ToTable("TransactionHistories");

                    b.HasData(
                        new
                        {
                            TransactionId = 1,
                            OrderId = 1,
                            Status = "Executed",
                            TransactionDate = "06-09-2020",
                            TransactionTime = "01:00:00 AM",
                            UserId = 1
                        },
                        new
                        {
                            TransactionId = 2,
                            OrderId = 1,
                            Status = "Processing",
                            TransactionDate = "06-09-2020",
                            TransactionTime = "02:00:00 AM",
                            UserId = 2
                        },
                        new
                        {
                            TransactionId = 3,
                            OrderId = 2,
                            Status = "Validating",
                            TransactionDate = "07-09-2020",
                            TransactionTime = "03:00:00 AM",
                            UserId = 1
                        },
                        new
                        {
                            TransactionId = 4,
                            OrderId = 3,
                            Status = "Finished",
                            TransactionDate = "07-09-2020",
                            TransactionTime = "04:00:00 AM",
                            UserId = 2
                        },
                        new
                        {
                            TransactionId = 5,
                            OrderId = 4,
                            Status = "Finished",
                            TransactionDate = "08-09-2020",
                            TransactionTime = "05:00:00 AM",
                            UserId = 1
                        });
                });

            modelBuilder.Entity("GroceryStore_Backend.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("User");
                });

            modelBuilder.Entity("GroceryStore_Backend.Models.Address", b =>
                {
                    b.HasOne("GroceryStore_Backend.Models.User", null)
                        .WithMany("Address")
                        .HasForeignKey("Address");
                });
#pragma warning restore 612, 618
        }
    }
}
