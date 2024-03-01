using Boardgame.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Boardgame.Infrastructure.Persistence.ConfigurationEntities;

public class TableConfiguration : IEntityTypeConfiguration<TablePlay>
{
    public void Configure(EntityTypeBuilder<TablePlay> builder)
    {
        builder
            .HasKey(t => t.Id);

        builder
            .ToTable("TablePlay");

        builder
            .HasOne(t => t.Branch)
            .WithMany(b => b.Tables)
            .HasForeignKey(t => t.BranchId);
    }
}
