using Microsoft.EntityFrameworkCore.Migrations;

namespace GroceryStore_Backend.Migrations
{
    public partial class TransactionController : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_TransactionHistories",
                table: "TransactionHistories");

            migrationBuilder.RenameTable(
                name: "TransactionHistories",
                newName: "TransactionHistory");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TransactionHistory",
                table: "TransactionHistory",
                column: "TransactionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_TransactionHistory",
                table: "TransactionHistory");

            migrationBuilder.RenameTable(
                name: "TransactionHistory",
                newName: "TransactionHistories");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TransactionHistories",
                table: "TransactionHistories",
                column: "TransactionId");
        }
    }
}
