﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Boardgame.Infrastructure.Persistence.Database.Migrations
{
    public partial class FiveMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Queue_TableId",
                table: "Queue");

            migrationBuilder.AlterColumn<Guid>(
                name: "TableId",
                table: "Queue",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.CreateIndex(
                name: "IX_Queue_TableId",
                table: "Queue",
                column: "TableId",
                unique: true,
                filter: "[TableId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Queue_TableId",
                table: "Queue");

            migrationBuilder.AlterColumn<Guid>(
                name: "TableId",
                table: "Queue",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Queue_TableId",
                table: "Queue",
                column: "TableId",
                unique: true);
        }
    }
}
