using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Boardgame.Infrastructure.Persistence.Database.Migrations
{
    public partial class SevenMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Queue_UserId",
                table: "Queue");

            migrationBuilder.CreateIndex(
                name: "IX_Queue_UserId",
                table: "Queue",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Queue_UserId",
                table: "Queue");

            migrationBuilder.CreateIndex(
                name: "IX_Queue_UserId",
                table: "Queue",
                column: "UserId",
                unique: true);
        }
    }
}
