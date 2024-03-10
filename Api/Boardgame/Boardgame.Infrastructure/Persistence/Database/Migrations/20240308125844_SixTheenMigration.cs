using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Boardgame.Infrastructure.Persistence.Database.Migrations
{
    public partial class SixTheenMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Queue_TableId",
                table: "Queue");

            migrationBuilder.CreateIndex(
                name: "IX_Queue_TableId",
                table: "Queue",
                column: "TableId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Queue_TableId",
                table: "Queue");

            migrationBuilder.CreateIndex(
                name: "IX_Queue_TableId",
                table: "Queue",
                column: "TableId",
                unique: true,
                filter: "[TableId] IS NOT NULL");
        }
    }
}
