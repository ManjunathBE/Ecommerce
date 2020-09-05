using Microsoft.EntityFrameworkCore.Migrations;

namespace GroceryStore_Backend.Migrations
{
    public partial class prductstableseeding2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Products",
                table: "Products");

            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "CategoryId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "CategoryId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "CategoryId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "CategoryId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "CategoryId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "CategoryId",
                keyValue: 6);

            migrationBuilder.RenameTable(
                name: "Products",
                newName: "Product");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Product",
                table: "Product",
                column: "Id");

            migrationBuilder.InsertData(
                table: "Product",
                columns: new[] { "Id", "Category", "Descrption", "ImagePath", "Price", "ProductName" },
                values: new object[] { 1, "Vegetables", "amla", "../../src/assets/products/amla.jpg", "0.50", "amla" });

            migrationBuilder.InsertData(
                table: "Product",
                columns: new[] { "Id", "Category", "Descrption", "ImagePath", "Price", "ProductName" },
                values: new object[] { 2, "Vegetables", "arbi(sham_root)", "../../src/assets/products/arbi(sham_root).jpg", "0.50", "arbi(sham_root)" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Product",
                table: "Product");

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.RenameTable(
                name: "Product",
                newName: "Products");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Products",
                table: "Products",
                column: "Id");

            migrationBuilder.InsertData(
                table: "Category",
                columns: new[] { "CategoryId", "Name" },
                values: new object[,]
                {
                    { 1, "Vegetables" },
                    { 2, "Fruits" },
                    { 3, "Leafs" },
                    { 4, "Bread" },
                    { 5, "Eggs" },
                    { 6, "Drinks" }
                });
        }
    }
}
