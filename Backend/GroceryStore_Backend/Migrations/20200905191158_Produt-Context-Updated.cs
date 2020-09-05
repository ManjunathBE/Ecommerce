using Microsoft.EntityFrameworkCore.Migrations;

namespace GroceryStore_Backend.Migrations
{
    public partial class ProdutContextUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Product",
                columns: new[] { "Id", "Category", "Descrption", "ImagePath", "Price", "ProductName" },
                values: new object[,]
                {
                    { 3, "Vegetables", "baby_corn", "../../src/assets/products/baby_corn.jpg", "0.50", "baby_corn" },
                    { 25, "Vegetables", "cluster_beans", "../../src/assets/products/cluster_beans.jpg", "0.50", "cluster_beans" },
                    { 24, "Vegetables", "chow_chow", "../../src/assets/products/chow_chow.jpg", "0.50", "chow_chow" },
                    { 23, "Vegetables", "chilli_green", "../../src/assets/products/chilli_green.jpg", "0.50", "chilli_green" },
                    { 22, "Vegetables", "cauli_flower", "../../src/assets/products/cauli_flower.jpg", "0.50", "cauli_flower" },
                    { 21, "Vegetables", "carrot_ooty", "../../src/assets/products/carrot_ooty.jpg", "0.50", "carrot_ooty" },
                    { 20, "Vegetables", "capsicum_yellow", "../../src/assets/products/capsicum_yellow.jpg", "0.50", "capsicum_yellow" },
                    { 19, "Vegetables", "capsicum_red", "../../src/assets/products/capsicum_red.jpg", "0.50", "capsicum_red" },
                    { 18, "Vegetables", "capsicum_green", "../../src/assets/products/capsicum_green.jpg", "0.50", "capsicum_green" },
                    { 17, "Vegetables", "cabbage", "../../src/assets/products/cabbage.jpg", "0.50", "cabbage" },
                    { 16, "Vegetables", "broccoli", "../../src/assets/products/broccoli.jpg", "0.50", "broccoli" },
                    { 26, "Vegetables", "coconut", "../../src/assets/products/coconut.jpg", "0.50", "coconut" },
                    { 15, "Vegetables", "brinjal_round", "../../src/assets/products/brinjal_round.jpg", "0.50", "brinjal_round" },
                    { 13, "Vegetables", "bottle_gourd", "../../src/assets/products/bottle_gourd.jpg", "0.50", "bottle_gourd" },
                    { 12, "Vegetables", "bottle_brinjal", "../../src/assets/products/bottle_brinjal.jpg", "0.50", "bottle_brinjal" },
                    { 11, "Vegetables", "bitter_gourd", "../../src/assets/products/bitter_gourd.jpg", "0.50", "bitter_gourd" },
                    { 10, "Vegetables", "beetroot", "../../src/assets/products/beetroot.jpg", "0.50", "beetroot" },
                    { 9, "Vegetables", "beans_ring", "../../src/assets/products/beans_ring.jpg", "0.50", "beans_ring" },
                    { 8, "Vegetables", "beans_natti", "../../src/assets/products/beans_natti.jpg", "0.50", "beans_natti" },
                    { 7, "Vegetables", "beans_long", "../../src/assets/products/beans_long.jpg", "0.50", "beans_long" },
                    { 6, "Vegetables", "banana_stem", "../../src/assets/products/banana_stem.jpg", "0.50", "banana_stem" },
                    { 5, "Vegetables", "banana_flower", "../../src/assets/products/banana_flower.jpg", "0.50", "banana_flower" },
                    { 4, "Vegetables", "baby_jackfruit", "../../src/assets/products/baby_jackfruit.jpg", "0.50", "baby_jackfruit" },
                    { 14, "Vegetables", "brinjal_green", "../../src/assets/products/brinjal_green.jpg", "0.50", "brinjal_green" },
                    { 27, "Vegetables", "flat_beans", "../../src/assets/products/flat_beans.jpg", "0.50", "flat_beans" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 27);
        }
    }
}
