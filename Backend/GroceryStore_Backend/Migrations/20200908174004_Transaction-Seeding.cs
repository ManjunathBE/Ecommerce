using Microsoft.EntityFrameworkCore.Migrations;

namespace GroceryStore_Backend.Migrations
{
    public partial class TransactionSeeding : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Id",
                table: "TransactionHistories");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "TransactionHistories",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "TransactionHistories",
                keyColumn: "TransactionId",
                keyValue: 1,
                column: "UserId",
                value: 1);

            migrationBuilder.UpdateData(
                table: "TransactionHistories",
                keyColumn: "TransactionId",
                keyValue: 2,
                columns: new[] { "OrderId", "UserId" },
                values: new object[] { 1, 2 });

            migrationBuilder.InsertData(
                table: "TransactionHistories",
                columns: new[] { "TransactionId", "OrderId", "Status", "TransactionDate", "TransactionTime", "UserId" },
                values: new object[,]
                {
                    { 3, 2, "Validating", "07-09-2020", "03:00:00 AM", 1 },
                    { 4, 3, "Finished", "07-09-2020", "04:00:00 AM", 2 },
                    { 5, 4, "Finished", "08-09-2020", "05:00:00 AM", 1 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "TransactionHistories",
                keyColumn: "TransactionId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "TransactionHistories",
                keyColumn: "TransactionId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "TransactionHistories",
                keyColumn: "TransactionId",
                keyValue: 5);

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "TransactionHistories");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "TransactionHistories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "TransactionHistories",
                keyColumn: "TransactionId",
                keyValue: 2,
                column: "OrderId",
                value: 2);
        }
    }
}
