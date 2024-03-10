﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Boardgame.Infrastructure.Persistence.Database.Migrations
{
    public partial class TWMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NotificationStatus",
                table: "Notification",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NotificationStatus",
                table: "Notification");
        }
    }
}
