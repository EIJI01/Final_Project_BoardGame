using Boardgame.Domain.Entities;
using Boardgame.Domain.Entities.Common;
using Microsoft.AspNetCore.Identity;

namespace Boardgame.Infrastructure.Persistence.Database;

public class Seed
{
    public static async Task SeedData(DataContext context)
    {
        Guid adminGuid = new("6f171dd3-7882-489b-be6b-5385731c5049");
        Guid branchLm = new("e4d756fa-ce1c-46cc-8cb8-ba08712c6708");
        Guid branchCt = new("673c9908-d75b-4bb4-a4ac-8ec5e66a7baa");

        if (!context.Roles.Any())
        {
            var roles = new List<RoleIdentity>
            {
                new(){ Id = Guid.NewGuid(), Name = "MEMBER", NormalizedName = "MEMBER"},
                new(){ Id = adminGuid, Name = "ADMIN", NormalizedName = "ADMIN"},
                new(){ Id = Guid.NewGuid(), Name = "GM", NormalizedName = "GM"},
            };

            await context.Roles.AddRangeAsync(roles);
            await context.SaveChangesAsync();
        }

        if (!context.Branches!.Any())
        {
            var branches = new List<Branch>
            {
                new()
                {
                    Id = branchLm,
                    BranchName = "LungMor",
                    Address = "761/13 (ติดเซเว่นยูพลาซ่า) ถ.โนนม่วง-มข. เทศบาลนครขอนแก่น 40000",
                    PlayPricePerHour = 29,
                    BuffetPrice = 99
                },
                new()
                {
                    Id = branchCt,
                    BranchName = "Central",
                    Address = "99, 99/1 ถ.ศรีจันทร์ ต.ในเมือง อ.เมืองขอนแก่น, Khon Kaen, Thailand, Khon Kaen",
                    PlayPricePerHour = 39,
                    BuffetPrice = 139
                }
            };

            await context.Branches!.AddRangeAsync(branches);
            await context.SaveChangesAsync();
        }

        if (!context.Cards!.Any())
        {
            var cards = new List<Card>();
            for (int i = 1; i <= 80; i++)
            {
                cards.Add(
                    new Card
                    {
                        Id = Guid.NewGuid(),
                        CardNumber = $"LM0{i}",
                        BranchId = branchLm
                    });
                cards.Add(
                    new Card
                    {
                        Id = Guid.NewGuid(),
                        CardNumber = $"CT0{i}",
                        BranchId = branchCt
                    });
            }

            await context.Cards!.AddRangeAsync(cards);
            await context.SaveChangesAsync();
        }

        if (!context.Tables!.Any())
        {
            var tables = new List<TablePlay>();
            for (int i = 1; i <= 11; i++)
            {
                if (i <= 9)
                {
                    tables.Add(
                    new TablePlay
                    {
                        Id = Guid.NewGuid(),
                        Status = StatusTable.Empty,
                        BranchId = branchLm,
                        Type = TableType.Table,
                        TableNumber = $"T{i}"
                    });
                    tables.Add(
                    new TablePlay
                    {
                        Id = Guid.NewGuid(),
                        Status = StatusTable.Empty,
                        BranchId = branchCt,
                        Type = TableType.Table,
                        TableNumber = $"T{i}"
                    });
                }
                else
                {
                    tables.Add(
                    new TablePlay
                    {
                        Id = Guid.NewGuid(),
                        Status = StatusTable.Empty,
                        BranchId = branchLm,
                        Type = TableType.Table,
                        TableNumber = $"T{i}"
                    });
                }
            }
            tables.Add(new TablePlay
            {
                Id = Guid.NewGuid(),
                Status = StatusTable.Empty,
                BranchId = branchCt,
                Type = TableType.Nintendo,
                TableNumber = "Nintendo"
            });
            tables.Add(new TablePlay
            {
                Id = Guid.NewGuid(),
                Status = StatusTable.Empty,
                BranchId = branchLm,
                Type = TableType.Nintendo,
                TableNumber = "Nintendo"
            });

            await context.Tables!.AddRangeAsync(tables);
            await context.SaveChangesAsync();
        }
    }
}